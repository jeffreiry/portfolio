---
title: "Painel Saúde"
slug: painel-saude
role: "Product Designer, solo, end-to-end"
summary: "A dashboard unifying Strava and Hevy data into a single progress view toward a 2028 marathon."
company: "Personal project"
year: 2026
accent: "#e8f5e9"
template: editorial
tags: ["Data & Analytics", "Projetos Pessoais"]
url: "https://painel-saude-zeta.vercel.app"
metrics:
  - label: "Operational autonomy"
    value: "100% automated, daily updates"
  - label: "Data coverage"
    value: "Mar 2025 → present"
featured: false
draft: false
order: 1
---

## One dashboard for a 3-year journey toward a marathon

**TL;DR** — Solo Product Designer, end-to-end (information design → implementation → ops). A personal dashboard that unifies running (Strava) and strength (Hevy) into a single progress narrative toward a 2028 marathon, with data that refreshes itself every day.

**Tags:** Dashboard · Information design · API integration · SvelteKit · DataViz

**URL:** https://painel-saude-zeta.vercel.app · **Data range:** Mar 2025 → present

---

## Context & Problem

Serious training lives in fragmented data: running sits in Strava, strength sits in Hevy, each app with its own lens. There's no integrated view that answers the question that matters — **"am I progressing toward my goal?"** — nor one that cross-references signals between disciplines (strength × running, weather × pace).

**Prior state:** two apps, two disconnected stories, no answer about the long-term trajectory.

<div class="image-placeholder">
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>
  <strong>Dashboard overview</strong>
  <span>Unified view of running + strength in a single progress narrative</span>
</div>

---

## Your role

Solo, end-to-end: information design, data architecture, implementation (SvelteKit + Chart.js), and operations (deploy and automated sync).

---

## Constraints

- **Single-user, zero paid infra** — the architecture had to cost nothing.
- **Third-party APIs** with rate limits and expiring tokens.
- **Freshness without maintenance** — data had to stay current with no daily manual work.

---

## Discovery & Insight

The value wasn't in **one more chart**, but in **integration + projection**. Cross-referencing sources answers questions no single app can: projecting race times (Riegel formula anchored on the real PR), flagging imbalances between strength and running, and contextualizing pace by weather.

<div class="image-placeholder">
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>
  <strong>Data architecture</strong>
  <span>Pipeline: Strava/Hevy API → GitHub Actions → JSON → SvelteKit → Vercel</span>
</div>

---

## Process & Decisions

The decision that cost me the most was starting with 8 tabs — the worry was whether that was product design or feature accumulation. The criterion I used: if each tab answers a different question, it's design. If it just adds more data, it's noise.

**1. Data architecture — problem:** "real" dashboards call for a database and an API server, which cost money and maintenance. **Options:** database + backend (real-time, expensive) vs. static JSON versioned in Git (non-real-time, free). **Choice:** static JSON as the single source of truth, updated by a daily sync. **Why:** the panel is read-only, single-user; Git-versioned data is auditable, costs nothing, and runs on any CDN. A conscious trade-off: I give up real-time for simplicity and zero cost.

**2. Automated sync — problem:** static data goes stale. **Choice:** GitHub Actions runs daily at 6am (BRT), pulls Strava + Hevy, commits only the JSONs that changed, and the push triggers a fresh Vercel deploy. **Why:** daily freshness with no server and no manual touch.

**3. SvelteKit without SSR — problem:** Chart.js needs the DOM, and the data is already static at build time. **Choice:** no SSR, but `adapter-vercel` (not `adapter-static`). **Why:** SSR adds no value here, but adapter-vercel keeps the door open for a future API route (e.g., a Strava webhook for real-time sync) with no migration.

**4. Information design** — the first draft had data organized by source: everything from Strava in one tab, everything from Hevy in another. It felt logical. But when I opened that prototype after a long run, I realized I was doing exactly what the separate apps already did — forcing myself to navigate between sources to get to an answer.

I reorganized around questions: *Am I on plan this week? Am I on track for the 2028 marathon? Are strength and running balanced?* Each tab answers one question. If a tab didn't answer a question, it disappeared.

**5. Data reliability — problem:** the same run can arrive from different sources. **Choice:** explicit priority on completed entries — **manual > Strava > Hevy > null**. **Why:** the most reliable source wins; the manual record always has the final say.

<div class="image-placeholder">
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>
  <strong>"Goal" tab</strong>
  <span>Marathon time projection via Riegel formula anchored on real 10K PR</span>
</div>

---

## Solution

A public dashboard with 8 tabs (Week, Strength, Training, Races, Goal, Attention, Weather, History). Highlights: Riegel time projection anchored on the real 10K PR (auto-updates after every sync); a calendar with filters and a consecutive-week streak; a two-race comparator with per-km pace and HR splits.

---

## Craft & DataViz

- Race estimates (`t2 = t1 × (d2/d1)^1.06`) recomputed on every sync from the real PR — never a hardcoded number.
- Hevy→chart name mapping kept in sync across two places (sync script + component), documented to prevent drift.
- KPIs at the top of each tab for an immediate answer before the detail.

---

## Technical collaboration

Pipeline: `Strava/Hevy API → sync scripts → JSON → SvelteKit build → Vercel`. Secrets in GitHub Secrets + Vercel Env Vars; `.env` in `.gitignore`. Strava re-auth flow documented for when the refresh token expires.

---

## Impact

- **Operational autonomy:** **100% automated**, daily updates, no manual intervention.
- **Coverage:** a continuous history from **Mar 2025 to present**, integrating two disciplines into one narrative.
- **Projection:** race estimates always anchored on the real PR and self-updating.

It's a personal project — usage metrics would be myself. But the measure that matters is different: I open the dashboard before every training week. If I stopped opening it, the project would have failed.

---

## Learnings

Treating data as a **versioned single source of truth** turned simplicity into a feature: auditable, reproducible, and cheap. The most "boring" architectural decision (JSON in Git) was the most correct.

What I carry: the 2028 marathon is still in the future. But now I have a record of how I got here — every training session, every projection, every week. If I finish that race, it'll have meant more than solving an interesting technical problem.
