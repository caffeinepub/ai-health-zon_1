# AI Health Zon

## Current State
The app has a Hospitals page with a "Healthcare Journey Story" section rendered as a simple alternating left-right timeline with 6 stages (Discovery, Registration, Pre-Authorization, Treatment, Claim Submission, Reconciliation). There is no dedicated cinematic film-style experience for this content.

## Requested Changes (Diff)

### Add
- A new page `/journey-film` — a full-screen cinematic "film experience" presenting the Healthcare Journey Story as a scrollable movie/film strip
- Each of the 6 journey stages is presented as a cinematic scene with: scene number (clapperboard style), full-screen dark backdrop, dramatic title card, description, and animated badge tags
- Film strip / reel aesthetic: sprocket holes on sides, scene transitions, film grain overlay, cinematic letterbox bars
- Auto-play mode: scenes advance automatically every 4 seconds with a progress bar; can be paused/manually navigated
- "Now Playing" header bar styled like a cinema screen with title
- Stage progress indicator styled like film frames at the bottom
- A "Play Film" button on the Hospitals page Journey Story section that links to this new page
- Nav link added for the film page (or accessible via Hospitals page)

### Modify
- `Hospitals.tsx` — add a "Watch as Film" button to the Journey Story section that links to `/journey-film`
- `App.tsx` — add the new `/journey-film` route
- `Navigation.tsx` — no change needed (accessible via Hospitals page CTA)

### Remove
- Nothing removed

## Implementation Plan
1. Create `src/frontend/src/pages/JourneyFilm.tsx` — cinematic film page with:
   - Dark full-screen layout (no standard nav/footer, or minimal nav)
   - Film strip sprocket holes using CSS
   - Each stage is a "scene" with cinematic typography
   - Auto-advance with progress bar, pause/play, previous/next controls
   - Film reel bottom navigation showing all 6 scene frames
   - Smooth fade/slide scene transitions using framer-motion
   - Letterbox black bars top and bottom (cinema feel)
   - Film grain texture overlay via CSS noise animation
2. Add route `/journey-film` to `App.tsx`
3. Add "Watch as Film 🎬" button/link to the Journey Story section in `Hospitals.tsx`
