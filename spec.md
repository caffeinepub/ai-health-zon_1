# AI Health Zon

## Current State
The homepage (`CurrentAffairs.tsx`) is a McKinsey-style editorial layout covering Indian healthcare revolution, transformation pillars, news, stats, governance, and CTA. There is an existing `MissionVision.tsx` component and `AboutSection.tsx` but they are not integrated into the homepage in a prominent, detailed way.

## Requested Changes (Diff)

### Add
- **Mission & Vision section** on the homepage: Clear, bold Mission statement ("Transforming hospital revenue integrity for every Indian patient") and Vision statement ("A fully digital, financially sustainable Indian healthcare system by 2030"), with supporting sub-points and a visual divider.
- **Future Prospective for Hospitals section**: Forward-looking 3–4 card layout covering 2025–2030 trends — AI-driven claim automation, value-based care, ABDM/NHCX ecosystem, and revenue intelligence.
- **AI Health Zon Impact section**: Stats + narrative on the real-world impact (claims processed, clean claim rate, hospitals onboarded, revenue recovered), with a brief "How AI Health Zon is creating impact" editorial block.
- **Visionary Impact of Amit Mansingh section**: A dedicated founder spotlight card with name, title (Founder & CEO, Triple Top Pattern Health Pvt. Ltd.), a short bio drawn from his LinkedIn background (healthcare revenue management expert, 15+ years, NABH/NHCX/ABDM specialist, ex-hospital administrator, thought leader), key contributions/vision points, LinkedIn link, and a professional avatar/generated image.

### Modify
- `CurrentAffairs.tsx`: Insert the four new sections between the governance section and the existing future outlook/CTA sections.

### Remove
- Nothing removed.

## Implementation Plan
1. Generate a professional portrait-style image for Amit Mansingh founder spotlight.
2. Add Mission & Vision section to `CurrentAffairs.tsx`.
3. Add Future Prospective cards section.
4. Add AI Health Zon Impact section with animated stats.
5. Add Amit Mansingh Visionary Impact section with LinkedIn link.
6. Validate and build.
