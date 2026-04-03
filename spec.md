# AI Health Zon

## Current State
The app has 20+ pages covering hospital revenue intelligence, ABDM compliance, NHCX, investor pitch, training modules, patient kiosk, pricing, vendors network, and future innovation. All pages use the McKinsey editorial layout with the Layout wrapper component. App.tsx uses TanStack Router.

## Requested Changes (Diff)

### Add
- New page `/maa-yojana-packages` — MAA Yojana Package Code Search
  - Hero section with McKinsey editorial style
  - Search bar: search by Package Code, Package Name, or Speciality (live filter)
  - Filters: Category (Tertiary/Secondary), Speciality dropdown (36 unique), Rate range
  - Results table/cards showing: SR No, Package Code, Package Name, Speciality, Category, Rate (₹), Pre-Auth Documents, Claim Documents, Special Conditions
  - Expandable row/card to show full package description, pre-auth docs, claim docs, special conditions
  - Stats banner: 3,453 packages, 36 specialities, 2 categories
  - Data sourced from `src/data/maaYojanaPackages.json` (already generated from Excel)
  - Pagination (50 per page) for performance
  - Route registered in App.tsx as `/maa-yojana-packages`
- Link to the new page added in navigation

### Modify
- `App.tsx`: import and register new route

### Remove
- Nothing removed

## Implementation Plan
1. Create `src/pages/MaaYojanaPackages.tsx` with search, filter, paginated results table, and expandable detail cards
2. Update `App.tsx` to import and register the `/maa-yojana-packages` route
3. Add nav link to the page (check Layout/Nav component)
