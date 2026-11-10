# Security Engineering — Production Security Standards

## Purpose

Security must be treated as an architectural requirement, not a final review step.

---

# 1. Security Principles

Follow:

- least privilege
- defense in depth
- secure defaults
- fail closed
- explicit authorization
- minimize attack surface
- minimize sensitive data
- validate external input
- assume breach

---

# 2. Authentication

Use established authentication protocols and libraries.

Never implement cryptographic authentication mechanisms manually.

Passwords must be:

- hashed using a modern password hashing algorithm
- salted
- protected against brute force

Never store plaintext passwords.

---

# 3. Session Security

Sessions/tokens must be protected against:

- theft
- fixation
- replay
- CSRF where applicable
- accidental leakage

Use secure cookie attributes where cookie-based authentication is used.

Implement:

- expiration
- revocation
- rotation where appropriate
- logout invalidation

---

# 4. Authorization

Perform authorization server-side.

Never rely on:

- hidden buttons
- disabled controls
- frontend routes
- frontend role checks
- client-side variables

Check authorization at the point where protected data or actions are accessed.

---

# 5. Object-Level Authorization

Protect against IDOR/BOLA.

Never assume:

/resource/123

means the current user may access resource 123.

Always verify ownership or authorization.

---

# 6. Input Validation

Validate all untrusted input.

This includes:

- HTTP requests
- uploaded files
- URLs
- webhook payloads
- API responses
- environment input
- message queues

Use allowlists where practical.

---

# 7. Injection Prevention

Protect against:

- SQL injection
- command injection
- template injection
- LDAP injection
- NoSQL injection
- expression injection

Use parameterized queries and safe APIs.

Never construct commands or queries from raw user input.

---

# 8. XSS

Treat user-controlled content as untrusted.

Avoid unsafe HTML rendering.

If HTML rendering is genuinely required:

- sanitize it
- use a trusted sanitizer
- restrict dangerous content

Never bypass framework escaping casually.

---

# 9. CSRF

Evaluate CSRF risk based on the authentication architecture.

Cookie-based authenticated applications require appropriate CSRF defenses.

Use:

- SameSite cookies where appropriate
- CSRF tokens when necessary
- origin checks where appropriate

---

# 10. SSRF

Never blindly fetch arbitrary URLs supplied by users.

If user-controlled URL fetching is required:

- validate protocols
- restrict destinations
- prevent access to internal networks
- block cloud metadata endpoints
- validate redirects
- use network-level controls

---

# 11. File Upload Security

Treat uploaded files as hostile.

Validate:

- file size
- file type
- extension
- content
- storage location

Do not execute uploaded files.

Avoid serving uploads from sensitive executable locations.

Consider malware scanning for high-risk environments.

---

# 12. Secrets

Never commit secrets.

Never expose secrets through:

- frontend bundles
- logs
- error responses
- URLs
- source code
- screenshots
- test fixtures

Use secret-management mechanisms appropriate to the deployment environment.

---

# 13. Sensitive Data

Collect and retain only data that is actually required.

Protect sensitive data:

- in transit
- at rest where appropriate
- in logs
- in backups
- in exports

Do not unnecessarily duplicate sensitive information.

---

# 14. Rate Limiting

Apply rate limits to sensitive endpoints.

Especially:

- login
- password reset
- OTP
- token issuance
- expensive APIs
- file uploads
- public forms

Use appropriate limits rather than one global limit for everything.

---

# 15. Brute Force Protection

Protect authentication systems against:

- password guessing
- credential stuffing
- OTP guessing
- token abuse

Use rate limits, progressive delays, account protections, and monitoring where appropriate.

---

# 16. Dependency Security

Keep dependencies maintained.

Regularly check:

- known vulnerabilities
- abandoned packages
- malicious packages
- transitive dependencies

Do not blindly upgrade major versions without testing.

---

# 17. Supply Chain Security

Protect:

- package installation
- CI/CD
- build artifacts
- container images
- deployment credentials

Use lockfiles.

Restrict CI credentials.

Do not execute untrusted code in privileged CI environments.

---

# 18. Logging Security

Never log:

- passwords
- session tokens
- API keys
- private keys
- secrets

Be careful with:

- email addresses
- phone numbers
- financial data
- authentication identifiers

Use redaction where appropriate.

---

# 19. Error Security

Production errors should not expose implementation details.

Avoid returning:

- stack traces
- SQL
- filesystem paths
- environment variables
- internal service addresses

Provide clients with safe error information.

---

# 20. Multi-Tenant Security

For multi-tenant applications:

- establish tenant context centrally
- enforce tenant boundaries server-side
- never trust tenant IDs supplied by clients
- test cross-tenant access
- isolate files
- isolate caches
- isolate queues where appropriate

Tenant isolation must be tested explicitly.

---

# 21. Security Headers

Use appropriate HTTP security headers.

Evaluate:

- Content Security Policy
- HSTS
- X-Content-Type-Options
- Referrer-Policy
- frame protections
- permissions policy

Configure according to application requirements.

---

# 22. Cryptography

Never invent cryptographic algorithms.

Use well-established libraries.

Use appropriate:

- password hashing
- authenticated encryption
- secure random generation
- key management

Do not reuse keys across unrelated purposes.

---

# 23. Authorization Testing

For every protected feature test:

- authorized user succeeds
- unauthorized user fails
- wrong role fails
- wrong tenant fails
- wrong resource owner fails
- disabled account fails

Negative security tests are mandatory.

---

# 24. Security Review

Before production release consider:

- authentication
- authorization
- tenant isolation
- input validation
- injection
- XSS
- CSRF
- SSRF
- file uploads
- secrets
- rate limits
- dependencies
- logging
- error leakage
- infrastructure exposure

---

# 25. Security Mindset

Assume:

- clients can modify requests
- browsers can be manipulated
- APIs can be called directly
- users can inspect frontend code
- tokens can be stolen
- external services can fail
- dependencies can become vulnerable

Never design security around the assumption that users will follow the UI.