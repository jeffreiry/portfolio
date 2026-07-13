---
title: "Shipping Capacity Optimization Platform"
slug: shipping-capacity-platform
role: "Product Designer, product team, 6 months"
summary: "Replaced scattered spreadsheets with a visual timeline for maritime cargo capacity optimization."
company: "Enterprise (confidential)"
year: 2025
cover: /cases/shipping-capacity-platform/visao-geral.png
bgImage: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?fm=jpg&w=800&q=80&auto=format&fit=crop"
accent: "#e1f5fe"
tags: ["Enterprise", "Data & Analytics"]
metrics:
  - label: "Scope"
    value: "Full MVP end-to-end"
  - label: "Timeline"
    value: "6 months"
featured: true
draft: false
order: 3
---

## The ship leaves half-empty: how a visual timeline turned operational data into commercial opportunities

**TL;DR** — Product Designer on a product team, 6 months. MVP of a cargo capacity optimization platform for maritime logistics operations — replacing scattered spreadsheets and email threads with a centralized environment for route monitoring, allocation simulation, and commercial opportunity management.

**Tags:** Enterprise · Maritime logistics · DataViz · Operational simulation · Figma · Mural

---

## Context & Problem

In maritime logistics, ships frequently depart with available cargo space that could be commercialized. The problem isn't a lack of opportunity — it's a lack of visibility into it. Route information, space availability, and operational constraints were distributed across spreadsheets, email threads, and internal documents with no unified surface. To assess whether a vessel had available space within a given time window, an operator had to manually cross-reference multiple sources, relying on individual experience and informal coordination across different teams.

**Prior state:** commercial opportunities existed within the operation, but were invisible without manual analysis — and the process for managing partner requests ran through email, with no structured traceability.


---

## My role

Product Designer responsible for the MVP design end-to-end: I led the discovery activities (workflow reviews with logistics specialists, a collaborative workshop with logistics specialists and operational stakeholders using user journey mapping to define the solution approach, and recurring validation sessions), synthesized operational patterns in Mural, and developed all platform design in Figma. I worked in collaboration with the product and engineering team over 6 months, from discovery to handoff.

---

## Constraints

- **High-complexity domain** — maritime logistics has specific operational constraints (port windows, transit time, cargo compatibility, regulations). Design decisions had to be continuously validated with domain specialists, not just users.
- **MVP for a dual audience** — the platform would be presented to both internal logistics teams and selected external commercial partners. Interface clarity wasn't just a UX goal — it was a business requirement.
- **Fixed 6-month scope** — a system covering monitoring + simulation + request management had to be scoped without compromising the coherence of the overall experience.

---

## Discovery & Insight

The logistics specialists knew where the opportunities were — but that knowledge lived in individual operators' heads, distributed and non-transferable. The bottleneck wasn't analytical; it was about surface area: without a consolidated, scannable view of vessel capacity over time, every opportunity assessment required manual work that few could perform at speed.

**The turning point:** cargo opportunities weren't hidden in the data — they were invisible because there was no timeline to surface them. When you can *see* available space on a route instead of calculating it in a spreadsheet, opportunity identification stops being analysis and becomes visual reading. The entire platform design was built from that premise.

---

## Process & Decisions

Of all the decisions in this project, the one I was least certain about was the simulation module — the real question was whether operators would actually use that layer or just stick to monitoring, where the learning curve was lower.

**1. Temporal representation of routes — problem:** tables and lists force the operator to mentally reconstruct the sequence of events over time. Assessing availability in a table is a cognitive operation; on a timeline, it's a visual scan. **Options:** filtered route list (familiar, no learning curve) vs. visual timeline per vessel and period (more complex to build, far faster to interpret). **Choice:** visual timeline representing port-to-port movements, available capacity windows, and operational constraints. **Why:** the platform's core value was turning analysis into perception — and that's only possible with a temporal representation.

**2. Simulation module** — there was a real tension here. Making the platform monitoring-only was the safer path: lower learning curve, easier adoption. But the problem operators described wasn't just visibility — it was uncertainty before acting. Before confirming a new allocation, they wanted to know: "if I accept this request, what changes across the rest of the route?" That question has no answer in a read-only platform.

Building integrated simulation was the longer path. But it was the only one that made judgment faster rather than just more visible. I went with simulation — the user tests the hypothetical before committing, and the delta between current state and simulated scenario stays visible side-by-side.

