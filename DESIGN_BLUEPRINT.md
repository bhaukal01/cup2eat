# CUP2EAT — $1,000/hr Editorial Interactive Design & Motion Blueprint

> **Design Philosophy:** *"Taste the Pixels. Zero Disposable Clichés."*
> Grounded in `@cup2eat` brand artifacts (`Screenshot_20261110_174945_Instagram.jpg`, `VID_20261110_042035_407.mp4`, `VID_20261110_042054_839.mp4`), Awwwards editorial F&B flagships, and `.agents/skills/ui-ux-design.md` + `frontend-engineering.md`.

---

## 0. Audit of Generic "Vibe-Coded" Elements Eliminated
1. **Killed:** "Text Left + Rectangle Photo Right" default hero split. -> **Replaced with:** Orbital Botanical Poster Hero with split giant typography framing a central 3D pointer-tilted circular cup emblem + multi-plane parallax spice tokens.
2. **Killed:** Standard 3/4-column boxed icon-above-text grids (`Triad of Equal Cards`). -> **Replaced with:** Scroll-pinned horizontal lookbook gallery, exploded scroll-driven cup anatomy diagram, hairline typographic ledgers, and asymmetric staggered masonry runways.
3. **Killed:** Bland `opacity: 0, y: 12` page swaps. -> **Replaced with:** **Origin-Aware Liquid Chai Iris + Scalloped Cup-Crest Curtain** page transitions triggered from exact click coordinates `(clientX, clientY)`.
4. **Killed:** Instant bland hero render with zero ceremony. -> **Replaced with:** **"Steep & Crunch" Interactive Cup-Fill Preloader** (~1.05s crisp liquid wave SVG loader that opens via radial iris mask into the parallax hero).
5. **Killed:** Generic static `div` layouts. -> **Replaced with:** Continuous `useScroll` + `useTransform` parallax depth drift, scroll-velocity reactive marquees (`useVelocity`), `pathLength` SVG timelines, and parabolic Fly-to-Cart item projectiles.

---

## 1. Global Architecture & Cross-Site Motion Systems

### 1.1 Opening Experience — `PourPreloader` (`src/components/motion/PourPreloader.jsx`)
- **Canvas:** Full-screen Deep Forest Pine (`#183629`) editorial veil with subtle fine paper noise grain.
- **Visual Element:**
  - Center vector biscuit cup silhouette with **animated rising chai/amber wave path** filling from base to rim (`0%` to `100%`).
  - Rotating SVG circular typography ring: `CUP2EAT · EAT YOUR DRINK · FSSAI LICENSED · 100% EDIBLE ·`.
  - Steaming aromatic wisps above rim (`motion.path` smooth opacity + float).
  - Crisp `Fraunces` numeric steep counter (`00` -> `100`) + accessible `"Enter Immediately"` skip pill.
- **Exit Transition:** Expanding circular iris reveal (`clipPath: circle(0% -> 150%)`) uncovering the already-animating Hero canvas beneath. Shown cleanly once per browser session (`sessionStorage` flag) and skipped gracefully under `prefers-reduced-motion`.

