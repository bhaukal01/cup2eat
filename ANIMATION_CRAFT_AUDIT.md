# CUP2EAT — Anti-"Vibe-Coded" Motion Craft & Static-Element Audit

> Grounded in web research on 2025–2026 LLM UI clichés vs. editorial Kinfolk/Aesop/Awwwards craft microinteractions.

---

## 1. "Vibe-Coded" Hover & Animation Clichés Strictly Avoided
1. **Unprompted Neon Purple/Cyan Hover Glows** — Replaced with restrained warm cream, espresso (`#3D2116`), brushed gold (`#C69C53`), and forest pine (`#183629`) cardstock fills.
2. **Aggressive Rubber Magnetic Cursor Tracking on Buttons** — Replaced with grounded `360ms cubic-bezier(0.16, 1, 0.3, 1)` directional cardstock edge wipes and clean `1px` typographic lifts.
3. **Jarring Bento Grid Scale Reflows** — Never scale cards into neighbors; use subtle internal image zoom (`overflow: hidden`) and sliding bottom hairline rules (`transform: scaleX`).
4. **Continuous Infinite Bobbing Pill Badges** — Avoided perpetual sine-wave chip loops (`@keyframes float`) across cards and headers.
5. **Harsh Instant Show/Hide Pop-Ins (`if (!open) return null`)** — Every Drawer, Dialog, Toast, Mobile Nav, Alert, and Pack Selector uses smooth deceleration springs.

---

## 2. Specific Static / Abrupt Elements Upgraded
- [x] **M1. Cart Drawer & Confirm Dialog (`Overlay.jsx`, `CartDrawer.jsx`):**
  - Replaced instant mount/unmount with Framer Motion `AnimatePresence` sliding drawer (`[0.16, 1, 0.3, 1]`) + backdrop fade + staggered line-item emergence (`delay: 0.04 * idx`) + Free-Shipping fill meter + spring number pop on quantity change.
- [x] **M2. Emerging Toast Notifications (`ToastViewport.jsx`, `ToastContext.jsx`, `ui.css`):**
  - Positioned in bottom-left margin note slot emerging upward (`y: 26 -> 0`, `scale: 0.92 -> 1`, `opacity: 0 -> 1` over `420ms`), includes a shrinking gold life underline, and pauses dismissal cleanly on pointer hover.
- [x] **M3. "Boiling Tea Cup" Fast Card-to-Cart Launch (`FlyToCartLayer.jsx`, `ProductCard.jsx`, `HorizontalLookbookSection.jsx`, `global.css`):**
  - On clicking `Add Pack`, fires a crisp ~320ms double concentric amber-chai liquid ripple + 3 upward steam droplets at the card launch point while the product thumbnail emerges upward out of the cup ripple along its parabolic flight arc (`560ms`) into the Order Box pill.
- [x] **M4. Slower, Ultra-Readable Page Change Transition (`CupCrestTransition.jsx`):**
  - Reduced copy strictly to single crisp keyword (`01 HOME`, `02 CUPS`, `02 FLAVOUR`, `03 BULK`, `04 PLANET`, `05 STORY`, `06 CONTACT`) and paced sweep-in (`270ms`) + calm hold (`260ms`) + sweep-out (`280ms`, `~810ms` total) so users easily read the route label.
- [x] **M5. Editorial Sliding-Fill Buttons (`ui.css`):**
  - Added directional cardstock bottom-to-top fill wipe (`::before` rising smoothly at `360ms cubic-bezier(0.16, 1, 0.3, 1)`) + `1px` label lift + `:active` press (`scale(0.97)`).
- [x] **M6. Sliding `RadioGroup` Pill (`FormControls.jsx`):**
  - Added shared Framer Motion `layoutId` spring highlight sliding cleanly across capacity (`100 ml` / `150 ml`) and pack options.
- [x] **M7. Animated `PageHeader`, `MobileNav`, `Alert`, `ImpactCalculator`, `Footer`, & `ProductCard` (`sections.css`, `layout.css`, `DataDisplay.jsx`):**
  - Added animated mobile drawer reveal + staggered links; masked title entrance + breadcrumb glide on `PageHeader`; gold hairline underline sweep on `ProductCard` & `Footer` links; animated `Alert` & `EmptyState` entrances; numeric pop + scale meter inside `ImpactCalculator`.
