# Database Engineering — Professional Standards

## Principles

Databases are long-lived production assets.

Prioritize:

- correctness
- data integrity
- consistency
- performance
- recoverability
- observability

---

# Schema

Design schemas around domain requirements rather than convenience.

Use appropriate:

- primary keys
- foreign keys
- unique constraints
- check constraints
- indexes
- nullable semantics

---

# Migrations

Every schema change must be represented by a migration.

Never rely on manually modifying production databases.

Migrations should be:

- deterministic
- reviewable
- reversible where practical
- tested

---

# Queries

Avoid:

- N+1 queries
- SELECT *
- unbounded queries
- unnecessary joins
- inefficient filtering

Analyze slow queries.

Use indexes based on actual access patterns.

---

# Transactions

Use transactions to preserve atomic business operations.

Do not hold transactions open during slow external operations.

---

# Concurrency

Consider:

- optimistic locking
- pessimistic locking
- unique constraints
- race conditions
- concurrent writes

Database constraints should enforce critical invariants where practical.

---

# Pagination

Never assume tables remain small.

Use pagination for collections that can grow significantly.

Prefer efficient pagination strategies for very large datasets.

---

# Backups

Production databases require:

- automated backups
- retention policy
- restore testing
- disaster recovery planning

A backup that has never been restored is not fully trusted.

---

# Data Lifecycle

Define:

- retention
- archival
- deletion
- soft deletion where appropriate
- anonymization where required

Do not keep data forever by default.