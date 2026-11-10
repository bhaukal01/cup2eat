# CUP2EAT — 100% Mobile & Tablet Responsiveness Audit (Desktop Untouched)

> Every change is scoped cleanly inside mobile/tablet `@media` breakpoints or viewport checks so desktop (`>= 960px` / `>= 1024px`) layout and proportions remain completely untouched.

---

## Global Chrome & Navigation
- [x] **R1. Announcement Bar & Sticky Navbar (`Navbar.jsx`, `layout.css`):** Single-line compact mobile announcement (`< 640px`), clean logo/cart-pill sizing down to `320px`, auto-closing mobile menu drawer on navigation with `46px` tap targets.
- [x] **R2. UI Primitives (`ui.css`, `DataDisplay.jsx`):** Single-row horizontal swipe tabs (`< 640px`), stacked definition cards for all data tables on mobile (`td[data-label]`, desktop `>= 640px` tables untouched), wrap-safe small-screen buttons, compact mobile drawer/dialog padding.
- [x] **R3. Cart Drawer (`CartDrawer.jsx`, `layout.css`):** Responsive 1-column action button stack below `400px` (`cart-drawer-actions`).

## Home Page Sections (`HomePage.jsx`)
- [x] **R4. Orbital Hero (`HeroSection.jsx`, `sections.css`):** United mobile heading flow (`SIP HOT CHAI. CRUNCH THE CUP.` + script tagline), centered arch frame, full-width stacked CTAs, and disabled horizontal `leftWingX`/`rightWingX` divergence below `960px` while leaving desktop untouched.
- [x] **R5. Velocity Marquee (`global.css`):** Clean comfortable mobile padding & readable sizing (`var(--text-xs)`).
- [x] **R6. Horizontal Flavour Lookbook (`HorizontalLookbookSection.jsx`, `sections.css`):** Edge-to-edge swipeable lookbook cards on `< 960px`, balanced `4 / 3.1` arch proportion, hidden desktop-only vertical scroll progress below `960px`.
- [x] **R7. Exploded Cup Anatomy (`CupAnatomySection.jsx`, `sections.css`):** Fluid `viewBox` responsive SVG (`width: 100%; max-width: 320px`) + scaled mobile layer spread (`< 640px`) preventing text collisions.
- [x] **R8. Sticky Serve Rituals (`ServeRitualsSection.jsx`, `sections.css`):** Dedicated mobile layout displaying each chapter's photograph right inside its chapter card (`< 900px`) while preserving the sticky split layout on desktop (`>= 900px`).
- [x] **R9. Cinema Reels Deck (`ReelsSection.jsx`, `sections.css`):** Disabled opposing vertical parallax (`reelLeftY`/`reelRightY`) below `960px` so stacked vertical reels stay aligned, plus compact mobile video width (`295px`).
- [x] **R10. Impact Calculator & CTA Banner (`ImpactCalculator.jsx`, `CtaBanner.jsx`, `sections.css`):** Wrapping range headers, `minmax(min(100%, 155px), 1fr)` stat cells, full-width mobile CTA buttons (`< 640px`).

## Inner Pages
- [x] **R11. Products Catalogue (`ProductsPage.jsx`, `ProductCard.jsx`, `sections.css`):** Safe `minmax(min(100%, 260px), 1fr)` grids, disabled hover glaze on narrow mobile, balanced `< 840px` showcase flow.
- [x] **R12. Product Detail (`ProductDetailPage.jsx`, `sections.css`):** Crest emblem tucked cleanly inside image bounds (`top: 8px; right: 8px`) below `640px`, safe `minmax(min(100%, 160px), 1fr)` specs/pairings.
- [x] **R13. Catering & Sustainability (`CateringBulkPage.jsx`, `SustainabilityPage.jsx`, `sections.css`):** Compact `timeline-scroll-wrap` (`32px 1fr`) on small phones, crash-proof `minmax(min(100%, ...), 1fr)` form rows, mobile-friendly comparison tables.
- [x] **R14. FAQ/Contact, About, & Footer (`FaqContactPage.jsx`, `AboutPage.jsx`, `Footer.jsx`, `layout.css`):** Mobile-safe form rows and ledger columns, verified clean build & unit test suite.