### 1.2 Signature Page-Switching Choreography — `CupCrestTransition` (`src/components/motion/CupCrestTransition.jsx`)
- **Problem Solved:** Generic React Router cross-fades do not visually look like turning pages inside an edible-cup brand universe.
- **Original Invention ("Click-Origin Espresso Wave + Scalloped Crest Reveal"):**
  1. **Origin Tracking (`TransitionContext`):** Global click listener records the exact viewport coordinate `(x, y)` of any link/route button click (defaults to `50% 50%` on keyboard or back-button nav).
  2. **Departing Layer:** Current page smoothly recedes (`scale: 1 -> 0.965`, `opacity: 1 -> 0.55`, subtle warm warmth dim).
  3. **Wave 1 (Roasted Cocoa Rim Accent `#C69C53`) + Wave 2 (Deep Forest Pine `#183629`):** Expand radially from `(x, y)` via `clip-path: circle(0% at X Y) -> circle(160% at X Y)` over `320ms`.
  4. **Mid-Transition Crest Stamp:** At peak coverage (~180ms pause), an oversized central rotating circular gold emblem (`CUP-2-EAT`) + crisp chapter label derived from target pathname (`01 / HOME`, `02 / EDIBLE CUPS`, `03 / CATERING`, `04 / SUSTAINABILITY`, `05 / STORY`, `06 / CONTACT`) springs into view cleanly.
  5. **Revealing Iris Peel:** An **organic wavy cup-meniscus curtain / top-arch wipe** sweeps away (`translateY: 0% -> -104%` with curved bottom wave SVG lip), revealing the new page hero springing forward from `scale: 1.03 -> 1`. Total round-trip ~680ms — fast, cinematic, zero blocking!

### 1.3 Scroll Choreography & Tactile Microinteractions
- **Scroll Progress Hairline (`ScrollProgressBar`):** Continuous `useSpring(scrollYProgress)` gold-to-forest hairline at viewport top.
- **Velocity-Reactive Marquee (`VelocityMarquee`):** `useScroll` + `useVelocity` + `useSpring` accelerates horizontal marquee tracks when the user scrolls faster (`EDIBLE CUPS · REAL FLAVOURS · A GREENER PLANET · ₹20 COATED POUCHES`).
- **Tactile Cursor Follower (`TactileCursor` — desktop fine pointers only):** Soft translucent gold/forest ring trailing cursor cleanly; expands into circular label badges (`VIEW`, `TASTE`, `PLAY`, `BITE`) over interactive photo portals and reels. Automatically disabled on touch devices and reduced-motion.
- **Parabolic Fly-to-Cart Projectile (`FlyToCartLayer`):** Reads live `sourceEl.getBoundingClientRect()` & navbar `Order Box` `targetEl.getBoundingClientRect()`, computes curved parabolic apex via `computeFlightTrajectory`, flies circular product photo (`520ms`), pops cart counter badge via spring scale bounce (`cartBumpKey`).

---

## 2. Page-by-Page & Section-by-Section Specification

### PAGE 1: HOME (`/`) — `src/pages/HomePage.jsx`
1. **Section 1.1: Orbital Poster Hero (`HeroSection.jsx`)**
   - **Layout:** Zero 2-column box split! Full-width symmetrical-meets-broken poster grid (`min-height: 92vh`):
     - Massive background ghost outline watermark (`CUP2EAT`) drifting slowly horizontally on scroll (`useTransform` parallax X).
     - Split oversized serif lines: Top-left `SIP HOT CHAI.` · Bottom-right `CRUNCH THE CUP.` with oversized `Caveat` brush script `Eat Your Drink.` overlapping the central photo boundary!
     - Centerpiece: Arch-masked / Circular-rim framed high-res cup composition (`hero-cups.jpg`) featuring interactive **3D pointer perspective tilt (`rotateX`, `rotateY`)** + subtle scroll depth scale (`1 -> 1.08`).
     - **4 Multi-Depth Parallax Ingredient Satellites** positioned asymmetrically around the hero perimeter:
       - Top-left: Rotating `BrandLogo` wax-seal rotating (`0deg -> 45deg`) on scroll.
       - Mid-left: Floating `₹20 COATED POUCH` stamp (`y: [0, -36]` on scroll).
       - Mid-right: Floating `40 MIN HOT HOLD` gauge pill (`y: [0, 42]` counter-parallax on scroll).
       - Bottom-left: `FSSAI LICENSED · PURE VEG · VEGAN FRIENDLY · 100% EDIBLE` bare typographic hairline ledger.
