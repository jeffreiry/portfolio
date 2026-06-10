---
title: "Enterprise AI Knowledge Assistant"
slug: enterprise-ai-assistant
role: "Product Designer, product team, 6 months"
summary: "Scaled an AI assistant MVP into an internal knowledge platform where source traceability became the product."
company: "Enterprise (confidential)"
year: 2025
bgImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?fm=jpg&w=1400&q=80&auto=format&fit=crop"
accent: "#efedff"
tags: ["Enterprise", "Conversational AI", "Information design", "Transparency"]
metrics:
  - label: "Scope"
    value: "MVP → full platform"
  - label: "Timeline"
    value: "6 months"
featured: true
draft: false
order: 1
---

## Ten repositories, one conversation: how source traceability became the product

**TL;DR** — Product Designer on a product team, 6 months. Scaled an AI assistant MVP into a full internal knowledge platform for a large organization. The core challenge wasn't the quality of the answers — it was that users wouldn't act on them without knowing where they came from.

---

## Context & Problem

Large organizations accumulate extensive technical and regulatory documentation distributed across multiple systems — intranets, file repositories, area-specific knowledge bases. An employee who needs information faces a **location problem before a content problem**: they don't know where to look, search in multiple places, find outdated versions, or give up. An AI assistant MVP had been launched to address this, but real usage revealed a second layer: even when the answer was correct, users would leave the interface to confirm it elsewhere before acting.

**Prior state:** accurate corporate knowledge, but inaccessible — and an MVP that answered questions but wasn't trusted.

<div class="image-placeholder">
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>
  <strong>Before / After</strong>
  <span>MVP search interface → conversational platform with source panel</span>
</div>

---

## My Role

Product Designer responsible for the scale-up: I led the discovery activities (interviews with MVP users + behavioral analysis via Clarity), synthesized opportunities in Mural, defined the feature set for the scaled version, and developed all design in Figma. I worked in collaboration with the product and engineering team over 6 months, from discovery to handoff.

---

## Constraints

- **Existing product with an active user base** — design decisions had to evolve the MVP without breaking flows that were already working.
- **Trust is non-negotiable in enterprise** — a wrong AI answer has real cost: incorrect decision, compliance risk. The experience had to make the source of information non-optional.
- **Fixed 6-month scope** — prioritizing between what would be scaled now and what would wait for future iterations.

---

## Discovery & Insight

Discovery revealed two linked problems, not one. The first: the MVP's search interface asked users to *navigate* documentation when what they wanted was to *ask* — search is an intermediate task people perform only because they have no alternative. The second: even when the AI answered correctly, users didn't act on the response because they didn't know where it came from. Without traceability, a right answer and a wrong answer look identical — and in a compliance context, that's enough to stall adoption.

**The turning point:** the product didn't need better search. It needed to eliminate the need to search — and it needed to make the source of each answer as visible as the answer itself.

<div class="image-placeholder">
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>
  <strong>Discovery synthesis</strong>
  <span>Clarity session recordings showing drop-off points in the MVP — where users left to confirm answers elsewhere</span>
</div>

---

## Process & Decisions

**1. Interface paradigm — problem:** improving the existing search (more precise filters, better ranking) was the lower-risk path. **Options:** optimize search (less effort, incremental impact) vs. replace search with a conversational interface (bigger change, potential to eliminate friction at the root). **Choice:** conversational interface inspired by modern LLMs, with natural language input and suggested prompts as the entry point for new users. **Why:** optimizing search solves a problem the user doesn't want to have — they want the answer, not a better search engine.

**2. Source visibility — problem:** answers without origin weren't acted upon. Users opened another system to confirm before proceeding, eliminating the assistant's productivity gain. **Options:** hide sources (cleaner interface, less trust) vs. inline citations within the text (fragmented, disrupts reading) vs. a dedicated panel always accessible (more information available, context preserved). **Choice:** a persistent lateral source panel, accessible directly from each response, showing the original documents and allowing exploration of related ones. **Why:** separating the answer from its traceability keeps reading fluid and keeps verification available for those who need it — without forcing it on those who already trust the response.

**3. Reducing the barrier to entry — problem:** new users didn't know what to ask an assistant integrating technical, regulatory, and operational knowledge bases simultaneously. **Options:** text-based onboarding (tutorial, tooltips) vs. contextual suggested prompts on the start screen (immediate action, no prior reading required). **Choice:** suggested prompts derived from the actual search patterns identified in Clarity sessions — not generic, but calibrated to the organization's most frequent questions. **Why:** users learn what the assistant can do by seeing a concrete example, not by reading a description.

**4. Integration model — problem:** corporate knowledge didn't live in a single base — separate systems, each with authority over distinct areas. **Options:** assistant responding from a consolidated base (simpler, less faithful to origin) vs. distributed query with per-source citation for each excerpt (more complex, traceability preserved). **Choice:** distributed integration with source citation per excerpt. **Why:** hiding the plurality of sources in a consolidated base would reduce trust — the user needs to know whether an answer comes from the IT policy or the compliance manual.

<div class="image-placeholder">
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>
  <strong>Main interface</strong>
  <span>Conversational interface with source panel — answer + traceability side by side</span>
</div>

---

## Solution

A centralized platform for accessing corporate knowledge. Users open a single interface and can:

- **Ask in natural language** — without needing to know which system holds the information.
- **Receive structured answers** generated from actual internal documents.
- **Verify the sources** — a side panel shows which documents grounded each answer and allows direct access to them.
- **Explore related documents** — additional context without leaving the interface.
- **Resume previous conversations** — chat history for continuity between sessions.

<div class="image-placeholder">
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>
  <strong>System overview</strong>
  <span>Empty state with suggested prompts → conversation → source panel → related documents</span>
</div>

---

## Craft & Accessibility

- The **empty initial state** displays suggested prompts as clickable chips — reduces blank-screen anxiety and demonstrates the assistant's scope instead of describing it.
- The **source panel** is a persistent lateral column, not a modal or tooltip: it stays available without interrupting the reading of the response. A badge with the source count on each message signals traceability before the panel is even opened.
- The **response structure** visually separates the AI synthesis from access to sources — clear hierarchy between "what the assistant concluded" and "where that comes from."

<div class="image-placeholder">
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>
  <strong>Craft detail</strong>
  <span>Empty state chips · source count badge · response / sources hierarchy</span>
</div>

---

## Technical Collaboration

Discovery and design pipeline: `Clarity recordings + heatmaps → interviews with MVP users → synthesis in Mural → prioritized opportunities → Figma wireframes → navigable prototype → engineering validation → handoff`. The Clarity recordings were decisive: they showed the exact drop-off points in the MVP — where users stopped, left to confirm, or repeated the same search differently.

---

## Impact

- **Launch:** the platform was launched as part of the organization's internal digital ecosystem.
- **Initial feedback:** collected via CSAT and in-product feedback mechanisms.

---

## Learnings

This is a scale-up case, not a 0→1 — and that changes the type of judgment required. Some architectural decisions were already made by the MVP; the work was identifying what was wrong at the *experience layer*, not in the technology. What I found: the assistant had the right answer, but the wrong experience. **Lesson:** in enterprise AI products, trust doesn't emerge from the model's accuracy — it's a design problem. Visible traceability isn't a UX detail; it's the condition for a correct answer to actually be used.
