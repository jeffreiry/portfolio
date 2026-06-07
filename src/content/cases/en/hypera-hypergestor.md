---
title: "Hypera Pharma · HYPERGESTOR"
slug: hypera-hypergestor
role: "UX Designer · UI Designer"
summary: "Creation of HYPERGESTOR, Hypera Pharma's internal trade marketing fund management system — centralizing into a traceable pipeline the flow that previously ran across spreadsheets, emails, and manual SAP/SEV integration."
company: "Hypera Pharma (via ilegra)"
year: 2024
cover: /cases/hypera-hypergestor/cover.webp
accent: "#f3e5f5"
tags: ["Enterprise", "Trade marketing", "Finops", "System design", "B2B"]
featured: false
draft: false
order: 7
---

## From budget to proof: how I turned Hypera Pharma's trade marketing fund cycle into a traceable pipeline

**TL;DR** — UX and UI Designer, 2 months. Creation of HYPERGESTOR, an internal budget and trade fund management system for Hypera Pharma's trade marketing actions — centralizing into a single pipeline the flow that previously ran across spreadsheets, emails, and manual SAP/SEV integration.

**Tags:** Enterprise · Trade marketing · Finops · System design · B2B · Figma

---

## Context & Problem

Hypera Pharma manages trade marketing investments at scale — funds that start from corporate budgets, are distributed through the sales hierarchy (region → office → team → supervisor → sales rep), and must be verified with evidence before integrating into SAP. Without a centralized system, every step of this cycle happened in isolation: budget creation was manual, fund distribution depended on emails between departments, and investment verification was done outside the system, with no traceability.

**Prior state:** a trade marketing cycle with no end-to-end visibility — governance existed on paper, but not in the system.

<div class="image-placeholder">
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>
  <strong>Unified pipeline</strong>
  <span>Budget → Fund → Distribution → Verification with evidence and SAP/SEV gate</span>
</div>

---

## My role

UX and UI Designer responsible for the complete HYPERGESTOR design: I mapped the journeys of each user profile involved in the cycle, defined the information architecture, designed all interfaces and prototypes in Figma, and collaborated with the development team on Azure. The design had to respect Hypera Pharma's brand guidelines.

---

## Constraints

- **Hierarchy complexity** — funds flow from primary to secondary budgets, then into distributions across multiple levels of the sales hierarchy. The design had to represent this cascade without creating confusion.
- **SAP/SEV integration** — fund verification required an explicit gate before releasing data to SAP, to avoid integration errors with real financial impact.
- **2 months** to map, design, and prototype a multi-module, multi-profile system.

---

## Discovery & Insight

Journey mapping revealed that the problem wasn't any single step in isolation — it was the **absence of a connected cycle**. Budgets were created in one place, funds allocated in another, distributions communicated by email, and verification done with loose evidence files unlinked to the original planning. The result: no one had complete visibility into how a trade marketing investment had been planned, distributed, and executed.

**The turning point:** HYPERGESTOR didn't need to be a collection of forms. It needed to be a **pipeline** — each step feeding the next, with traceability from budget all the way to evidence-backed verification.

---

## Process & Decisions

**1. Modal vs. dedicated page for creation — problem:** the creation flows (budget, fund, distribution) had many fields and sub-objects; navigating to a new page would lose list context. **Options:** navigate to a dedicated page (more space, loses context) vs. modal overlay on the listing (maintains context, requires internal scroll). **Choice:** persistent modal over the listing for all creation and editing operations. **Why:** users frequently need to reference other funds in the list while creating a new one — the modal allows this without additional navigation.

**2. Distribution hierarchy inside the same modal — problem:** a budget can have multiple sub-budgets, each with its own sales hierarchy. Presenting this in separate steps would fragment the flow. **Options:** multi-step wizard (one screen per level) vs. inline accordion within the same modal. **Choice:** expandable accordion inside the creation modal — each distribution can be expanded to show its complete hierarchy (Region → Office → Team → Supervisor), with "Edit" and "Copy Distribution" actions without leaving the context. **Why:** users need to see and compare distributions simultaneously; the accordion keeps everything accessible without forcing navigation between screens.

