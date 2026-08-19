---
title: "Shipping Capacity Optimization Platform"
slug: shipping-capacity-platform
role: "Product Designer, product team, 6 months"
summary: "A visual platform that surfaces idle cargo capacity opportunities previously buried in spreadsheets."
thesis: "The commercial opportunity wasn't hidden in the data — it was invisible for lack of a timeline."
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
draft: true
protected: true
order: 3
---

## The ship leaves half-empty: how a visual timeline turned operational data into commercial opportunities

**TL;DR** — Product Designer on a product team, 6 months. MVP of a cargo capacity optimization platform for maritime logistics operations — replacing scattered spreadsheets and email threads with a centralized environment for route monitoring, allocation simulation, and commercial opportunity management.

**Tags:** Enterprise · Maritime logistics · DataViz · Operational simulation · Figma · Mural

---

## Context & Problem

In maritime logistics, ships frequently depart with available cargo space that could be commercialized. The problem isn't a lack of opportunity — it's a lack of visibility into it. Route information, space availability, and operational constraints were distributed across spreadsheets, email threads, and internal documents with no unified surface. To assess whether a vessel had available space within a given time window, an operator had to manually cross-reference multiple sources, relying on individual experience and informal coordination across different teams.

I came in as the Product Designer responsible for the MVP design end-to-end — leading discovery (workflow reviews with logistics specialists, a collaborative workshop using user journey mapping to define the solution approach, and recurring validation sessions), synthesizing operational patterns in Mural, and developing all platform design in Figma over 6 months from discovery to handoff.

Three constraints defined the design space: maritime logistics has specific operational constraints (port windows, transit time, cargo compatibility, regulations), so decisions had to be continuously validated with domain specialists, not just users; the platform had a dual audience — internal logistics teams and selected external commercial partners — where interface clarity wasn't just a UX goal but a business requirement; and a fixed 6-month scope meant covering monitoring + simulation + request management without compromising the coherence of the overall experience.

**Prior state:** commercial opportunities existed within the operation, but were invisible without manual analysis — and the process for managing partner requests ran through email, with no structured traceability.

---

## Discovery & Insight

The logistics specialists knew where the opportunities were — but that knowledge lived in individual operators' heads, distributed and non-transferable. The bottleneck wasn't analytical; it was about surface area: without a consolidated, scannable view of vessel capacity over time, every opportunity assessment required manual work that few could perform at speed.

**The turning point:** cargo opportunities weren't hidden in the data — they were invisible because there was no timeline to surface them. When you can *see* available space on a route instead of calculating it in a spreadsheet, opportunity identification stops being analysis and becomes visual reading. The entire platform design was built from that premise.

---

## Process & Decisions

Of all the decisions in this project, the one I was least certain about was the simulation module — the real question was whether operators would actually use that layer or just stick to monitoring, where the learning curve was lower.

**1. Temporal representation of routes — problem:** tables and lists force the operator to mentally reconstruct the sequence of events over time. Assessing availability in a table is a cognitive operation; on a timeline, it's a visual scan. **Options:** filtered route list (familiar, no learning curve) vs. visual timeline per vessel and period (more complex to build, far faster to interpret). **Choice:** visual timeline representing port-to-port movements, available capacity windows, and operational constraints. **Why:** the platform's core value was turning analysis into perception — and that's only possible with a temporal representation.

![Route availability timeline (Calendário tab) — vessels color-coded by ship plotted across ports and dates May to June, solid lines for active routes and dashed for standby](/cases/shipping-capacity-platform/01-route-calendar.png)

**2. Simulation module** — there was a real tension here. Making the platform monitoring-only was the safer path: lower learning curve, easier adoption. But the problem operators described wasn't just visibility — it was uncertainty before acting. Before confirming a new allocation, they wanted to know: "if I accept this request, what changes across the rest of the route?" That question has no answer in a read-only platform.

Building integrated simulation was the longer path. But it was the only one that made judgment faster rather than just more visible. I went with simulation — the user tests the hypothetical before committing, and the delta between current state and simulated scenario stays visible side-by-side.

