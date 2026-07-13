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

I came in as the Product Designer for the scale-up — leading discovery (interviews with MVP users, behavioral analysis via Clarity, usability testing with task-completion metrics), synthesizing opportunities in Mural, and developing all design in Figma over 6 months from discovery to handoff.

Two constraints shaped every decision: the MVP had an active user base, so we couldn't break what was already working; and in this context, a wrong AI answer carries real cost — compliance violations, incorrect decisions. Users needed to see where an answer came from before they'd act on it. That was the design problem, not the model.

**Prior state:** accurate corporate knowledge, but inaccessible — and an MVP that answered correctly but wasn't trusted.

---

## Discovery & Insight

The Clarity recordings were the turning point. We could see exactly where people stopped: they'd read the answer, then open another tab. Every time. Not because the answer was wrong. Because they didn't know where it came from.

That was the second problem, and it was the deeper one. The first was the search interface itself — it asked users to *navigate* documentation when what they wanted was to *ask*. Search is a task people do only when they have no alternative.

**The turning point:** the product didn't need better search. It needed to eliminate the need to search — and make the source of each answer as visible as the answer itself.

![](/cases/enterprise-ai-assistant/02-user-research.png)

---

## Process & Decisions

The conversational interface over search was the easy call. Once we saw the Clarity recordings it became obvious: the existing search didn't have a ranking problem, it had a wrong-tool problem. Users were constructing queries to navigate documents when what they wanted was to ask a question. No filter improvement fixes that.

The hard call was the source panel.

We knew users were leaving the interface to verify answers before acting. The fix seemed clear — show them where the answer comes from. But I spent longer than I expected on the format. Three options: inline citations embedded in the response text, a tooltip on hover, or a persistent side panel. Inline felt natural at first — the connection between claim and source is strongest when they're adjacent. But when I prototyped it, the response became hard to read. The citations interrupted the synthesis. I landed on the side panel — not because it was the obvious answer, but because the other two each solved the wrong version of the problem.

The thing I still don't know: does the panel actually change behavior, or just make people feel better about behavior they were already doing? There's a version of this feature that's a genuine trust mechanism and a version that's expensive reassurance theater. I believe it's the former. We launched before I could measure it properly.

For new users, the blank start screen was a real problem. Nobody knew what to ask an assistant covering three knowledge bases simultaneously. We tried a brief onboarding tooltip. Nobody read it. The right answer came from the Clarity data: the most common searches were predictable — we turned those into suggested prompt chips. Specific, not generic. "What is the procedure for X?" not "Try asking me something."

The integration architecture wasn't really a design decision. Once we understood that users needed to know whether an answer came from the IT policy or the compliance manual, consolidating the sources into a single base was off the table. It would have solved a technical problem and created a trust problem. Distributed query with per-source citation was the only approach that preserved what the platform needed to be.

The discovery-to-handoff pipeline ran through Clarity recordings and heatmaps → user interviews → Mural synthesis → Figma wireframes → navigable prototype → engineering validation. The recordings were the decisive input: they showed exact drop-off points — where users stopped, left to confirm, or repeated the same search differently. Microsoft Copilot was used during the hypothesis phase to stress-test design rationale before committing to direction, particularly for the source panel model.

![](/cases/enterprise-ai-assistant/03-main-interface.png)

---

## Solution & Craft

A centralized platform for accessing corporate knowledge. Users open a single interface and can ask in natural language, receive structured answers generated from actual internal documents, verify the sources in a persistent side panel, explore related documents, and resume previous conversations.

- The **empty initial state** shows suggested prompts as clickable chips — people don't know where to start with an assistant covering three knowledge bases at once. The prompts show them, without requiring any reading first.
- The **source panel** is a persistent lateral column, not a modal: it stays available without interrupting the reading of the response. A badge with the source count on each message signals traceability before the panel is even opened. Response structure visually separates the AI synthesis from source access — clear hierarchy between "what the assistant concluded" and "where that comes from."
- **Accessibility:** all flows are fully operable via keyboard, tab order follows reading and interaction sequence (WCAG 2.1.1). Trust indicators and source badges use icon + label combinations, not color alone. Heading hierarchy, ARIA roles, and landmark regions were specified as part of the design — not a QA pass — and delivered alongside the Figma handoff.

![](/cases/enterprise-ai-assistant/01-file-source.png)

---

## Learnings

There's one thing I'd want to go back and measure: whether the source panel actually changed user behavior, or just made people feel better about behavior they were already doing. There's a difference between a feature that builds trust and one that signals it. I believe it's the former. I couldn't prove it.

The broader lesson: this is a scale-up case, not a 0→1 — and that changes the type of judgment required. Some architectural decisions were already made by the MVP. The work was identifying what was wrong at the *experience layer*, not in the technology. In enterprise AI, trust doesn't emerge from the model's accuracy. It's a design problem.
