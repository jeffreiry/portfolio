---
title: "Enterprise AI Knowledge Assistant"
slug: enterprise-ai-assistant
role: "Product Designer, product team, 6 months"
summary: "A corporate knowledge platform that answers in natural language and shows the source behind every response."
company: "Enterprise (confidential)"
year: 2025
cover: /cases/enterprise-ai-assistant/visao-geral.png
bgImage: "https://images.unsplash.com/photo-1762330465857-07e4c81c0dfa?fm=jpg&w=800&q=80&auto=format&fit=crop"
accent: "#efedff"
tags: ["Enterprise", "AI & Automation", "UX Research"]
metrics:
  - label: "Users impacted"
    value: "~8.000"
  - label: "Scope"
    value: "MVP → full platform"
  - label: "Timeline"
    value: "6 months"
featured: true
draft: false
order: 4
---

## Ten repositories, one conversation: how source traceability became the product

**TL;DR** — Product Designer on a product team, 6 months. Scaled an AI assistant MVP into a full internal knowledge platform for a large organization. The core challenge wasn't the quality of the answers — it was that users wouldn't act on them without knowing where they came from.

---

## Context & Problem

Large organizations accumulate extensive technical and regulatory documentation distributed across multiple systems — intranets, file repositories, area-specific knowledge bases. An employee who needs information faces a **location problem before a content problem**: they don't know where to look, search in multiple places, find outdated versions, or give up. An AI assistant MVP had been launched to address this, but real usage revealed a second layer: even when the answer was correct, users would leave the interface to confirm it elsewhere before acting.

**Prior state:** accurate corporate knowledge, but inaccessible — and an MVP that answered correctly but wasn't trusted.

---

## My Role

Product Designer responsible for the scale-up: I led the discovery activities (interviews with MVP users + behavioral analysis via Clarity + usability testing with task-completion metrics), synthesized opportunities in Mural, defined the feature set for the scaled version, and developed all design in Figma. I worked in collaboration with the product and engineering team over 6 months, from discovery to handoff.

---

## Constraints

- **Existing product with an active user base** — design decisions had to evolve the MVP without breaking flows that were already working.
- **A wrong AI answer has real cost here** — an incorrect decision, a compliance violation. Users needed to see where an answer came from before they'd act on it. That was the design problem, not the model.
- **Fixed 6-month scope** — prioritizing between what would be scaled now and what would wait for future iterations.

---

## Discovery & Insight

The Clarity recordings were the turning point. We could see exactly where people stopped: they'd read the answer, then open another tab. Every time. Not because the answer was wrong. Because they didn't know where it came from.

That was the second problem, and it was the deeper one. The first was the search interface itself — it asked users to *navigate* documentation when what they wanted was to *ask*. Search is a task people do only when they have no alternative.

**The turning point:** the product didn't need better search. It needed to eliminate the need to search — and make the source of each answer as visible as the answer itself.

![](/cases/enterprise-ai-assistant/02-user-research.png)

---

## Process & Decisions

Of all the decisions in this project, the one I was least certain about was the source panel — the real question was whether users would actually open it, or whether it would become a trust ornament without changing real behavior.

**1. Interface paradigm — problem:** improving the existing search (more precise filters, better ranking) was the lower-risk path. **Options:** optimize search (less effort, incremental impact) vs. replace search with a conversational interface (bigger change, potential to eliminate friction at the root). **Choice:** conversational interface inspired by modern LLMs, with natural language input and suggested prompts as the entry point for new users. **Why:** optimizing search solves a problem the user doesn't want to have — they want the answer, not a better search engine.

**2. Source visibility** — answers without origin weren't acted upon. Users opened another system to confirm before proceeding, eliminating the assistant's productivity gain.

This wasn't a UX preference. It was the condition for the answer to be used at all. A response without a visible source wasn't incomplete — it was unusable.

Three options: hide sources entirely (cleaner interface, less trust); inline citations within the response text (keeps connection to the claim, but fragments reading); or a persistent side panel accessible from each response. I went with the panel. It keeps reading fluid and verification available — without forcing it on users who already trust the response, and without hiding it from those who don't yet.

