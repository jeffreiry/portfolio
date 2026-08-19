---
title: "Hypera Pharma · HYPERGESTOR"
slug: hypera-hypergestor
role: "UX Designer · UI Designer"
summary: "A trade fund management tool that replaces spreadsheets with a traceable, multi-stage approval pipeline."
thesis: "No step in the fund process was missing — what was missing was a connected cycle between them."
company: "Hypera Pharma (via ilegra)"
year: 2023
cover: /cases/hypera-hypergestor/visao-geral.jpg
bgImage: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?fm=jpg&w=800&q=80&auto=format&fit=crop"
accent: "#f3e5f5"
tags: ["Enterprise", "Design System"]
featured: false
draft: false
order: 6
---

## From budget to proof: how I turned Hypera Pharma's trade marketing fund cycle into a traceable pipeline

**TL;DR** — UX and UI Designer, 2 months. Creation of HYPERGESTOR, an internal budget and trade fund management system for Hypera Pharma's trade marketing actions — centralizing into a single pipeline the flow that previously ran across spreadsheets, emails, and manual SAP/SEV integration.

**Tags:** Enterprise · Trade marketing · Finops · System design · B2B · Figma

---

## Context & Problem

Hypera Pharma manages trade marketing investments at scale — funds that start from corporate budgets, are distributed through the sales hierarchy (region → office → team → supervisor → sales rep), and must be verified with evidence before integrating into SAP. Without a centralized system, every step of this cycle happened in isolation: budget creation was manual, fund distribution depended on emails between departments, and investment verification was done outside the system, with no traceability.

I came in as UX and UI Designer responsible for the complete HYPERGESTOR design — mapping the journeys of each user profile involved in the cycle, defining the information architecture, designing all interfaces and prototypes in Figma, and collaborating with the development team on Azure over 2 months. The design had to respect Hypera Pharma's brand guidelines.

Three constraints shaped the work: the cascading fund hierarchy (primary budgets → secondary budgets → multiple levels of sales hierarchy) had to be represented without creating confusion; the SAP/SEV integration required an explicit gate before releasing data to SAP, to avoid errors with real financial impact; and a 2-month timeline covered mapping, designing, and prototyping a multi-module, multi-profile system.

**Prior state:** a trade marketing cycle with no end-to-end visibility — governance existed on paper, but not in the system.

<div class="image-placeholder">
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>
  <strong>Unified pipeline</strong>
  <span>Budget → Fund → Distribution → Verification with evidence and SAP/SEV gate</span>
</div>

---

## Discovery & Insight

Journey mapping revealed that the problem wasn't any single step in isolation — it was the **absence of a connected cycle**. Budgets were created in one place, funds allocated in another, distributions communicated by email, and verification done with loose evidence files unlinked to the original planning. The result: no one had complete visibility into how a trade marketing investment had been planned, distributed, and executed.

**The turning point:** HYPERGESTOR didn't need to be a collection of forms. It needed to be a **pipeline** — each step feeding the next, with traceability from budget all the way to evidence-backed verification.

---

## Process & Decisions

The decision that weighed on me most was the SAP release checkpoint. The product would be faster and less friction-heavy without that confirmation gate. And the more friction you add, the higher the adoption resistance risk. The question was: what level of deliberation is design, and what level is obstacle?

**1. Modal vs. dedicated page for creation — problem:** the creation flows (budget, fund, distribution) had many fields and sub-objects; navigating to a new page would lose list context. **Options:** navigate to a dedicated page (more space, loses context) vs. modal overlay on the listing (maintains context, requires internal scroll). **Choice:** persistent modal over the listing for all creation and editing operations. **Why:** users frequently need to reference other funds in the list while creating a new one — the modal allows this without additional navigation.

**2. Distribution hierarchy inside the same modal — problem:** a budget can have multiple sub-budgets, each with its own sales hierarchy. Presenting this in separate steps would fragment the flow. **Options:** multi-step wizard (one screen per level) vs. inline accordion within the same modal. **Choice:** expandable accordion inside the creation modal — each distribution can be expanded to show its complete hierarchy (Region → Office → Team → Supervisor), with "Edit" and "Copy Distribution" actions without leaving the context. **Why:** users need to see and compare distributions simultaneously; the accordion keeps everything accessible without forcing navigation between screens.

