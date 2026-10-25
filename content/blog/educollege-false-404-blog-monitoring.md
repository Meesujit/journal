---
title: "349 Posts, Falsely 404'd: Chasing a WordPress Backend That Looked Healthy and Wasn't"
date: "2026-10-25"
excerpt: "A WordPress GraphQL backend that intermittently failed to reach from the edge — but only ever looked fine on direct checks — quietly got ~349 real blog posts deindexed from Google. Two detours, one structural fix, and a monitor built so it can never fail silently again."
---

# 349 Posts, Falsely 404'd: Chasing a WordPress Backend That Looked Healthy and Wasn't

This week's problem lived on [educollege.in](https://educollege.in), which pulls its blog content from a separate WordPress install (`blog.educollege.in/graphql`) over GraphQL. The backend is plain PHP/WordPress — boring, reliable-looking infrastructure. The frontend is a Next.js app running on Cloudflare's edge runtime. Between those two things, something was failing just often enough to matter, and just rarely enough to be almost impossible to catch red-handed.

The symptom: **~349 real, published posts had been falsely 404'd and quietly deindexed from Google** — even though every direct check of the WordPress backend said it was perfectly healthy.

---

## The bug

A failed fetch to the GraphQL backend was being treated the same as "this post doesn't exist":

```
if (!post) return notFound() // a 5xx and a real 404 looked identical
```

Google doesn't retry a 404 — it trusts it and drops the URL. So every time the edge runtime had a bad moment reaching WordPress, that wasn't a transient blip, it was a **permanent** removal from the index. Multiply that by however many times it happened across 349 posts, over however long it went unnoticed, and you get a slow bleed of real content disappearing from search with zero visible error anywhere in production.

Two separate bugs were feeding it:

| Bug | Effect |
|---|---|
| Fetch sent a bot-labeled User-Agent | Cloudflare's security layer in front of `blog.educollege.in` treated the request as more suspicious, blocking it more often than a real browser would see |
| `next: { revalidate: 3600 }` on a route already marked `force-dynamic` | A single failed fetch got cached **as a failure** for up to an hour — so a blocked request stayed stuck 404/500 for an hour after the backend had already recovered |

## Two detours before the real fix

The honest version of this story includes the paths that didn't work, because each one taught me something.

**First attempt:** fix the two bugs above — real browser UA, `cache: "no-store"` — and call it done. Correct, but under time pressure it still *felt* uncertain, so:

**Second attempt:** convert post pages to static generation + ISR. The theory was appealing — already-built posts become bulletproof against the connection issue entirely, since they're served from the build rather than fetched live. It traded away more than I expected: Cloudflare Pages has no working on-demand ISR fallback for a path that was never in the build-time `generateStaticParams` list. Confirmed directly — a freshly published post 404'd in production while rendering perfectly fine locally. That's the exact failure mode I was trying to eliminate, just moved to a different trigger (new posts) instead of removed.

**The actual fix** was never the rendering mode. It was making a failed fetch structurally incapable of resolving to `notFound()`:

```typescript
// getPost() — a thrown/failed fetch (even after 5 retries) must
// propagate as an error, never resolve to null-as-404
async function getPost(slug: string): Promise<Post | null> {
  const data = await fetchGraphQL<{ post: Post }>(GET_POST, { slug });
  return data?.post ?? null; // null only when WordPress says "no such post"
}
```

Back on `force-dynamic` + edge, with the real UA and `cache: "no-store"`, a failing backend now surfaces as a thrown error → Next's error boundary → a **5xx**, which Google retries instead of trusting as permanent. Five retries with a 400ms backoff absorb the ordinary transient blips before anything reaches the user at all. That one change — a 5xx instead of a false 404 — is what structurally prevents the deindexing problem from recurring. Static generation never addressed the actual cause; it just changed which requests were exposed to it.

## Building a monitor so it can't fail silently again

The fix stops new posts from being wrongly removed. It does nothing to tell me if the backend starts misbehaving again — and the original bug went unnoticed for who knows how long specifically *because* nothing was watching. So the second half of the week was a GitHub Actions job, three checks, every 15 minutes:

1. **The GraphQL backend directly** — a minimal 1-post query, 15s timeout.
2. **The live `/blog` listing page** — fetches the real rendered HTML and counts actual `/blog/<slug>` links. This is the check that matters most: the listing page already had its own try/catch-and-fall-back-to-empty-list behavior, so it can return a perfectly healthy HTTP 200 while silently showing **zero posts**. A plain uptime check would never catch that. This one fails if the count drops below 10, against 350+ real posts.
3. **Two known, stable post URLs** — must return 200, catching a false-404 regression independently of the listing check.

```yaml
# .github/workflows/blog-monitor.yml
on:
  schedule:
    - cron: "*/15 * * * *"
  workflow_dispatch:
jobs:
  monitor:
    runs-on: ubuntu-latest
    environment: Production   # required — the webhook secret is environment-scoped;
                               # omitting this resolves it to empty instead of erroring
    steps:
      - uses: actions/checkout@v4
      - run: node scripts/monitor-blog.mjs
        env:
          DISCORD_BLOG_MONITOR_WEBHOOK_URL: ${{ secrets.DISCORD_BLOG_MONITOR_WEBHOOK_URL }}
```

`scripts/monitor-blog.mjs` is dependency-free — native `fetch`, no `npm install` step in CI. A failure posts a red "🚨 Blog monitor: failure detected" embed to Discord naming exactly which check failed and why (e.g. `only found 2 post link(s), expected >= 10`), and the Actions run itself shows red regardless of whether Discord delivery succeeds, so there's a fallback signal even if the webhook breaks. It's silent when healthy — no noise, just the one channel going red if something's actually wrong.

I also wrote up a `diagnose-blog-monitor-alert` investigation playbook and documented the whole incident history directly in the README and the code comments, so the next time this fires — or the next time I'm tempted to "just" switch rendering modes to fix a reliability problem — the full context of what was already tried, and why it didn't work, is sitting right there.

## What's live now

- A failed WordPress fetch surfaces as a retried 5xx, never a trusted-permanent 404
- Real browser UA + `cache: "no-store"` on every blog fetch, 5 retries with backoff
- Three independent checks running every 15 minutes, Discord-alerting only on failure
- The actual root cause of the original intermittent-fetch problem is still not fully pinned down — but it's now structurally incapable of quietly costing indexed content again, and if it resurfaces, there's a timestamped log of exactly when and how

The ISR detour is the part I keep coming back to. It *felt* like the safer fix — less live-fetch risk, more static guarantees — and it was almost entirely beside the point. The actual bug was one layer away from where the symptom showed up: not "how is this page rendered," but "what does a failed fetch resolve to." Worth remembering before reaching for a bigger architectural change next time something feels unreliable under pressure.
