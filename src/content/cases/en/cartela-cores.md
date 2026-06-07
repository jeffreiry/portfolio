---
title: "Cartela de Cores"
slug: cartela-cores
role: "Product Designer, solo, end-to-end"
summary: "Turned a static color-analysis PDF into a living system that scores wardrobe items against a personal palette in real time."
company: "Personal project"
year: 2024
cover: /cases/cartela-cores/cover.webp
accent: "#fff7ef"
tags: ["Web app", "Color algorithm", "Design system", "Accessibility"]
url: ""
metrics:
  - label: "Score accuracy"
    value: "4.8% avg error vs. manual rating"
  - label: "Colors validated"
    value: "22 of 28 within ±10%"
featured: true
draft: true
order: 4
---

## From a dead PDF to a wardrobe that matches itself

**TL;DR** — Solo Product Designer, end-to-end (research → production). A web app that turns a personal color-analysis consultation — usually delivered as a static PDF — into a living system that scores, in real time, whether each item in your wardrobe matches your palette, and helps you build harmonious outfits.

---

## Context & Problem

A personal color-analysis session ends with a verdict ("you're a *Warm Autumn*, wear these colors") handed over as a static document. The real problem starts **afterwards**, in front of the closet: people can't apply the knowledge — they don't know whether a shirt they already own fits the palette, or how to combine what they have into outfits that work. The value of the consultation gets locked inside a PDF nobody reopens.

**Prior state:** correct knowledge, but inert. Getting dressed stayed a guessing game.

<div class="image-placeholder">
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>
  <strong>Before / After</strong>
  <span>Static PDF consultation → live scoring interface</span>
</div>

---

## Your role

Solo, end-to-end: domain research (color theory), product definition, interaction design, design system, and implementation (HTML/CSS/JS + Firebase). A Product Designer who prototypes at high fidelity all the way to production.

---

## Constraints

- **Solo, no budget** — no paid infra; decisions biased toward zero cost.
- **Sensitive data** — photos of the user's wardrobe, requiring per-account isolation.
- **Multi-user after launch** — the initial single-user architecture had to evolve without a rewrite.

---

## Discovery & Insight

The turning point was reframing the question. "Does this color match?" sounds subjective, but it can become a **measurement**: *perceptual color distance* (ΔE in the CIE L\*a\*b\* space) models exactly "how far this item is from my palette". Once the computer measures distance, the guess becomes a score.

<div class="image-placeholder">
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>
  <strong>Technical diagram</strong>
  <span>Color pipeline: HEX → RGB → XYZ → CIE L*a*b* → ΔE → Score</span>
</div>

---

## Process & Decisions

**1. Color space — problem:** RGB and HSL aren't perceptually uniform (the same numeric difference means different visual differences across the spectrum). **Options:** stay in RGB (simple) vs. convert to CIE L\*a\*b\* (complex). **Choice:** L\*a\*b\* + ΔE. **Why:** it's the only space where "distance" maps to human perception. I validated the score against manual ratings: **4.8% average error**, with 22 of 28 colors within ±10%.

**2. What makes an item a "wildcard" — problem:** "versatile" is vague. **Choice:** I turned it into an explicit rule — score ≥ 85% **and** a neutral palette color **and** plain/subtle pattern **and** works in ≥ 3 occasions. **Why:** an accent-color piece (burnt orange, wine) is beautiful but limits combinations — so it's "versatile", not a "wildcard". This is designing a rule system, not just screens.

**3. Multi-user architecture — problem:** after adding login, one user's data leaked into another's during session switching. **Root cause:** the app rendered before Firestore responded, and `loadData()` triggered a `saveData()` that overwrote the wrong account. **Choice:** clothing catalog shared in localStorage vs. outfits isolated per user in Firestore; rendering moved inside Firestore's `.then()`; an `_authReady` flag blocking saves during loading. **Why:** separate shared from private data, and never render/save before confirming whose data it is.

**4. Score accessibility — problem:** communicating quality by color alone excludes color-blind users. **Choice:** every score carries **color + icon + text label** (✓ Excellent / ↑ Great / – Fair / ↓ Review); minimum font sizes raised; rule blocks explained inline, not just in an ephemeral toast. **Why:** information must never depend on a single sensory channel.

**5. Navigation — problem:** the sidebar ate space and hid tabs. **Choice:** I replaced it with a permanent horizontal topbar (and a bottom nav on mobile). **Why:** all 7 areas reachable in one tap, no hidden menu.

<div class="image-placeholder">
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>
  <strong>Main flow</strong>
  <span>Combiner interface — body zones (Top, Shirt, Accessories, Bottom, Footwear) with score badges</span>
</div>

---

## Solution

Seven areas: Home (hub with stats and last outfit), Catalog (with multi-select and "retire" items), the **smart Combiner**, Suggestions, Outfits, Shopping, and Palette (the color reference).

The heart is the **Combiner**: it always shows the body zones (Top, Shirt, Accessories, Bottom, Footwear); each empty slot suggests the best item (dimmed) with "+ Add"; a "↺" button opens an alternatives picker **sorted by harmony**; each slot shows a score badge ("✓ 87%"), and a floating card explains **which item anchors or drags down** the outfit's harmony.

<div class="image-placeholder">
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>
  <strong>System diagram</strong>
  <span>7 areas and data flow: Catalog → Combiner → Palette</span>
</div>

---

## Craft & Accessibility

- `object-fit: contain` + white background on cards to show the full item with no cropping or empty frame.
- Consistent `aspect-ratio` across catalog (3/4) and combiner slots for visual rhythm.
- Score always multi-channel (color + icon + text); confirmation before deleting outfits.

<div class="image-placeholder">
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>
  <strong>Craft detail</strong>
  <span>Score badge states: ✓ Excellent · ↑ Great · – Fair · ↓ Review</span>
</div>

---

## Technical Collaboration

Color pipeline I implemented: `HEX → linear RGB → XYZ (D65) → CIE L*a*b* → minimum ΔE → Score`. An 18-color anchor palette, each with its own score; the final score inherits a fraction of the nearest anchor (`final = anchorScore/100 × base`). Backend on Firebase Auth (email + Google) and Firestore with per-`uid` rules.

---

## Impact

- **Accuracy:** scoring algorithm with **4.8% average error** vs. manual rating.
- **Qualitative:** a static consultation became a daily decision tool — "does this match?" went from a guess to an explainable number.

---

## Learnings

The model has an honest limit: ΔE doesn't capture **perceptual temperature**, so cool colors (pure white, cool pink, neon yellow) are overestimated by ~15–23% vs. manual judgment. I've already mapped the fix — a penalty for *hue* > 150° — and the next step: extracting the dominant color from the photo automatically (ColorThief) instead of manual selection. **Lesson:** acknowledging where the model fails and having the correction planned is worth more than pretending total accuracy.
