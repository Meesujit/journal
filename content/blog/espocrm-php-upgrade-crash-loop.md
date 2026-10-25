---
title: "A Dead Email Notification Led Me to an Unauthenticated RCE in Our Own CRM"
date: "2026-10-25"
excerpt: "What started as 'lead notification emails never worked' on our self-hosted EspoCRM turned into a lost vault password, a container crash-loop with a genuinely nasty root cause, and the discovery that the CRM had been frozen on PHP 8.2.24 for two years — sitting on an unauthenticated RCE advisory the whole time."
---

# A Dead Email Notification Led Me to an Unauthenticated RCE in Our Own CRM

This one started small: lead notification emails from our self-hosted CRM (EspoCRM, PHP, running on a Hostinger VPS behind Traefik) had apparently never worked. By the end of the week it had turned into a lost encryption vault, a production container stuck in a crash-loop, and the discovery that the CRM had been sitting two major versions and two years of PHP patches behind — including an unauthenticated, CVSS 9.5 remote-code-execution advisory.

---

## It starts with "notifications don't work"

First look: Admin panel said "Scheduled jobs are not running." Two independent, boring causes:

1. EspoCRM's SMTP had never actually been configured — the vault keys existed but were empty.
2. The job-queue cron (`cron.php`) had never been scheduled on the server at all, so *nothing* scheduled — not just email — was running.

Routine fix, except the Ansible vault's password had been **lost** — rotated after a leak back in July, never re-documented anywhere. Recovered it without resetting a single live credential, using the GitHub Actions secret that still worked for CI deploys as the bridge:

```bash
# one-off workflow_dispatch job, run once, then deleted
ansible-vault rekey vault/secrets.yml \
  --vault-password-file <(old) --new-vault-password-file <(new)
```

Cost real time for a dumb reason: the rekey job didn't declare `environment: production` on itself, so the environment-scoped secret silently resolved to an empty string instead of erroring — indistinguishable from "the password is just wrong" until I thought to check that specifically.

## Fixing SMTP broke the CRM

Configuring SMTP meant a deploy. A deploy that touches any `environment:` value for the `espocrm` service forces Docker to recreate the container. That recreation took the CRM down — Cloudflare 502, `docker ps` showing `Restarting` with a climbing restart count — for about 15 minutes.

The actual bug underneath is the kind I want to remember on purpose:

> `/var/www/html` is **not** a named Docker volume on EspoCRM's 8.x/9.x images — only `data/`, `custom/`, and `client/` are. The entrypoint only copies the application code into `/var/www/html` when it detects a fresh install. On a long-lived production instance, `data/config.php` already says "installed, same version," so the entrypoint takes the skip branch and copies **nothing**. That's correct for a container restarting in place. It's wrong for the *brand-new* container that any env-var change creates — which inherits a perfectly legitimate "already installed" data volume but has an empty, code-less filesystem everywhere else.

```
PHP Fatal error:  Uncaught Error: Failed opening required
'/var/www/html/bootstrap.php' (include_path=...) in Command line code:2
```

The fix is non-destructive — pull the application code from a throwaway container of the *same* image and copy it into the live one, touching nothing under the persisted volumes:

```bash
docker create --name espocrm-src-tmp espocrm/espocrm:8.4 >/dev/null
docker cp espocrm-src-tmp:/usr/src/espocrm/. /tmp/espocrm_src/
docker rm espocrm-src-tmp >/dev/null
docker cp /tmp/espocrm_src/. espocrm:/var/www/html/
docker exec --user root espocrm chown -R www-data:www-data /var/www/html
```

Confirmed fully recovered by checking for `Up X (healthy)` — not just `Up` — and an actual test email delivering end-to-end through SMTP2GO's own activity log, not just a green-looking admin panel.

While in there investigating, I found two more things down for completely unrelated reasons: HRMS and Quiz, sharing the same VPS and the same Traefik instance, had silently lost their routing weeks earlier when Traefik's Docker-label auto-discovery was disabled (a Docker ≥29.x incompatibility) and only the CRM's routes were migrated to the new static-file system. Nobody had noticed.

## The part that actually mattered: PHP was two years stale

Routine maintenance surfaced the real issue. `espocrm_version: "8.4"` pins a Docker image tag — and therefore the exact PHP build inside it. EspoCRM only actively rebuilds tags for its *current* major line; the `8.4` tag was last rebuilt **2024-10-14**. Recreating the container, however many times, does nothing for PHP staleness if the tag itself is frozen in time.

