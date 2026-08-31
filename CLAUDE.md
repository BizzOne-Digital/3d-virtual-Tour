# Project Instructions

## Frontend design-quality layer: `design-taste-frontend` (Taste Skill)

The Taste Skill is installed at `.agents/skills/design-taste-frontend/SKILL.md`
(symlinked into `.claude/skills/`). It is the **mandatory design-quality layer for all
frontend work in this project.**

### When to load it
Invoke the `design-taste-frontend` skill **before writing or editing any UI code** when the
request is any of:

- Build a website / create a page / create a landing page
- Redesign a page / polish an existing frontend / improve an existing UI
- Improve responsiveness, typography, spacing, layout, or visual hierarchy
- Add animations or micro-interactions
- Create components

Read `SKILL.md` first, state the one-line **Design Read** (Section 0.B), set the three
dials (Section 1), then implement. Do not announce "using Taste" as a substitute for
actually applying it — the principles must show up in the code.

### Non-negotiables from the skill
- Run the **Section 14 pre-flight check** before calling any frontend task complete.
- Obey **Section 9 (AI Tells / forbidden patterns)**: no AI-purple gradients, no centered
  hero over dark mesh, no three-equal-feature-cards, no glassmorphism-on-everything, no
  Inter + slate-900 default, no every-section-is-the-same-card.
- Obey **Section 6** performance and accessibility guardrails.
- Follow **Section 11 (Redesign Protocol)** — audit first — on any existing UI.

## Standing design standards

Produce: premium, modern, sophisticated interfaces; strong visual hierarchy; excellent
typography and font pairing; intentional spacing and composition; distinctive hero
sections; strong editorial layouts; sophisticated color systems; high-quality imagery;
purposeful animation; genuine responsiveness at every breakpoint; accessible, usable,
production-quality code.

Avoid: generic AI layouts, template-looking sites, repetitive card grids, excessive
rounded corners, random gradients, excessive shadows, weak type, weak spacing,
unnecessary animation, visual clutter, copy-paste-looking sections.

## Existing code

1. Inspect the project before changing it.
2. Understand and preserve the existing brand identity.
3. Preserve functionality and business logic.
4. Preserve existing content unless asked to change it.
5. Preserve existing colors, logos, imagery, and branding unless a redesign is requested.
6. Improve the existing design rather than rebuilding the app.
7. Reuse existing components.
8. Follow the existing architecture and conventions.

## New builds

Establish a coherent visual direction first — industry, audience, brand personality,
content, positioning, palette, typography, imagery, layout, motion — then implement.

## Stack

Next.js · React · TypeScript · Tailwind CSS · modern CSS · Lucide (or another appropriate
React icon library). Clean, maintainable, production-ready code.

## Responsive

Must work on mobile, tablet, laptop, desktop, and large screens. Adapt the layout per
breakpoint — never just shrink the desktop design.

## Animation

Tasteful motion on page entrances, scroll reveals, hover states, buttons, navigation,
images, section transitions, and micro-interactions. Premium and intentional, never
distracting. Always respect `prefers-reduced-motion`.

## Final design review (before finishing any frontend task)

1. Review the page visually. 2. Spacing and alignment. 3. Type hierarchy.
4. Responsive behavior. 5. Navigation and CTA clarity. 6. Animations.
7. Accessibility. 8. Cross-section consistency. 9. Remove unnecessary visual elements.
10. Run the skill's pre-flight/design checks. 11. Fix obvious issues before finishing.

The goal is not functional code. The goal is production-ready frontend code with
genuinely excellent visual design.
