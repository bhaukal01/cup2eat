# CUP2EAT — Granular Audit & Polish Checklist

> Audited against uploaded screenshot (`media_1794317788903_9d1f86c7.png`) and full source inspection across `tokens.css`, `global.css`, `layout.css`, `ui.css`, `sections.css`, motion primitives, and all routes.

---

## A. Performance & Lag Elimination
- [x] **A1.** Removed full-viewport SVG `feTurbulence` noise layer (`body::before` in `global.css`) causing per-frame software compositing lag on scroll.
- [x] **A2.** Removed heavy `backdrop-filter: blur(8px)` from `.site-header` and `.arch-cup-label` in favor of clean translucent solid backgrounds.
- [x] **A3.** Refactored `TactileCursor` to use delegated `mouseover` events instead of running `closest('[data-cursor]')` on every pixel of mouse movement, and kept hidden until inside viewport (`clientX > 12 && clientY > 12`).
- [x] **A4.** Synchronized `Lenis` (`SmoothScrollProvider`) with Framer Motion's shared `frame.update` loop (`autoRaf={false}`) so scroll frames never fight each other.

## B. Practical & Easily Readable Typography Scale
- [x] **B1.** Upgraded typography tokens in `src/styles/tokens.css`: `--text-xs: 0.9rem` (~14.4px), `--text-sm: 1rem` (16px), `--text-base: 1.0625rem` (17px), `--text-lg: 1.2rem`, `--text-xl: 1.425rem`, `--text-2xl: 1.85rem`, `--text-3xl: 2.35rem`.
- [x] **B2.** Strengthened muted ink contrast (`--color-ink-700: #2f2a24`, `--color-ink-500: #554d43`) across warm parchment/cream surfaces.
- [x] **B3.** Replaced undersized hardcoded font sizes across `.site-brand-sub` (`0.875rem`), `.tactile-cursor--labeled` (`0.8rem`), `CupAnatomySection` SVG labels (`12px–12.5px`), and navbar/footer labels.

## C. Marquee Speed & Animated Scroll Experience (Lenis + Perspective Scroll)
- [x] **C1.** Calmed `VelocityMarquee` speed in `HomePage` & `MotionPrimitives.jsx` (`baseVelocity` tuned down from `28`/`22` to `3.2`/`2.6` with smooth clamped velocity multiplier `[0, 1.4] * 1.8`).
- [x] **C2.** Integrated `Lenis` (`lenis@1.3.27`) weighted momentum smooth scroll across mouse-wheel & trackpad gestures (`SmoothScrollProvider.jsx`), cleanly paused/reset via `lenis.scrollTo(0, { immediate: true })` during route switches.
- [x] **C3.** Added `<ScrollPerspectiveSection>` (`rotateX: 5deg -> 0deg`, `scale: 0.94 -> 1`, `y: 34 -> 0`) + amplified split-wing Hero scroll divergence (`±56px`) + `Scroll Down` animated cue so scroll physics feel distinctly kinetic across the page.

## D. Distinct Initial Loader vs Snappy Page-Change Transition
- [x] **D1.** Refactored `PourPreloader` into a warm-cream **Dual-Gate Unboxing Curtain** (left & right doors parting outward cleanly in ~720ms) that fires on cold direct load of ANY URL (`/` or `/products` directly).
- [x] **D2.** Refactored `CupCrestTransition` to be completely distinct and snappy (~440ms total): runs **only** on in-app route changes (`hasMountedRef` skips direct page loads) with a fast left-to-right deep-forest & brushed-gold sweep resetting scroll behind the curtain.

## E. Mini Catalog on Home Page (`HorizontalLookbookSection`) Responsiveness & Proportions
- [x] **E1.** Measured dynamic horizontal container overflow cleanly via `ResizeObserver` (`scrollWidth - clientWidth`) so all 5 slides align cleanly from `1024px` to `1920px+`.
- [x] **E2.** Applied Motion `x` scroll transform strictly on desktop (`>= 960px`) while using clean native horizontal snap-scroll + Prev/Next controls on mobile/tablet (`< 960px`).
- [x] **E3.** Rebalanced slide dimensions (`clamp(275px, 23vw, 340px)` width, `4 / 3.35` image ratio, `max-height: 36vh`) so headers, arched cards, price rows, CTA buttons, and progress bar fit comfortably inside `100vh` laptops without clipping.

## F. Fix Clipped Badges on Curved Arches & Element Size Ratios
- [x] **F1.** Moved `.product-card-badge` out of the curved `120px+` top-left arch mask into the clean unclipped metadata row right below the arched photography in `ProductCard.jsx` (fixing chopped badge text shown in `media_1794317788903_9d1f86c7.png`).
- [x] **F2.** Moved `.runway-numeral-ghost` from the curved top arch corner to the straight `16px`-radius bottom-right corner inside `runway-arch-card`.
- [x] **F3.** Rebalanced `ProductsPage` asymmetric slots (`16 / 10` landscape on wide 7-col cards, `4 / 3.35` on 5-col cards, gentler `space-5` vertical offset) so neighboring items match visually.
- [x] **F4.** Tightened Hero `.arch-cup-frame` (`min(100%, 336px)` / `4 / 4.35`), `.detail-photo` (`4 / 3.4`, max `460px`), `.sticky-photo-canvas`, and fixed `.hero-ledger` -> `.orbital-bottom-ledger` class matches on `ProductDetailPage.jsx` & `AboutPage.jsx`.

## G. Final Layout Code Audit & Verification
- [x] **G1.** Audited CSS/JSX across `tokens.css`, `global.css`, `layout.css`, `sections.css`, `ProductDetailPage.jsx`, `AboutPage.jsx`, `CartDrawer.jsx`, `ServeRitualsSection.jsx`, `ReelsSection.jsx`, `HorizontalLookbookSection.jsx`, `CupCrestTransition.jsx`, and `PourPreloader.jsx`.
- [x] **G2.** Verified all unit tests pass (`npm test`: 4 files, 13/13 tests) and production build compiles cleanly (`npm run build`: `vite build` succeeded cleanly in `dist/`).
