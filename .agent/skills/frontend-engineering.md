# Frontend Engineering — Professional Engineering Standards

## Purpose

Standards for building production-grade frontend applications.

---

# 1. Core Principles

Prioritize:

1. User experience
2. Accessibility
3. Correctness
4. Maintainability
5. Performance
6. Security
7. Responsiveness
8. Consistency

---

# 2. Architecture

Use component-based architecture.

Separate:

- presentation
- application logic
- server state
- client state
- API communication
- validation
- domain logic

Avoid putting everything inside page components.

---

# 3. Components

Components should have a clear responsibility.

Prefer:

- small components
- composable components
- reusable primitives
- predictable props
- explicit state ownership

Avoid giant components containing:

- API calls
- business logic
- complex state machines
- rendering
- formatting
- validation
- navigation

all at once.

---

# 4. State Management

Distinguish between:

### Server State

Examples:

- users
- products
- leads
- orders
- API data

Use an appropriate server-state solution.

### Client State

Examples:

- modal state
- sidebar state
- temporary UI preferences

Do not duplicate server state into global client state without a reason.

---

# 5. API Communication

Centralize API behavior.

Handle consistently:

- authentication
- errors
- retries
- loading
- cancellation
- request IDs where applicable

Do not scatter raw HTTP requests throughout components.

---

# 6. Loading States

Every asynchronous UI should have an intentional loading state.

Use:

- skeletons
- progress indicators
- disabled controls
- optimistic UI where appropriate

Avoid flashing empty content during normal loading.

---

# 7. Error States

Every major data view should handle errors.

Provide:

- understandable error messages
- retry mechanisms where useful
- fallback UI
- appropriate logging

Never silently swallow errors.

---

# 8. Empty States

Empty data is not necessarily an error.

Design intentional empty states explaining:

- what is empty
- why
- what the user can do next

---

# 9. Forms

Forms must have:

- validation
- useful labels
- error messages
- disabled/submitting states
- keyboard accessibility
- sensible defaults
- server-side validation compatibility

Never rely solely on client validation.

---

# 10. Accessibility

Target WCAG-compliant experiences.

Use:

- semantic HTML
- keyboard navigation
- visible focus states
- proper labels
- accessible dialogs
- sufficient contrast
- screen-reader-friendly structure

Do not use a clickable `div` when a semantic button/link is appropriate.

---

# 11. Responsive Design

Design for:

- desktop
- tablet
- mobile

Do not merely shrink desktop layouts.

Prioritize content and interactions appropriately at smaller widths.

---

# 12. Performance

Avoid unnecessary:

- renders
- network requests
- bundle size
- JavaScript execution
- large DOM trees

Use:

- lazy loading
- code splitting
- virtualization
- image optimization
- memoization only where useful

Do not use memoization blindly.

---

# 13. Security

Never assume frontend security controls are sufficient.

Do not:

- store sensitive secrets in frontend code
- expose private API credentials
- trust hidden UI controls
- trust client-side permission checks

The backend must enforce authorization.

---

# 14. Routing

Routes should be organized logically.

Protected routes should have centralized authentication/authorization handling.

Avoid duplicating access checks in every page.

---

# 15. Forms and Data

Never trust data merely because it came from your own API.

Treat server data as potentially malformed or outdated.

Handle:

- deleted records
- stale data
- permissions changing
- expired sessions
- conflicting updates

---

# 16. UX Consistency

Use a shared design system.

Standardize:

- buttons
- inputs
- dialogs
- dropdowns
- tables
- cards
- notifications
- typography
- spacing
- icons

Do not reinvent common UI patterns in every feature.

---

# 17. Navigation

Navigation should reflect application capabilities.

Do not show inaccessible actions unnecessarily.

However, hiding an action is only a UX feature.

Never treat hidden UI as authorization.

---

# 18. Tables

Data-heavy tables should support appropriate:

- pagination
- sorting
- filtering
- column management
- loading states
- empty states
- responsive behavior
- keyboard accessibility

Do not render thousands of rows unnecessarily.

---

# 19. Optimistic Updates

Use optimistic UI only when rollback is well-defined.

For destructive or uncertain operations, prefer confirmed server state.

---

# 20. Frontend Code Quality

Avoid:

- giant page components
- duplicated JSX
- deeply nested conditionals
- excessive prop drilling
- global state for everything
- magic numbers
- magic strings
- unnecessary effects

Prefer composition and clear data flow.

---

# 21. Production Checklist

Before frontend work is complete:

- responsive
- accessible
- loading states
- empty states
- error states
- permission states
- form validation
- keyboard support
- performance checked
- production build tested
- no console errors
- no secrets exposed
