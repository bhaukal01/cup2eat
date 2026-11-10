# Code Review — Professional Engineering Checklist

Review code in this order.

## 1. Correctness

Does it actually solve the requested problem?

Check:

- edge cases
- failure paths
- race conditions
- incorrect assumptions

---

## 2. Security

Check:

- authentication
- authorization
- input validation
- tenant boundaries
- injection
- secrets
- sensitive information exposure

---

## 3. Data Integrity

Check:

- transactions
- constraints
- duplicate handling
- concurrency
- migration safety

---

## 4. Architecture

Check:

- separation of concerns
- module boundaries
- coupling
- dependency direction
- duplication

---

## 5. Performance

Check:

- database queries
- unnecessary API requests
- memory usage
- large loops
- unnecessary rendering
- expensive operations

---

## 6. Maintainability

Check:

- naming
- readability
- complexity
- abstractions
- duplicated code
- dead code

---

## 7. UX

For frontend changes check:

- loading
- empty
- error
- responsive
- accessibility
- keyboard interaction
- consistency

---

## 8. Testing

Verify appropriate tests exist.

Do not accept tests that only cover the happy path for security-sensitive behavior.

---

## 9. Documentation

Update documentation when behavior, architecture, configuration, or APIs change.

---

## 10. Final Review

Before approving:

- type checks pass
- lint passes
- tests pass
- build passes
- no secrets
- no obvious security issues
- no unnecessary complexity