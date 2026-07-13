---
title: "Arezzo&Co · Social Media Ad System"
slug: arezzo-ad-management
role: "UX Researcher · UX Designer · UI Designer"
summary: "An ad management platform that unifies three user profiles with distinct needs into a single system."
company: "Arezzo&Co (via CWI)"
year: 2023
cover: /cases/arezzo-ad-management/visao-geral.png
bgImage: "https://images.unsplash.com/photo-1748570569710-008d3050c104?fm=jpg&w=800&q=80&auto=format&fit=crop"
accent: "#ecf0f3"
template: brand
tags: ["AI & Automation", "UX Research", "Data & Analytics"]
featured: true
draft: false
order: 7
---

## One system, three journeys: how role-based information architecture unlocked ad management at Arezzo&Co Group

**TL;DR** — UX Researcher, UX Designer, and UI Designer, 3 months. Redesign of the social media ad management system for the Arezzo&Co group, serving three profiles with radically different needs — Marketing, Traffic Managers, and Store Owners — within a single platform with role-adapted information architecture.

**Tags:** Retail · Multi-role · System design · Dashboard · Mobile · Figma

---

## Context & Problem

The Arezzo&Co group operates multiple brands (Arezzo, Schutz, and others) with hundreds of physical stores, each with autonomy to create and submit social media ads. The chain involves three actors with distinct goals: the **Store Owner** who creates and tracks their own ads, the **Traffic Manager** who supervises a set of stores and approves the creatives, and the **Marketing** team who monitors consolidated brand performance and manages budgets. The existing system didn't reflect this structure — all profiles accessed the same screens, regardless of what they needed to do.

I came in as UX Researcher, UX Designer, and UI Designer, responsible for the full project — conducting interviews with each user profile, mapping journeys and role-based information architecture, and designing all interfaces (web and mobile) in Figma over 3 months. The project was built in partnership with a technology company that provided the platform for the group.

The scope had three hard constraints: the solution had to be a single coherent platform with differentiated routes per role, not three separate products; it had to serve Arezzo, Schutz, and other group brands with visual consistency without losing each brand's identity where it mattered; and a 3-month timeline covered research, architecture, design, and prototyping of web + mobile for all three profiles.

**Prior state:** a single system with no role differentiation, where Store Owners got lost in corporate metrics and Marketing had no consolidated view without navigating store by store.

---

## Discovery & Insight

The interviews revealed that the problem wasn't missing functionality — it was **wrong audience**. The system had the right information, but routed it to whoever didn't need it. A Store Owner doesn't need the consolidated ROAS of all 165 brand stores; they need to know if their ad was approved and how much budget they have left. A Traffic Manager manages approvals across a portfolio of stores — the question is "what's pending and from where," not how to create a submission. Marketing is the only profile that needs the full funnel, from impressions to sales, for the entire brand.

**The turning point:** that made this an information architecture problem, not an interface one. Each profile needed a different product inside the same system.

---

## Process & Decisions

The decision that cost me the most was the three distinct homes — the worry was that building separate experiences per role would create friction for anyone who, in practice, wore more than one hat. A regional manager who also tracked their own ads wouldn't feel at home in either view.

**1. Role-based information architecture — problem:** a single IA for three profiles forced every user to ignore most of the system. **Options:** preference-based personalization (user chooses what to see — more flexible, more complex to maintain) vs. fixed role-based architecture (routes and screens defined at login — simpler, more appropriate for a corporate context). **Choice:** differentiated information architecture per role, with distinct lateral navigation for each — Marketing (Home, Approvals, Panel, Metrics, Budget, Register, Notifications), Traffic Managers (Home, Reports, Feed, New, Submissions, Notifications), and Store Owners (Home, New, My Submissions, Feed, Notifications). **Why:** each profile's context is mutually exclusive — mixing them on a single screen harms all three.

**2. Home as a contextual control panel — problem:** the home needed to answer different questions for each profile without becoming a generic, useless screen. **Options:** single home with role filters (complex, confusing) vs. three distinct homes optimized for each role's primary task. **Choice:** differentiated homes — Marketing sees consolidated budget, investment distribution (Invested/Provisioned/Remaining), active store performance metrics, and Revenue Impacted; Traffic Managers see the stores they're responsible for, focused on tactical decisions; Store Owners see their available balance, their active ads with inline results, and an alert banner when budget is unused. **Why:** the home is the first screen of every session — it needs to immediately answer each profile's most frequent question without requiring navigation.

