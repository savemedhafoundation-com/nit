# Work Log

## Today
- Split navbar into desktop/mobile components with matchMedia detection and conditional rendering.
- Built mobile navbar UI (hamburger/center logo/actions, slide-in drawer, overlay, scroll lock) and refined shapes/icons.
- Added desktop navbar dropdown with caret and custom clipped green menu, plus restored desktop CTA background shape.
- Implemented mobile-only layouts for "What Problems NIT Can Help With" and "Healing Beyond Medicine" sections in `src/pages/Home.jsx` while keeping desktop intact.
- Tuned mobile typography and headers to match provided designs, including white subtitle strip styling.
- Made the “When modern medicine says…” quote italic on mobile only in `src/pages/Home.jsx`.
- Increased mobile disclaimer text size and added “Read Full” expand/collapse behavior for the mobile “What Problems NIT Can Help With” description in `src/pages/Home.jsx`.
- Implemented a themed search modal for the mobile navbar search icon in `src/components/MobileNavbar.jsx`.
- Fixed desktop navbar link hitbox overlap so the Blog link reliably navigates to `/blog` (CTA gradient no longer intercepts clicks) in `src/components/DesktopNavbar.jsx`.
