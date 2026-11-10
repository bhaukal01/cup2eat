# UI/UX Design — Professional Product Design Standards

## Purpose

Create interfaces that look and behave like professionally designed production software.

The goal is not merely functional UI.

The goal is:

- clarity
- hierarchy
- usability
- consistency
- accessibility
- visual quality
- appropriate information density

---

# 1. Design Before Implementation

Before implementing a significant interface:

1. Understand the user goal.
2. Identify the primary action.
3. Identify secondary actions.
4. Identify information hierarchy.
5. Determine states.
6. Determine responsive behavior.
7. Determine accessibility requirements.

Do not immediately generate JSX without understanding the interface.

---

# 2. Visual Hierarchy

Every screen should have a clear hierarchy.

Users should immediately understand:

1. Where am I?
2. What am I looking at?
3. What matters most?
4. What can I do?
5. What happens next?

Use:

- typography
- spacing
- grouping
- contrast
- alignment
- component size

to establish hierarchy.

---

# 3. Spacing

Use a consistent spacing system.

Do not choose arbitrary margins independently for every element.

Prefer a defined spacing scale.

Consistency matters more than exact numerical values.

---

# 4. Typography

Establish a hierarchy for:

- page title
- section title
- subtitle
- body
- labels
- helper text
- metadata
- captions

Avoid excessive font sizes and weights.

Use typography to communicate importance.

---

# 5. Color

Color should communicate meaning.

Use a restrained palette.

Define semantic colors for:

- primary
- secondary
- success
- warning
- error
- info
- neutral

Do not use color as the only indicator of state.

---

# 6. Dark Mode

If dark mode exists, design it intentionally.

Do not simply invert colors.

Consider:

- contrast
- elevation
- borders
- muted text
- shadows
- focus states
- disabled states

---

# 7. Components

Create reusable design primitives.

Common primitives include:

- Button
- Input
- Select
- Checkbox
- Radio
- Switch
- Dialog
- Drawer
- Tooltip
- Dropdown
- Tabs
- Badge
- Card
- Table
- Pagination
- Toast
- Alert
- Empty State
- Skeleton

Build complex interfaces from these primitives.

---

# 8. Consistency

Identical interactions should behave identically.

For example:

If destructive actions use confirmation dialogs in one section, they should not silently execute in another.

If loading buttons use a particular pattern, reuse it.

---

# 9. Information Density

Choose density according to context.

Business applications often require high information density.

Do not create excessive whitespace merely to make a dashboard look fashionable.

At the same time, avoid overwhelming users.

Balance:

- content
- spacing
- grouping
- visual hierarchy

---

# 10. Tables and Dashboards

For business software:

Prioritize:

- scanability
- alignment
- filtering
- sorting
- clear column hierarchy
- actionable rows

Do not use decorative charts when a simple metric or table communicates information better.

---

# 11. Forms

Group related fields.

Use:

- clear labels
- sensible field ordering
- inline validation
- contextual help
- required indicators

Avoid unnecessarily long forms.

Use progressive disclosure where appropriate.

---

# 12. Destructive Actions

Destructive actions must be visually and behaviorally distinct.

For irreversible operations:

- clearly identify the action
- explain consequences
- require appropriate confirmation

Do not use deceptive confirmation wording.

---

# 13. Feedback

Users should receive feedback when meaningful actions occur.

Examples:

- success toast
- inline confirmation
- progress indicator
- updated status
- error message

Avoid excessive notifications.

---

# 14. Accessibility

Design for keyboard and assistive technologies from the beginning.

Do not treat accessibility as a final cleanup step.

---

# 15. Responsive Design

Determine how components transform between breakpoints.

For each complex component ask:

- What disappears?
- What moves?
- What collapses?
- What becomes scrollable?
- What becomes stacked?
- What remains primary?

---

# 16. Animation

Use animation to communicate:

- state changes
- hierarchy
- transitions
- feedback

Do not animate merely because animation is possible.

Animations should be:

- subtle
- fast
- purposeful
- interruptible

Respect reduced-motion preferences.

---

# 17. Design Quality

Avoid generic AI-generated UI patterns such as:

- excessive gradients
- excessive glassmorphism
- unnecessary rounded cards
- random shadows
- decorative icons everywhere
- oversized headings
- meaningless dashboards
- excessive empty space
- inconsistent border radii
- arbitrary colors

Visual decisions should have a reason.

---

# 18. Product Context

Design should match the product.

Examples:

Enterprise software:
- efficient
- dense
- structured

Consumer product:
- approachable
- expressive
- simple

Developer tool:
- information-rich
- keyboard-friendly
- precise

Do not apply one aesthetic to every application.

---

# 19. Before Shipping a Screen

Check:

- hierarchy
- alignment
- spacing
- typography
- contrast
- responsive behavior
- loading state
- empty state
- error state
- disabled state
- accessibility
- interaction consistency