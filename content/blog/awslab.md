---
title: "Building a Local AWS Lab on My Homelab with Docker, Ansible, and Fake AWS APIs"
date: "2026-05-19"
excerpt: "How I set up a local AWS-style infrastructure lab using AWSlab, Docker, Ansible, and Ministack on my Ubuntu homelab — including the real debugging process behind SSH issues, Docker networking failures, healthcheck problems, and container orchestration challenges."
---

# Building My Own AWS Lab on a Homelab: SSH, Docker, Fake AWS APIs, and Real Debugging

I recently spent time setting up `awslab` from the `platform-zero` project on my Ubuntu homelab server. The goal wasn’t just to “run containers” — it was to understand how real infrastructure workflows operate using the same tools used in production environments:

* Docker
* Ansible
* AWS CLI
* Terraform-style backends
* Fake AWS APIs
* S3-compatible object storage
* Infrastructure automation

The setup was done on my local Ubuntu server (`192.168.1.44`) where I already run parts of my homelab stack like:

* Coolify
* Traefik
* Portainer
* Authentik
* PostgreSQL
* Redis

This project helped me simulate cloud infrastructure locally without touching real AWS.

---

## What I Was Trying to Build

The project uses:

* `Ministack` as a local AWS emulator
* `MinIO` for S3-compatible storage
* `Ansible` for provisioning
* Docker Compose for orchestration

The idea is to create a local “fake AWS cloud” where tools like:

* AWS CLI
* Terraform
* IaC workflows

can run exactly like they would against real AWS.

After setup, commands like:

```bash
aws s3 ls
aws dynamodb list-tables
```

worked directly against my homelab server.

That means:

* S3 APIs were operational
* DynamoDB APIs worked
* Terraform backend resources could be simulated locally

---

## The Most Valuable Part: Debugging

The setup did not work perfectly on the first try — and honestly, that became the most useful part of the entire experience.

I faced several real infrastructure issues:

### SSH Authentication Problems

Initially:

```bash
Permission denied (publickey)
```

I had to:

* generate keys
* configure `authorized_keys`
* fix SSH identity paths
* validate Ansible connectivity

This mirrored the exact type of issue that happens in real infrastructure environments.

---

### Docker IPv6 Networking Issues

Docker image pulls failed because Docker attempted IPv6 first:

```text
dial tcp [2606:4700::...]:443:
connect: network is unreachable
```

This turned out to be a homelab networking issue where:

* IPv4 worked
* IPv6 routing was incomplete

Fixing this required:

* debugging Docker networking
* editing `daemon.json`
* understanding how Docker resolves network routes

---

### Container Healthcheck Problems

One interesting issue:
`awslab-ministack` showed as `unhealthy` even though the APIs worked perfectly.

Commands like:

```bash
aws s3 ls
curl http://192.168.1.44:4566
```

worked correctly.

This was a good reminder that:

* healthchecks are important
* but they can also become misleading debugging signals

---

### Port Collisions in a Real Homelab

Another issue came from running existing services.

I already had Portainer using:

```text
9000/tcp
```

But MinIO also wanted:

```text
9000/tcp
```

This caused silent startup failures.

That problem felt very realistic because real infrastructure environments often have:

* shared hosts
* existing services
* conflicting ports
* networking assumptions

---

## What I Learned

This project taught me that infrastructure engineering is less about memorizing commands and more about:

* reading logs
* validating assumptions
* understanding networking
* tracing failures
* debugging systems incrementally

The most valuable moments were not the successful commands.

They were:

* broken healthchecks
* failing Docker pulls
* SSH auth problems
* container startup debugging

because that’s where the real learning happened.

---

## Current Result

At the end of the setup I successfully:

* connected AWS CLI to my homelab
* created S3 buckets locally
* interacted with DynamoDB APIs
* automated provisioning using Ansible
* validated fake AWS infrastructure locally

Example:

```bash
aws s3 ls
```

returned:

```text
test-bucket
```

from my own server.

---

## What I Want to Build Next

This was only the first phase.

The next steps I want to explore are:

* Terraform remote state on MinIO
* multi-environment infrastructure
* Kubernetes integration
* GitOps workflows
* monitoring and observability
* service mesh networking
* internal platform engineering workflows

I also want to continue documenting:

* setup issues
* debugging notes
* architecture decisions
* homelab experiments

because that process itself is becoming one of the most valuable learning tools.

---

## Final Thoughts

One thing I realized during this project:

Real infrastructure work is not “clean.”

Things fail constantly:

* networking
* authentication
* ports
* healthchecks
* containers
* configs

The important skill is being able to:

* isolate the issue
* understand the system
* debug calmly
* iterate toward a fix

This setup gave me a much more realistic understanding of how modern infrastructure systems behave beyond tutorials and simple deployments.