**3. Suggested Distribution with "Copy" — problem:** trade marketing managers frequently replicate distributions from previous periods with minimal adjustments. Creating each distribution from scratch would be slow and error-prone. **Options:** fully manual creation vs. automatic distribution suggestion based on history with option to copy and adjust. **Choice:** a "Suggested Distribution" section in the fund distribution modal, showing the last relevant distribution with all parameters (value, supervisor, sales hierarchy) and a "Copy Distribution" button that pre-fills the form. **Why:** most distributions follow the same pattern — the design should accelerate the common case and not treat every flow as if it were new.

**4. SAP/SEV integration checkpoint — problem:** fund verification feeds directly into SAP; incorrect or incomplete data at this step has real financial impact. **Options:** automatic integration on save (faster, less control) vs. explicit gate with manual confirmation before release. **Choice:** field "Can it be released for integration approval?" defaulting to "No" — the user must consciously mark "Yes" to release the fund to SAP. Field "Will there be more verification?" allows indicating incomplete auditing without blocking partial save. **Why:** in systems with financial integration, a release error can create inconsistency between the internal system and the ERP — the confirmation gate creates a deliberate review moment before the point of no return.

<div class="image-placeholder">
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>
  <strong>Distribution modal</strong>
  <span>Accordion with sales hierarchy + "Suggested Distribution" + SAP release gate</span>
</div>

---

## Solution

HYPERGESTOR centralizes the complete trade marketing cycle in four connected modules:

- **Budget Registration** — creation of primary and secondary budgets with organizational hierarchy, validity dates, and redistribution flag. Configurable sub-distributions by sales hierarchy.
- **Fund Registration** — fund allocation from existing budgets, with distribution by sales rep, fund classification, and optional product hierarchy.
- **Fund Distribution** — distribution refinement by sales hierarchy level (Region → Office → Team → Supervisor), with automatic suggestion and copy action.
- **Verification and Audit** — recording the audited value, evidence upload (xlsx, txt, pdf, jpeg), partial verification control, and SAP/SEV integration release gate.

---

## Craft & Accessibility

- The **breadcrumb** (Início / Gestão / Orçamentos; Início / Cadastro / Empresas) at the top of each screen orients the user within the system hierarchy without relying on memory of where they are.
- The **paperclip icon with numeric badge** in the Attachments column of the audit listing communicates the presence of evidence without opening the item — a scan-speed decision.
- The **"Audited value" field** in verification is separate from the "Planned value" shown in read-only mode — the user sees the planned amount while filling in the audited amount, creating the comparison in the same context.
- The **"Allows distribution" field** in budget registration is an inline checkbox next to the value — a decision that eliminates a separate field and visually connects the permission to the value it applies to.
- ⬜ Accessibility decisions (contrast, keyboard navigation) — to fill.

---

## Technical collaboration

Design pipeline: `benchmarking + per-profile journey mapping → information architecture → Figma wireframes → internal validations → final interfaces → navigable prototype → development handoff (Azure)`. The per-profile journey mapping was the step that defined which modules existed and how they connected — without it, the risk was building disconnected screens instead of a cycle.

---

## Impact

- **Delivery:** complete system with Budget, Fund, Distribution, and Verification modules, with interfaces for each user profile.
- ⬜ Reduction in fund verification cycle time — to fill.
- ⬜ Reduction in SAP/SEV integration errors after implementing the confirmation gate — to fill.
- ⬜ User satisfaction with the new system vs. previous process — to fill.

---

## Learnings

Internal financial systems have a specific trade-off between speed and control: making everything too fast removes the safeguards the process requires; making everything too deliberate creates adoption resistance. The SAP release gate is the clearest example of this trade-off in the project — and the decision to keep it as explicit confirmation (not automatic) was the right one. **Lesson:** in systems with financial integration, flow design needs to know where to put intentional friction — not every click should be fast.