2. **Section 1.2: Dual Counter-Scrolling Velocity Marquee (`VelocityMarquee.jsx`)**
   - **Layout:** Edge-to-edge thin ribbon strip in dark forest & warm gold typography; left band scrolls left while scrolling down, right hairline sub-band counter-scrolls right (`EDIBLE CUPS | REAL FLAVOURS | A GREENER PLANET | ZERO PLASTIC`).
3. **Section 1.3: Scroll-Driven Horizontal Flavour Lookbook (`HorizontalLookbookSection.jsx`)**
   - **Layout (Desktop `>= 960px`):** Tall vertical scroll track (`250vh`) containing a `position: sticky; top: 0; height: 100vh` horizontal runway driven via `useScroll` + `useTransform`! (On `< 960px`, graceful crisp touch horizontal snap track).
   - **Elements per Runway Slide:**
     - Giant translucent numeral behind each flavour (`01`, `02`, `03`, `04`, `05`).
     - **Inverted-Cup Arch Photography Frame** (`border-radius: 240px 240px 18px 18px` — signature architectural silhouette echoing CUP2EAT cups, NOT generic squares!).
     - Live tint badge (`₹20/cup` / `₹16/cup`), beverage pairing list, and **`Launch to Order Box`** button with parabolic **fly-to-cart projectile** attached to the arch photograph!
     - Live runway progress indicator (`01 / 05`) pinned bottom-right.
4. **Section 1.4: "Inside the Biscuit Wall" — Scroll-Exploded Cup Anatomy (`CupAnatomySection.jsx`)**
   - **Layout:** Asymmetric 2-column sticky diagram:
     - Left/Sticky: Interactive SVG cross-section of a CUP2EAT cup broken into **4 floating layers** whose vertical spacing (`y` spread `0px -> 95px` via `useScroll`) expands cleanly like an exploded engineering diagram as you scroll down!
       - Layer 1: *Dark Chocolate Rim Glaze / Aromatic Spice Crust*
       - Layer 2: *High-Density Whole Wheat & Oat Biscuit Wall*
       - Layer 3: *Natural Moisture-Barrier Seal (40m Hot / 75m Cold Hold)*
       - Layer 4: *Zero-Plastic Biodegradable Crunch Base*
     - Right: Scrollable technical narrative steps (`01`..`04`) highlighting which layer illuminates on hover or viewport entry.
5. **Section 1.5: Sticky Scrollytelling Serve Rituals (`ServeRitualsSection.jsx`)**
   - **Layout:** Sticky arch-framed full-bleed photo stage left + unboxed hairline typographic chapters right (`Street Masala Chai`, `₹20 Sealed Café Pouch`, `Birthday Brownies in Edible Cups`), swapping imagery seamlessly on scroll intersection or click.
6. **Section 1.6: Deep Forest Curved Cinema Reels Deck (`ReelsSection.jsx`)**
   - **Layout:** Curved SVG wave entry into deep `#183629` forest canvas. Two opposing parallax-offset 9:16 video cinema frames (`y: -20` left reel vs `y: +20` right reel on scroll) showing the real `@cup2eat` MP4 reels, flanked by gold index typography & crisp bulleted highlights.
7. **Section 1.7: Open Impact Calculator & Curved Forest Footer CTA (`ImpactCalculator.jsx` & `CtaBanner.jsx`)**
   - Interactive live slider updating oversized tabular serif metrics (`Disposable Cups Saved`, `kg Waste Avoided`, `Trash Bags Eliminated`) beside a live visual counter-bar + closing `"Small Sip. Big Change."` curved forest band.

---