**3. Partner request workflow — problem:** cargo space requests arrived by email, unstructured, with no centralized history and no visibility into the status of each negotiation. **Options:** email integration (lower behavior change, doesn't solve traceability) vs. structured workflow inside the platform with explicit stages (bigger change, solves the problem at the root). **Choice:** a centralized workflow with reception, evaluation, approval, and tracking stages, replacing email as the primary management channel. **Why:** the problem wasn't request volume — it was the invisibility of each request's status. A structured channel makes the commercial pipeline manageable without depending on individual memory.

**4. Opportunity view — problem:** the full timeline shows everything — including vessels already at capacity. To identify commercial opportunities quickly, operators don't want to analyze the whole picture; they want to see only what has space. **Options:** filters on the main timeline (flexible, but requires interaction) vs. a dedicated "available capacity" view (less flexible, more immediate for the primary use case). **Choice:** a dedicated opportunity view aggregating available-capacity windows by route and vessel, separate from general monitoring. **Why:** the opportunity identification flow is different from the operational monitoring flow — merging them into a single panel sacrifices the speed of both.

The discovery-to-handoff pipeline ran through workflow reviews with logistics specialists → recurring validation sessions with stakeholders → Mural synthesis → Figma wireframes → navigable prototype → engineering validation → MVP handoff. The recurring validation sessions were structural: maritime logistics has operational constraints that don't emerge from single interviews — multiple refinement cycles with specialists were needed to ensure the timeline and simulation module represented real operational logic correctly. Microsoft Copilot was used during the hypothesis phase to stress-test the simulation module interaction model before committing to the full design direction.

---

## Solution & Craft

A unified platform for logistics teams to monitor operations and evaluate new cargo opportunities. Users can visualize routes and schedules via vessel-and-port timeline, identify available capacity in dedicated views, simulate cargo allocations before committing, track partner requests through a structured workflow, and evaluate operational impact before confirming any commercial opportunity.

- The **timeline** uses color differentiation and density to communicate capacity utilization at a glance — high utilization vs. available window are distinguishable without reading a number.

![Opportunity view (Movimentações tab) — card grid of vessels with available cargo space showing vessel name, cargo type, route origin/destination, occupancy (25%), and "Realizar Simulação" CTA](/cases/shipping-capacity-platform/02-route-opportunities.png)

- The **simulation module** keeps the current state and simulated scenario in side-by-side comparison, so the operator sees the delta, not just the final result.

![Simulation module — filter panel on the left (vessel type, ports, date range, cargo quantity and product) and card grid of routes with simulated impact (new occupancy +50%, schedule +2 days), one card expanded with before/after route comparison](/cases/shipping-capacity-platform/03-route-simulation.png)

- The **request workflow** structures each solicitation with a step history and action owner — the operator knows what is pending *from them*, not just the general status.
- The **timeline** differentiates capacity utilization by color and by visual density — two simultaneous channels ensure status is readable for users with color-vision limitations, without depending on color alone (WCAG 1.4.1).
- **Keyboard navigation** — route browsing, the simulation module, and the partner request workflow are all fully operable via keyboard, ensuring operators using alternative input devices can access all platform functions.
- An **accessibility guideline** covering contrast thresholds, keyboard interaction patterns, and semantic structure was defined as part of the design specification and delivered alongside the Figma handoff.

---

## Learnings

The MVP was made available to internal logistics teams and selected external stakeholders, with positive feedback about consolidating operational information in one place. But there's one thing I couldn't measure: whether the simulation module was actually adopted, or whether operators relied on monitoring and the opportunity view and left the simulation largely untouched.

Simulation is the most expensive part of the design and the hardest to validate before launch. If I were doing it again, I would have defined a specific adoption metric for simulation during the discovery phase — not to justify the feature, but to understand whether the hypothesis that "making the experiment safe changes decision behavior" actually held up in practice.

Operational tools for complex domains carry a double challenge: the designer needs to understand enough of the domain to avoid simplifying what cannot be simplified — and needs to simplify enough for the system to be usable without extensive training. Recurring validation with specialists wasn't a methodological formality; it was what ensured the timeline and simulation reflected real constraints, not approximations.

What I take from this: the opportunity was in the data the whole time. The maritime operations team already knew the cargo patterns — the timeline just made what they knew into something another person could see in the same room.