**3. Partner request workflow — problem:** cargo space requests arrived by email, unstructured, with no centralized history and no visibility into the status of each negotiation. **Options:** email integration (lower behavior change, doesn't solve traceability) vs. structured workflow inside the platform with explicit stages (bigger change, solves the problem at the root). **Choice:** a centralized workflow with reception, evaluation, approval, and tracking stages, replacing email as the primary management channel. **Why:** the problem wasn't request volume — it was the invisibility of each request's status. A structured channel makes the commercial pipeline manageable without depending on individual memory.

**4. Opportunity view — problem:** the full timeline shows everything — including vessels already at capacity. To identify commercial opportunities quickly, operators don't want to analyze the whole picture; they want to see only what has space. **Options:** filters on the main timeline (flexible, but requires interaction) vs. a dedicated "available capacity" view (less flexible, more immediate for the primary use case). **Choice:** a dedicated opportunity view aggregating available-capacity windows by route and vessel, separate from general monitoring. **Why:** the opportunity identification flow is different from the operational monitoring flow — merging them into a single panel sacrifices the speed of both.

![](/cases/shipping-capacity-platform/01-route-calendar.png)

---

## Solution

A unified platform for logistics teams to monitor operations and evaluate new cargo opportunities. Users can:

- **Visualize routes and schedules** via vessel-and-port timeline, with operational constraints represented visually.
- **Identify available capacity** in dedicated views that surface opportunity windows without requiring manual analysis.
- **Simulate cargo allocations** before committing, assessing the impact on capacity and scheduling.
- **Track partner requests** through a structured workflow with explicit negotiation and approval stages.
- **Evaluate operational impact** before confirming any commercial opportunity.

![](/cases/shipping-capacity-platform/02-route-opportunities.png)

---

## Craft & Accessibility

- The **timeline** uses color differentiation and density to communicate capacity utilization at a glance — high utilization vs. available window are distinguishable without reading a number.
- The **simulation module** keeps the current state and simulated scenario in side-by-side comparison, so the operator sees the delta, not just the final result.
- The **request workflow** structures each solicitation with a step history and action owner — the operator knows what is pending *from them*, not just the general status.
- The **timeline** differentiates capacity utilization by color and by visual density — two simultaneous channels ensure status is readable for users with color-vision limitations, without depending on color alone (WCAG 1.4.1).
- **Keyboard navigation** — route browsing, the simulation module, and the partner request workflow are all fully operable via keyboard, ensuring operators using alternative input devices can access all platform functions.
- An **accessibility guideline** covering contrast thresholds, keyboard interaction patterns, and semantic structure was defined as part of the design specification and delivered alongside the Figma handoff.

![](/cases/shipping-capacity-platform/03-route-simulation.png)

---

## Technical collaboration

Discovery and design pipeline: `workflow reviews with logistics specialists → recurring validation sessions with stakeholders → synthesis in Mural → Figma wireframes → navigable prototype → engineering validation → MVP handoff`. The recurring validation sessions were structural: maritime logistics has operational constraints that don't emerge from single interviews — multiple refinement cycles with specialists were needed to ensure the timeline and simulation module represented real operational logic correctly.

Microsoft Copilot was used during the solution hypothesis phase — particularly to stress-test the simulation module interaction model before committing to the full design direction.

---

## What I'd Do Differently

The MVP was made available to internal logistics teams and selected external stakeholders, with positive feedback about consolidating operational information in one place. But there's one thing I couldn't measure: whether the simulation module was actually adopted, or whether operators relied on monitoring and the opportunity view and left the simulation largely untouched.

Simulation is the most expensive part of the design and the hardest to validate before launch. If I were doing it again, I would have defined a specific adoption metric for simulation during the discovery phase — not to justify the feature, but to understand whether the hypothesis that "making the experiment safe changes decision behavior" actually held up in practice.

---

## Learnings

Operational tools for complex domains carry a double challenge: the designer needs to understand enough of the domain to avoid simplifying what cannot be simplified — and needs to simplify enough for the system to be usable without extensive training. Recurring validation with specialists wasn't a methodological formality; it was what ensured the timeline and simulation reflected real constraints, not approximations.

What I take from this: the opportunity was in the data the whole time. It just needed a surface. Sometimes a designer's work is less about inventing and more about making what already exists visible.
