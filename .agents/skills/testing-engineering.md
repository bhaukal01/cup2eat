# Testing Engineering — Professional Standards

## Testing Philosophy

Tests should provide confidence in behavior.

Do not maximize test count.

Maximize meaningful coverage of important behavior.

---

# Testing Pyramid

Use appropriate levels:

Unit
→ Integration
→ End-to-End

---

# Unit Tests

Use for:

- business rules
- pure functions
- transformations
- validation
- permission logic

---

# Integration Tests

Use for:

- database behavior
- APIs
- authentication
- authorization
- external integration boundaries

---

# E2E Tests

Use for critical user journeys.

Examples:

- login
- registration
- checkout
- core CRUD workflows
- permission-sensitive workflows

---

# Negative Tests

Always test failure paths.

Examples:

- invalid input
- unauthorized access
- missing resource
- duplicate resource
- expired authentication
- wrong tenant
- network failure

---

# Regression

Every production bug that could reasonably recur should result in a regression test where practical.

---

# Test Quality

Avoid brittle tests based heavily on implementation details.

Prefer behavior-oriented assertions.

Tests should be deterministic.

Do not depend on external production services unnecessarily.