---
title: "Power Apps · Design System Demo App"
slug: power-apps-dummy-app
role: "UX Designer · Design Systems, 2025"
summary: "A mobile reference app that demonstrates the company's Design System in a real working product."
company: "Large industrial company (confidential)"
year: 2025
bgImage: "https://images.unsplash.com/photo-1570101945621-945409a6370f?fm=jpg&w=800&q=80&auto=format&fit=crop"
accent: "#e8f0fe"
tags: ["Enterprise", "Design System", "Mobile"]
metrics:
  - label: "Platform"
    value: "Power Apps"
  - label: "Scope"
    value: "10+ components"
  - label: "Reach"
    value: "Org-wide"
featured: false
draft: false
order: 5
---

## From component library to working product: making the Design System real in Power Apps

**TL;DR** — UX Designer on the Design Chapter, 2025. Designed and built a functional reference app inside Microsoft Power Apps to showcase mobile components from the company's Design System. The app became a published template, adopted org-wide and used as the foundation for at least one production product.

---

## Context & Problem

A company's Design Chapter had built a library of components for mobile apps created in Microsoft Power Apps — the platform used across the organization for internal low-code tools. The problem: the components existed in isolation. Designers and developers had no practical reference for how they behaved together, how they composed into real flows, or how they should be applied in a full product context.

The result was **inconsistent adoption**: teams either didn't know the components existed, reinvented patterns independently, or misapplied them due to lack of context.

**Prior state:** a component library with no living reference — well-intentioned but disconnected from real implementation.

---

## Process & Decisions

The first step was understanding which components were being actively used in Power Apps products across the organization — reviewing existing apps, identifying recurring UI patterns, and prioritizing components with the highest reuse potential. The goal wasn't to document everything; it was to find the **20% of components that covered 80% of real product scenarios**.

The decision that worried me most was the scope. A demo app that covers too much stops being a reference and becomes overhead. But if it's too simple, it doesn't answer developers' real questions. The balance was found by anchoring every design decision in a real product scenario — if an interaction couldn't be justified by a realistic use case, it was cut.

With a component inventory in hand, the next question was: what kind of app would give these components the most meaningful context? The answer was a **standard enterprise mobile product** — the kind the organization builds most often. The Dummy App was scoped to cover the full lifecycle of a typical data-management workflow: Onboarding → Home (dashboard entry point) → Listing & Detail views → Create & Edit flows → Modals → Supplementary pages (FAQ, about).

Before building, each component was reviewed and updated to meet the Design System guidelines — covering visual tokens (color, typography, spacing), interaction states, and accessibility considerations.

The app was built directly in the Power Apps environment, not as a Figma prototype. This was deliberate: the reference had to work within the constraints and capabilities of the actual platform. Designing in Power Apps is fundamentally different from designing in Figma — component behavior is formula-driven, state management is explicit, and the design-to-build boundary blurs. This created a learning curve, but it also produced better outcomes: every interaction in the Dummy App is something a real Power Apps developer can actually replicate.

Throughout development, the app was continuously validated with the Low-code Platforms team — the internal group responsible for the Power Apps ecosystem — to ensure that complex interactions (state management, formula-driven behavior) were technically sound and replicable by other teams.

After validation, the Dummy App was documented with supporting materials in the organization's Center of Excellence SharePoint and published as a **template in the Brand Center**, making it accessible for any team to copy and build on.

![Actions and modal screens from the Power Apps Dummy App](/cases/power-apps-dummy-app/02-actions.png)

---

## Outcome

The Dummy App was published org-wide as a template, accessible to all employees working in Power Apps. It served as a **direct reference for at least one production product**: an app built for an industry trade fair, which used the Dummy App as its design and component foundation.

Beyond the specific deliverable, the project established a pattern for how the Design Chapter could support low-code development — not just by building components, but by demonstrating them in complete, functional product contexts.

| | |
|---|---|
| Components showcased | 10+ |
| Published as org-wide template | ✅ |
| Production apps built on top | ≥ 1 |
| Cross-functional collaborators | Design Chapter + Low-code Platforms |

![CSAT screen — satisfaction collection inside the demo app](/cases/power-apps-dummy-app/03-csat.png)

![FAQ screen — support content integrated into the app](/cases/power-apps-dummy-app/03-faq.png)

---

## Learnings

Knowing that another team used the Dummy App as the foundation for a production product was when the project made real sense. What validated it wasn't the component count or the template documentation — it was that someone copied the whole thing and shipped a real product out of it. That's the test a design system reference either passes or fails.

What I'd do differently: I would have tracked which components were copied most frequently. That information would have fed the library's evolution roadmap better than any planning meeting.