**3. Approval workflow with compound filters — problem:** Traffic Managers receive ads from multiple stores simultaneously; without efficient filtering, the approval queue becomes noise. **Options:** linear list with simple search vs. visual grid with compound filters (Store, Status, Budget, Positioning, Archive) and quick-access chips. **Choice:** ad grid with cascading filters — selecting "Status" reveals sub-statuses with counts (New: 5, Approved: 10, Rejected: 2); date, active status, and ordering chips always visible at the top. **Why:** the Traffic Manager needs to prioritize the queue, not just scroll through it — seeing counts by status before filtering allows a decision about where to start.

**4. Funnel metrics for Marketing** — the first wireframes had isolated KPI cards. Revenue Impacted. ROAS. Average Ticket. Each number in its own box. I did an internal presentation and the feedback was too polite to be honest — people agreed it was "clear" but couldn't say what the dashboard actually *said* about ad health.

The problem was that isolated cards show state, not relationship. What Marketing needed to understand was: where does the chain lose efficiency? "Conversations: 20" doesn't answer that. "Impressions 3,538 → Conversations 20" does. I replaced the cards with a visual funnel (Impressions → Engagement → Clicks → Conversations → Sales) — the KPI cards stayed as complement, not protagonist.

Research and design pipeline: per-profile interviews → journey mapping + benchmarking → role-based information architecture → Figma wireframes → internal validations → web + mobile interfaces → prototyping → handoff to partner technology company. The role-based information architecture phase happened before any screen was designed — defining which routes and modules existed per role was what made it possible to develop the interfaces without rework.

![Marketing — conversion funnel from impressions to sales with consolidated metrics](/cases/arezzo-ad-management/02-manager-view.png)

---

## Solution & Craft

A multi-role ad management platform with three distinct experiences within the same system:

- **Store Owners** create and track their own ads, view their results (engagement, clicks, generated revenue, ROAS), and are alerted when they have unused budget available.
- **Traffic Managers** approve or reject ads via a filtered queue, monitor stores under their responsibility, and track tactical performance reports.
- **Marketing** accesses the consolidated panel with a conversion funnel, manages monthly budget per store with inline editing, and monitors the health of the entire brand's ad portfolio.

All screens were delivered in **web and mobile**, with mobile navigation adapted to each profile's usage pattern.

![Store Owner mobile view — available balance (R$ 2,000), active ad with status badge, and inline results (engagement, clicks, revenue, ROAS)](/cases/arezzo-ad-management/01-store-view.png)

- The **available budget alert banner** on the Store Owner view uses amber (not red — it's not urgency, it's opportunity) and offers an immediate "Learn more" action without forcing interaction.
- **Ad cards in the approval queue** display status with a colored badge (orange "New", green "Active") + run dates + budget at the top, allowing context reading before opening the ad.
- The **editable budget** uses inline editing triggered by a pencil icon — the field opens with the current value pre-filled and a "Confirm" button without leaving the table.
- **Mobile navigation** was redesigned per profile: Store Owners have "New" prominently centered in the bottom nav (their primary action); Traffic Managers have "Reports" as the first item.
- **Status badges** (orange "New", green "Active") pair color with a text label — status is readable without relying on color alone, meeting WCAG 1.4.1 for users with color-vision limitations.

![Traffic Manager — ad approval queue with cascading filters (Store, Status, Budget, Positioning) and status counts before filtering: New 5, Approved 10, Rejected 2](/cases/arezzo-ad-management/03-admin-view.png)

---

## Learnings

I delivered web and mobile interfaces for all three profiles, covering all journeys from the research. But we measured nothing after launch — no satisfaction by role, no approval time, no budget utilization rate for Store Owners.

If I were doing it again: before closing the scope, I would have negotiated a validation round with real users from each role on the navigable prototype — not to change the architecture, but to confirm whether each profile's contextual home actually answered their most frequent question, or whether I'd gotten the information hierarchy wrong somewhere. Role-based design seems right in theory. Without post-launch feedback, I don't know where I missed.

The constant pull in this project was toward a single home with role filters — the "serves everyone" shortcut. The pressure back from it was specific: Marketing's home needs to show the investment funnel across 165 stores; a Store Owner's home needs to show their own balance and ad status. Those two things on the same screen don't overlap — they cancel each other out. Defining separate homes before drawing any screen was what made the rest buildable: each user entered a product designed for what they actually needed to do.

What I still think about: whether a Regional Manager who also tracks their own stores would be able to orient themselves in this system. They weren't the primary persona — but the hybrid role is common in retail. The three-home architecture doesn't have a clean answer for them, and that's the kind of gap that only becomes visible after launch, with a real person sitting in front of the wrong home.
