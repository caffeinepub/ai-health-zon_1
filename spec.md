# AI Health Zon

## Current State
- Home page (`HomeDashboard.tsx`) is a comprehensive SaaS-style page with 11 sections: Hero, Problem, Solution, Modules, Dashboard, How It Works, Who Benefits, Security, Case Study, Simulation Lab, CTA.
- Ecosystem page (`Ecosystem.tsx`) has its own hero, an interactive SVG ecosystem diagram (orbiting nodes), and 7 pillar cards.
- Both pages are separate routes (`/` and `/ecosystem`).
- Nav includes both "Home" and "Ecosystem" as separate links.
- The app has animations via `motion/react` throughout.

## Requested Changes (Diff)

### Add
- Merge Ecosystem content into the Home page: the interactive SVG ecosystem diagram and 7 ecosystem pillar cards should become sections of the merged Home page.
- Add relevant generated images (hero background visual, ecosystem diagram visual, RCM workflow visual, case study hospital visual) as impactful section backgrounds or side visuals — positioned to enhance readability.
- Add entrance animations (fade-up, scale-in, stagger) to all major sections and cards on the merged page.
- Add a floating "pulse" or "glow" animated background element to the hero section to make it more dynamic.
- Add counter animation to KPI numbers (animate from 0 to final value when scrolled into view).
- Ecosystem section within the home page should have a brief introductory heading explaining what the ecosystem is.
- Remove the standalone `/ecosystem` route and its nav link — redirect to home.

### Modify
- `HomeDashboard.tsx` (or `Home.tsx`): Merge the Ecosystem SVG diagram section and pillar cards into the body of the homepage, positioned after the "Who Benefits" section and before Security.
- `Navigation.tsx`: Remove the "Ecosystem" link from nav (since the page is merged). Keep all other nav links. The logo still links to `/`.
- `Footer.tsx`: Remove the "Ecosystem" footer link.
- `App.tsx`: Remove the `ecosystemRoute`. The `/ecosystem` path can redirect to `/` or simply be removed.
- Hero section: Add an animated background with subtle healthcare/data network SVG particle effect or glowing orb animation.
- All section cards: Ensure smooth staggered entrance animations.

### Remove
- `Ecosystem.tsx` page as a standalone page (content merged into HomeDashboard).
- Ecosystem route from router.
- Ecosystem link from nav and footer.

## Implementation Plan
1. Generate 2–3 images: hero section visual (hospital command centre / healthcare data network), ecosystem network diagram visual, and an RCM workflow / hospital corridor visual.
2. Merge Ecosystem SVG diagram and pillars into `HomeDashboard.tsx` as two new sections (after "Who Benefits").
3. Enhance hero section with animated background: add floating gradient blobs that pulse/move, and optionally an image overlay.
4. Add section images where appropriate: side-by-side image in the "How It Works" or "Case Study" section.
5. Add counter animations on KPI cards (using `useInView` + `useMotionValue`).
6. Update `Navigation.tsx` to remove Ecosystem link.
7. Update `Footer.tsx` to remove Ecosystem link.
8. Update `App.tsx` to remove ecosystemRoute and import.
9. `Home.tsx` continues to render `HomeDashboard`.
10. Run typecheck and build to verify.