**3. Suggested Distribution with "Copy"** — the distribution creation flow was long. Cascading hierarchy fields, values per level, responsible supervisor. When I sat with trade marketing managers, the first thing everyone said was some variation of the same phrase: "I just copy from last month and adjust."

That wasn't laziness — it was the real work pattern. I added a "Suggested Distribution" section in the modal showing the last relevant distribution and a "Copy Distribution" button that pre-filled the entire form. The common-case creation flow was cut in half. The exceptional case stayed exactly as it was.

**4. SAP/SEV integration checkpoint — problem:** fund verification feeds directly into SAP; incorrect or incomplete data at this step has real financial impact. **Options:** automatic integration on save (faster, less control) vs. explicit gate with manual confirmation before release. **Choice:** field "Can it be released for integration approval?" defaulting to "No" — the user must consciously mark "Yes" to release the fund to SAP. Field "Will there be more verification?" allows indicating incomplete auditing without blocking partial save. **Why:** in systems with financial integration, a release error can create inconsistency between the internal system and the ERP — the confirmation gate creates a deliberate review moment before the point of no return.

Design pipeline: benchmarking + per-profile journey mapping → information architecture → Figma wireframes → internal validations → final interfaces → navigable prototype → development handoff (Azure). The per-profile journey mapping was the step that defined which modules existed and how they connected — without it, the risk was building disconnected screens instead of a pipeline.

<div class="image-placeholder">
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>
  <strong>Distribution modal</strong>
  <span>Accordion with sales hierarchy + "Suggested Distribution" + SAP release gate</span>
</div>

---

## Solution & Craft

HYPERGESTOR centralizes the complete trade marketing cycle in four connected modules:

- **Budget Registration** — creation of primary and secondary budgets with organizational hierarchy, validity dates, and redistribution flag. Configurable sub-distributions by sales hierarchy.
- **Fund Registration** — fund allocation from existing budgets, with distribution by sales rep, fund classification, and optional product hierarchy.
- **Fund Distribution** — distribution refinement by sales hierarchy level (Region → Office → Team → Supervisor), with automatic suggestion and copy action.
- **Verification and Audit** — recording the audited value, evidence upload (xlsx, txt, pdf, jpeg), partial verification control, and SAP/SEV integration release gate.

- The **breadcrumb** at the top of each screen orients the user within the system hierarchy without relying on memory of where they are.
- The **paperclip icon with numeric badge** in the Attachments column communicates evidence presence without opening the item — a scan-speed decision.
- The **"Audited value" field** is separate from the "Planned value" shown in read-only mode — the user sees the planned amount while filling in the audited amount, creating the comparison in the same context.
- The **"Allows distribution" field** is an inline checkbox next to the value — visually connecting the permission to the value it applies to.
- The **numeric badge** on the paperclip icon communicates evidence presence via two channels — icon + number — without relying on color; screen-reader and color-vision-limited users receive the same information (WCAG 1.4.1).

---

## Learnings

I delivered the complete system with all four modules and interfaces for each profile. But the project ended before I could measure anything post-launch — verification cycle time, SAP integration errors, user satisfaction.

What I'd have done: a usability test session on the distribution flow before handoff. The nested accordions and cascading sales hierarchy are the densest part of the system. I validated the model through journey mapping and benchmarking — but I never sat with a real manager to watch them create a distribution for the first time without help. In financial systems, that's the moment that matters.

Internal financial systems have a specific trade-off between speed and control: making everything too fast removes the safeguards the process requires; making everything too deliberate creates adoption resistance. The SAP release gate is the clearest example of this trade-off in the project — and the decision to keep it as explicit confirmation (not automatic) was the right one.

What I keep thinking about: will the person using this system every day experience that gate as protection, or as bureaucracy? I don't know — and that's not something a usability test surfaces cleanly. I'd want session recordings four months into production, to see how long people actually pause at that field before clicking Yes.