### PAGE 2: EDIBLE CUPS CATALOGUE (`/products`) — `src/pages/ProductsPage.jsx`
- **Page Header:** Parallax editorial banner with rotated numeral watermark.
- **Sticky Glass-Free Warm Parchment Filter Ribbon:** `Tabs` with shared `layoutId` spring indicator (`All`, `Chocolate Coated (₹20)`, `Elaichi Chai`, `Chocolate & Vanilla`, `Party & Taster Boxes`), live search input, capacity selector (`100 ml` / `150 ml`).
- **Staggered Asymmetric Masonry Runway (NO Uniform 3-Col Box Grid!):**
  - Item `01` (`Chocolate Coated ₹20`) spans double-column wide editorial hero spread with oversized price callout & immediate `Launch to Order Box` fly-to-cart trigger.
  - Remaining items alternate staggered vertical offsets (odd/even vertical stagger + arched top photo masks + unboxed bottom hairline specs).
  - Hovering a product photo reveals beverage pairings cleanly inside an animated frosted forest glaze strip.
- **Capacity Comparison Ledger:** Clean hairline spec table (`100 ml` vs `150 ml`).

---

### PAGE 3: PRODUCT DETAIL (`/products/:productId`) — `src/pages/ProductDetailPage.jsx`
- **Layout:** Full-height sticky packaging photo canvas on left (with live 3D mouse tilt + rotating `100% EDIBLE` crest badge) paired with unboxed editorial unboxing narrative on right.
- **Interactive Controls:**
  - Capacity selector pills (`100 ml` / `150 ml`).
  - Pack tier selector (`12`, `24`, `50`, `100` cups) displaying dynamic per-cup unit savings live.
  - **`Add Pack to Order Box` CTA:** Fires circular thumbnail flight trajectory straight from sticky detail photo into navbar Order Box!
- **Related Flavours:** Offset editorial 3-up bottom showcase strip.

---

### PAGE 4: CATERING & BULK WHOLESALE (`/catering`) — `src/pages/CateringBulkPage.jsx`
- **Section 4.1: Scroll-Drawn Process Spine (`ProcessTimeline`):** Continuous vertical SVG dashed-to-solid path (`pathLength` driven continuously by `useScroll`) linking `01 Choose Flavour Mix` -> `02 Tasting Box Verification` -> `03 Pan-India Cushioned Dispatch`.
- **Section 4.2: Numbered Editorial Use-Cases (No Box Cards):** Cafés & Chai Tapris, Birthday Brownie Bars, Weddings & Live Counters, Corporate Pantries.
- **Section 4.3: Transparent Volume Slab Table + Validated Wholesale Brief Generator** (instant reference ID + 1-click copy + `@cup2eat` DM launch).

---

### PAGE 5: SUSTAINABILITY (`/sustainability`) — `src/pages/SustainabilityPage.jsx`
- **Section 5.1: Scroll-Animated Decay Timeline Bars:** Visual proportional timeline bars scrolling into view (`Plastic Cup: 400+ Yrs` / `PE-Lined Paper: 20+ Yrs` / `Clay Kulhad: High Kiln Energy` / `CUP2EAT: 5 Mins to Crunch`).
- **Section 5.2: Material Comparison Ledger & Full `ImpactCalculator`** + FSSAI & Vegan Transparency Chapters.

---

### PAGE 6: ABOUT / STORY (`/about`) — `src/pages/AboutPage.jsx`
- **Section 6.1: Magazine Drop-Cap Narrative Spread + Dual-Depth Parallax Stills:** Story of replacing plastic & kulhads across India, paired with rotating crest seal and hairline engineering metrics.
- **Section 6.2: Deep Forest `@cup2eat` Cinema Reels Deck**.

---

### PAGE 7: FAQ & CONTACT (`/contact`) — `src/pages/FaqContactPage.jsx`
- **Section 7.1: Spring-Animated Category Filter Tabs + Fluid Height-Morph Accordion (`FAQS`)**.
- **Section 7.2: Asymmetric Validated Concierge Form + Direct `@cup2eat` Channel Panel**.

---

### PAGE 8: 404 NOT FOUND (`*`) — `src/pages/NotFoundPage.jsx`
- Playful crisp botanical empty state ("Your cup ran empty") routing smoothly via `CupCrestTransition` back to `/` or `/products`.

