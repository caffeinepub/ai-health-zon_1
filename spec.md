# AI Health Zon

## Current State
Homepage hero section uses an animated mesh gradient background with glassmorphism split layout. No video background present.

## Requested Changes (Diff)

### Add
- YouTube video background (`nlRl-V2lvSg`) in the hero section, absolutely positioned behind all content, autoplaying muted and looping
- Semi-transparent dark overlay on top of the video to maintain text readability

### Modify
- Hero section: keep existing layout, text, buttons, and KPI card; add video as a background layer beneath all content
- Reduce or remove the gradient blobs since the video provides the background visual

### Remove
- Nothing removed

## Implementation Plan
1. Inside the hero `<section>` (line ~1330 in HomeDashboard.tsx), add an absolutely positioned `<div>` as the first child containing a YouTube iframe embed with params: `autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&modestbranding=1&playlist=nlRl-V2lvSg`
2. Style the iframe container: `absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0`, with the iframe scaled up (scale-150 or similar) to cover without letterboxing
3. Add a semi-transparent overlay div (`absolute inset-0 bg-black/50 z-0`) for text contrast
4. Ensure all existing content has `relative z-10` or higher z-index
5. Adjust hero section background to transparent or minimal so video shows through