That stale PHP (8.2.24) was sitting on an unauthenticated, unauthenticated-RCE PHP advisory (CVE-2026-109618/109619) — on a production box that also happens to be our CRM, holding real lead data.

Fixing it meant an actual EspoCRM application upgrade, not a patch bump. And EspoCRM's own upgrade mechanism has a hard internal safety cap that isn't documented anywhere obvious:

| Jump attempted | Result |
|---|---|
| `8.4 → 9.3` direct | **Fails** — `MAX_UPGRADE_COUNT exceed`. Falls back claiming to restore the old version; app is left on HTTP 500 regardless. |
| `9.0 → 9.3` (3 minors) | **Also fails**, differently — silent crash mid dependency-swap, `vendor/` left missing a package the app needs. |
| One version at a time | **Every single hop succeeded cleanly.** |

The official docs say to run the upgrade CLI repeatedly rather than targeting a version far ahead — but the Docker image's own entrypoint doesn't follow that advice; it auto-invokes the upgrade targeting *its own bundled version* on every container start, with no way to pass it a smaller target. The only lever is **which image tag you swap to next** — so every hop meant: bump the tag, hit the same bootstrap.php-missing bug as the crash-loop above (needs the same code-copy workaround, every single time on 8.x/9.x), then wait 4–5 minutes with zero log output while the upgrade actually runs — long enough that it's indistinguishable from a hang unless you check for an active `php command.php upgrade` process directly.

One more landmine along the way: the `9.2.7` image ships a broken symlink inside a vendor package's `docs/` folder that trips Docker's `cp` safety check (`invalid symlink ... -> "../../../../../../tmp/..."`). Docs aren't needed at runtime, so excluding them on **both** the extraction and the re-copy step sidesteps it.

## Testing it for real before touching production

507 real leads live in that database. The whole hop sequence got proven first on an isolated clone — nightly backup files streamed straight to a separate test host, never a laptop, booted on a `docker compose` stack with its own container/volume/network names, zero wiring into the real Ansible inventory. Before testing anything that writes, the clone's own config and DB got neutralized directly — blanked SMTP credentials, the Make.com lead webhook flipped `is_active=0`, the staging `siteUrl` corrected — so nothing in a test run could reach a real inbox or a real downstream integration. Only after a clean full pass (list/detail views, Entity Manager custom fields, the Lead Formula script, all 10 Scheduled Jobs, PHP version confirmed in Admin → System Requirements) did the identical, now-proven hop sequence run against production, with a fresh on-demand backup taken immediately before.

**Full tested path:** `8.4.2 → 9.0.8 → 9.1.9 → 9.2.7 → 9.3 → 10.0.10`

The last hop onto the `10.x` line turned out architecturally different in a good way — that image bakes the application code directly into the filesystem at build time, so the bootstrap.php bug simply doesn't apply anymore, and the upgrade mechanism itself switched to a much faster `migrate` action instead of the old multi-minute CLI walk. One side-effect caught during verification: the upgrade process silently flips Maintenance Mode on at some point and never turns it back off — easy to miss if you stop checking right after the final hop reports success.

**End state:** PHP **8.4.27** — patching the original advisory plus every PHP CVE since 8.2.24's September 2024 release, including a separate CVSS 9.5 unauthenticated SOAP RCE from August 2026 — and EspoCRM **10.0.10**. All 507 leads, custom fields, the Lead Formula script, and all 10 scheduled jobs confirmed intact afterward.

## The thing that should have caught all of this, sooner

The uncomfortable footnote: every alerting path that should have made parts of this visible earlier had *also* quietly broken, for three separate and unrelated reasons, discovered only while already in there for something else — a CI notify job reading `vars.DISCORD_WEBHOOK` when the value was actually stored as a `secrets` context (same name, different context, always reads empty, no error anywhere); the same job missing `environment: production` even after that fix, which makes an environment-scoped secret invisible to it; and a webhook that had simply been deleted on Discord's side independently of any of this repo's code. A health check that's been silently failing for days looks identical, from the outside, to a system with nothing to report.

That's the actual lesson I'm taking into next week: a monitor that can fail silently is worse than no monitor, because it buys false confidence instead of none at all. Every alert path in this stack now gets a deliberate "fire it and confirm it actually posts" check as a standing step after any change near it — not just a green CI run.