**3. Reducing the barrier to entry — problem:** new users didn't know what to ask an assistant integrating technical, regulatory, and operational knowledge bases simultaneously. **Options:** text-based onboarding (tutorial, tooltips) vs. contextual suggested prompts on the start screen (immediate action, no prior reading required). **Choice:** suggested prompts derived from the actual search patterns identified in Clarity sessions — not generic, but calibrated to the organization's most frequent questions. **Why:** users learn what the assistant can do by seeing a concrete example, not by reading a description.

**4. Integration model — problem:** corporate knowledge didn't live in a single base — separate systems, each with authority over distinct areas. **Options:** assistant responding from a consolidated base (simpler, less faithful to origin) vs. distributed query with per-source citation for each excerpt (more complex, traceability preserved). **Choice:** distributed integration with source citation per excerpt. **Why:** the user needs to know whether an answer comes from the IT policy or the compliance manual. Hiding that plurality in a consolidated base would have killed trust at the root.

![](/cases/enterprise-ai-assistant/03-main-interface.png)

---

## Solution

A centralized platform for accessing corporate knowledge. Users open a single interface and can:

- **Ask in natural language** — without needing to know which system holds the information.
- **Receive structured answers** generated from actual internal documents.
- **Verify the sources** — a side panel shows which documents grounded each answer and allows direct access to them.
- **Explore related documents** — additional context without leaving the interface.
- **Resume previous conversations** — chat history for continuity between sessions.

---

## Craft & Accessibility

- The **empty initial state** shows suggested prompts as clickable chips — people don't know where to start with an assistant covering three knowledge bases at once. The prompts show them, without requiring any reading first.
- The **source panel** is a persistent lateral column, not a modal: it stays available without interrupting the reading of the response. A badge with the source count on each message signals traceability before the panel is even opened.
- The **response structure** visually separates the AI synthesis from access to sources — clear hierarchy between "what the assistant concluded" and "where that comes from."
- The **source panel** as a persistent sidebar requires no extra interaction to open or stay open — all flows, including source access and conversation history, are fully operable via keyboard. Tab order follows reading and interaction sequence (WCAG 2.1.1).
- **Color blindness** — trust indicators and source badges use icon + label combinations, not color alone. Meaning is accessible to users with color-vision limitations across the entire interface.
- The **semantic structure** (heading hierarchy, ARIA roles, landmark regions) was specified as part of the design — not a QA pass. An accessibility guideline for the platform was established collaboratively with engineering and delivered alongside the Figma handoff.

![](/cases/enterprise-ai-assistant/01-file-source.png)

---

## Technical Collaboration

Discovery and design pipeline: `Clarity recordings + heatmaps → interviews with MVP users → synthesis in Mural → prioritized opportunities → Figma wireframes → navigable prototype → engineering validation → handoff`. The recordings were decisive: they showed the exact drop-off points in the MVP — where users stopped, left to confirm, or repeated the same search differently.

Six months to design and ship a company-wide platform — without being able to validate every assumption with real users before launch — is tight. We inferred a lot from the MVP behavior data and from benchmarking similar enterprise AI products. Most of it held up.

Microsoft Copilot was used during the solution hypothesis phase to validate structural alternatives and stress-test design rationale before committing to the full direction — particularly when evaluating the source panel model and integration architecture.

---

## What I'd Do Differently

The platform launched and the feedback was positive. But there's one thing I'd want to go back and measure: whether the source panel actually changed user behavior, or just made people feel better about behavior they were already doing. There's a difference between a feature that builds trust and one that signals it. I believe it's the former. I couldn't prove it.

---

## Learnings

This is a scale-up case, not a 0→1 — and that changes the type of judgment required. Some architectural decisions were already made by the MVP. The work was identifying what was wrong at the *experience layer*, not in the technology.

What I found: the assistant had the right answer, but the wrong experience. In enterprise AI, trust doesn't emerge from the model's accuracy. It's a design problem. Solved the same way every design problem is solved — by making the invisible visible.

That's the thing I'll carry from this project.
