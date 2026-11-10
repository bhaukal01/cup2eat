# Backend Engineering — Professional Engineering Standards

## Purpose

This document defines general standards for designing, implementing, reviewing, and maintaining production-grade backend software.

These rules apply regardless of programming language, framework, database, or deployment environment.

---

# 1. Core Principles

Backend software must prioritize:

1. Correctness
2. Security
3. Reliability
4. Maintainability
5. Observability
6. Testability
7. Performance
8. Scalability

Do not optimize for code brevity at the expense of these properties.

Do not introduce complexity without a clear engineering reason.

Prefer simple architectures that can evolve.

---

# 2. Architecture

Use clear separation of concerns.

Typical boundaries include:

- Transport/API layer
- Application/service layer
- Domain/business logic
- Data-access layer
- Infrastructure/integration layer

The exact names may differ by project.

Avoid putting all application behavior into controllers, routes, handlers, or database models.

---

# 3. Business Logic

Business rules must be centralized.

Do not duplicate the same business rule across:

- controllers
- routes
- workers
- CLI commands
- frontend code
- database queries

Create reusable domain/application services where appropriate.

Business logic should be independently testable.

---

# 4. API Design

APIs should be:

- predictable
- consistent
- documented
- versionable
- validated
- observable
- backward-compatible where required

Use consistent:

- naming
- status codes
- error structures
- pagination
- filtering
- sorting
- validation
- authentication
- authorization

Do not expose internal database structures directly as public API contracts.

---

# 5. Input Validation

Treat every external input as untrusted.

Validate:

- request bodies
- URL parameters
- query parameters
- headers
- uploaded files
- webhook payloads
- external API responses where appropriate

Validate both:

- type
- business constraints

Reject malformed input early.

Never rely solely on frontend validation.

---

# 6. Output Handling

Return only data that the caller is authorized to receive.

Do not accidentally serialize:

- passwords
- tokens
- secrets
- internal security metadata
- sensitive fields
- internal database implementation details

Use explicit response schemas where practical.

---

# 7. Authentication

Authentication must be centralized.

Support appropriate mechanisms such as:

- secure sessions
- OAuth
- OpenID Connect
- API keys
- service credentials

depending on the application.

Credentials must never be stored in plaintext.

Use established cryptographic libraries.

Never implement cryptography manually.

---

# 8. Authorization

Authentication answers:

"Who are you?"

Authorization answers:

"Are you allowed to do this?"

Never treat authentication as authorization.

Authorization should be checked server-side for every protected operation.

Prefer capability/permission-based checks over hardcoded role-name checks.

---

# 9. Error Handling

Use structured application errors.

Errors should provide enough information for clients and operators without leaking sensitive internals.

Production responses must not expose:

- stack traces
- SQL queries
- internal filesystem paths
- credentials
- infrastructure details

Log detailed diagnostic information internally.

---

# 10. Database Interaction

Database access must be deliberate.

Use:

- parameterized queries
- transactions when required
- appropriate indexes
- constraints
- foreign keys where appropriate
- migrations

Never construct SQL by concatenating untrusted input.

Avoid N+1 queries.

Avoid loading unnecessary columns.

Avoid unbounded queries.

Use pagination for potentially large collections.

---

# 11. Transactions

Use transactions when multiple changes must be atomic.

A transaction should preserve business invariants.

Do not use transactions indiscriminately for every operation.

Keep transactions short.

Avoid performing slow external network operations inside database transactions.

---

# 12. Concurrency

Assume concurrent requests can happen.

Consider:

- race conditions
- duplicate requests
- retries
- distributed workers
- concurrent updates
- lost updates
- idempotency

For operations that may be retried, design idempotency where appropriate.

---

# 13. Background Processing

Do not perform long-running work inside synchronous HTTP requests.

Move suitable work into background jobs:

- email
- file processing
- report generation
- imports
- exports
- notifications
- scheduled operations
- external synchronization

Jobs should be:

- retryable
- observable
- safely serialized
- idempotent where possible

---

# 14. External Services

Treat external APIs as unreliable dependencies.

Handle:

- timeouts
- retries
- rate limits
- malformed responses
- partial failures
- authentication failures
- service outages

Never allow one unreliable dependency to unnecessarily bring down the entire application.

---

# 15. Caching

Cache only when there is a demonstrated need.

For every cache define:

- key
- lifetime
- invalidation strategy
- ownership
- consistency expectations

Never cache security-sensitive data without carefully considering authorization and invalidation.

---

# 16. Logging

Use structured logging.

Logs should help answer:

- what happened?
- when?
- where?
- for which request?
- which user/service?
- what failed?

Never log secrets.

Avoid logging sensitive personal information unnecessarily.

---

# 17. Configuration

Configuration must be externalized.

Do not hardcode:

- credentials
- API keys
- database passwords
- environment-specific URLs
- secrets

Validate required configuration during application startup.

Fail fast when mandatory configuration is invalid.

---

# 18. Performance

Do not optimize blindly.

Measure first.

Look for:

- inefficient queries
- excessive network requests
- unnecessary serialization
- memory leaks
- excessive allocations
- blocking operations
- inefficient algorithms

Optimize bottlenecks supported by evidence.

---

# 19. Scalability

Design stateless application servers where practical.

Do not rely on local process memory for shared persistent state.

Use external systems for shared state when horizontal scaling is required.

Consider:

- connection pooling
- queues
- caching
- rate limiting
- load balancing
- graceful shutdown

---

# 20. Graceful Shutdown

Applications should properly handle shutdown.

On shutdown:

1. Stop accepting new work.
2. Finish or safely terminate active work.
3. Close database connections.
4. Close message queue connections.
5. Close external resources.
6. Exit cleanly.

---

# 21. API Compatibility

Avoid breaking existing consumers unnecessarily.

For breaking changes:

- version APIs where appropriate
- document changes
- provide migration paths
- deprecate before removal when practical

---

# 22. Dependencies

Do not add dependencies for trivial functionality.

Before adding a package consider:

- maintenance
- security
- popularity
- license
- bundle/runtime impact
- dependency tree
- project compatibility

Prefer mature, focused dependencies.

---

# 23. Testing

Test business-critical behavior.

Tests should cover:

- happy paths
- validation failures
- authorization failures
- edge cases
- concurrency-sensitive behavior
- external dependency failures

Do not test implementation details unnecessarily.

---

# 24. Backend Code Quality

Prefer:

- explicit types
- small cohesive functions
- dependency injection where useful
- clear naming
- immutable data where appropriate
- predictable side effects

Avoid:

- giant functions
- giant controllers
- global mutable state
- hidden side effects
- duplicated logic
- unnecessary abstractions
- premature microservices

---

# 25. Production Readiness

Before considering backend work complete, verify:

- validation
- authentication
- authorization
- error handling
- logging
- monitoring
- migrations
- performance
- tests
- configuration
- graceful shutdown
- security implications