# DevOps Engineering — Professional Standards

## Principles

Production systems should be:

- reproducible
- observable
- recoverable
- secure
- automated

---

# Environment Separation

Maintain clear separation between:

- development
- testing
- staging
- production

Never casually use production credentials locally.

---

# Infrastructure

Prefer infrastructure that can be reproduced from configuration.

Avoid undocumented manual server changes.

---

# CI/CD

CI should verify:

- formatting
- lint
- type checking
- tests
- build
- dependency/security checks

CD should use controlled deployment processes.

---

# Containers

Containers should:

- use minimal base images
- run as non-root where practical
- avoid unnecessary packages
- use pinned dependencies appropriately
- expose only required ports

---

# Secrets

Use environment/secret-management infrastructure.

Never store production secrets in Git.

---

# Deployment

Deployments should support:

- health checks
- graceful startup
- graceful shutdown
- rollback
- logging
- monitoring

---

# Backups

Critical persistent systems require tested backups.

---

# Monitoring

Monitor:

- availability
- latency
- error rates
- resource usage
- database health
- queue health

Alert on actionable conditions.