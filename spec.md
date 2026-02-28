# AI Health Zon

## Current State
New project — no existing pages or components.

## Requested Changes (Diff)

### Add
- Full React + TypeScript + Vite frontend with TanStack Router
- Motoko backend on ICP
- 9 fully implemented pages: Home, Ecosystem, Hospitals, CommandCentre, PatientSupport, Compliance, DigitalHealth, Insights, JoinNetwork
- Shared Layout with scroll-aware Navigation and Footer
- HealthGardenTree interactive SVG hero on Home page
- Interactive SVG ecosystem diagram on Ecosystem page
- Hospital pain points, solution modules, before/after comparison
- Command Centre with SVG/CSS chart visualizations for claim tracking, rejection analytics, clean claim scoring, department risk index
- Patient lifecycle support page with ABHA flow diagram
- NABH 6th Edition compliance framework with 5 pillars
- ABDM digital health page with implementation checklist
- Filterable Insights page (Blogs, Case Studies, Scheme Updates, RCM Insights)
- JoinNetwork stakeholder registration form (hospital, insurer, vendor, professional, NGO, ambulance)
- Floating Chatbot with 15+ keyword-based responses
- WhatsApp floating button
- Demo booking dialog (react-hook-form, shadcn Dialog, toast on submit)
- ComprehensiveMetrics with IntersectionObserver scroll animations
- PlatformNavigationHub 3-column grid
- ClaimProtocolsSection accordion
- HealthcareJourneyStory 6-stage alternating layout
- TreatmentValidationCards with modal checklists
- SurgicalProceduresSection 15-category grid
- OKLCH design tokens, Inter + Poppins fonts, healthcare brand colors
- SEO meta tags in index.html

### Modify
- Nothing (new project)

### Remove
- Nothing (new project)

## Implementation Plan
1. Select authorization Caffeine component for ICP identity support
2. Generate Motoko backend with: demo booking submissions, insights/blog posts, network join requests, contact inquiries
3. Build all frontend pages and components:
   - index.css with OKLCH design tokens
   - Navigation component (scroll-aware, mobile drawer)
   - Footer component
   - HealthGardenTree SVG hero
   - Home page assembling all sections
   - Ecosystem SVG diagram page
   - Hospitals page
   - CommandCentre page with SVG charts
   - PatientSupport page
   - Compliance page
   - DigitalHealth page
   - Insights page with tabs/filter
   - JoinNetwork registration form page
   - Chatbot floating component
   - DemoBookingDialog
   - All supporting section components
4. Wire routing with TanStack Router
5. Deploy
