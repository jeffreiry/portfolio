---
title: "Job Analysis"
slug: jobanalysis-case-study
role: "Product Designer, solo project, ongoing since Jun 2026"
summary: "An AI-agent tool that audits my own portfolio's fit against real job postings — and, this month, needed the same kind of audit itself."
thesis: "I design AI products that need to earn trust from strangers. Turns out the hardest version of that problem was earning it from myself."
company: "Personal project"
year: 2026
accent: "#eef2ff"
template: enterprise
tags: ["AI & Automation", "Projetos Pessoais"]
metrics:
  - label: "Job postings scored"
    value: "55"
  - label: "Average fit score"
    value: "57%"
  - label: "Structural sync bug eliminated"
    value: "1 (twice-repeated)"
featured: false
draft: true
protected: false
---

## The tool that grades my portfolio needed grading too

**TL;DR** — Solo project, ongoing since June 2026. A two-agent pipeline that scores my portfolio's fit against real job postings using a weighted Person-Job Fit rubric, instead of gut-checking each one by hand. Built to remove guesswork from my own job search — and, in the process of writing this case, caught a governance gap in the tool itself that I'd missed twice already.

---

## Context & Problem

By August 2026 the spreadsheet had stopped working. What started as 11 postings in June had grown to dozens by September — 55 by the time I wrote this — and reviewing each one by hand meant re-reading my own case studies every time, trying to remember whether Enterprise AI's discovery process actually covered "structured usability testing" or just gestured at it.

I design AI products for other people's hiring and support workflows — Enterprise AI Assistant is a whole case about making an AI's reasoning legible enough to trust. I hadn't turned that same discipline on my own hiring funnel. So I built a pipeline: paste a job description, get a weighted score against a fixed rubric, get the specific gaps that are costing points, get a probable reason if I'm later rejected. Not a vibe check. A repeatable one.

**Prior state:** a spreadsheet of postings and a gut feeling about fit that didn't survive contact with a fifth confidential enterprise JD in a row.

---

## Agent Orchestration

The system isn't one AI doing everything — it's two models with deliberately narrow roles, plus a layer that isn't AI at all. This is the same governance pattern I'd already built into Painel Saúde's four coaching agents: each one proposes inside a fixed boundary, none of them holds unilateral authority.

| Agent | Role | What it's not allowed to do |
|---|---|---|
| **Groq** (`gpt-oss-120b`) | Parses the pasted job description into structured JSON — company, requirements, differentials | Never scores anything. It doesn't know what "good fit" means. |
| **Claude** (`claude-sonnet-4-6`) | Reads the structured requirements against my full case history, reasons about evidence, writes the qualitative analysis | Doesn't do arithmetic. The subtotals it writes are placeholders — the server ignores them |
| **Server** (deterministic) | Recalculates every score and subtotal directly from the rubric tables, becomes the single source of truth | Never judges quality — it can't tell a strong case from a weak one, only add numbers correctly |

I didn't design it this way on the first attempt. Early on, I let Claude output the final percentage directly. It was fine until a job description with fourteen requirements produced a subtotal that didn't match the table above it — a rounding inconsistency, not a hallucination, but enough to make me distrust every score the tool had produced. If the one thing this tool needs to be is objective, I couldn't let a language model own the math.

![Three-agent orchestration diagram: Groq extracts JSON, Claude reasons about fit, the server recalculates the math deterministically — each box lists its role and what it's explicitly not allowed to do](/cases/jobanalysis-case-study/agent-orchestration.svg)

---

## Opportunity Solution Tree

**Outcome:** land an interview at a company where my portfolio's actual gaps wouldn't be a surprise to either of us.

**Opportunities:**
- Know *before* applying whether a gap is fixable in a weekend or structural — instead of finding out from silence three weeks later
- Stop re-reading my own nine case studies from memory every time a new JD looks similar to one I've already lost

**Solutions considered:**
- *Keep the spreadsheet, just organize it better* — rejected. A spreadsheet can't reason about whether "discovery with Clarity" counts as evidence for "structured usability testing." That's a judgment call, not a lookup.
- *Ask a designer friend to sanity-check each JD* — rejected. It doesn't scale past two or three postings a week, and it's exactly the kind of repetitive evidence-matching a model is built for.
- *Two-agent pipeline with a deterministic scoring layer* — the one I built.

**Riskiest assumption to test:** that a language model could apply the same 0–3 rubric consistently across dozens of unrelated job descriptions without quietly drifting toward flattering scores over time.

---

## Pipeline & Failure Modes

The happy path is short: paste a JD → Groq extracts structure → Claude scores and writes the analysis → server recalculates the math → a Markdown file is written to `Bench_job_applications/` → the index updates.

![Pipeline flowchart: six-step happy path from pasting a job description to the index updating, with three documented error branches hanging below the steps where they were actually caught — incomplete input, truncated response, and slug collision](/cases/jobanalysis-case-study/pipeline-flowchart.svg)

- **Incomplete input, confident output.** In September a job description hadn't pasted correctly. Groq still produced a plausible-looking JSON from the fragment it got. Claude scored it 95% — the highest in the whole bench — against requirements that were generic because the source was generic. Nothing in the pipeline flagged it as wrong; it looked like my best-fitting job yet. I only caught it because the company name matched a posting I'd already analyzed properly at 56%. The fix wasn't a code change — it's a standing rule now: a suspiciously high score with no archived JD text is treated as corrupted data, not good news.
- **Two versions, one truth.** Re-running an analysis on a posting I'd already scored doesn't overwrite the file — it saves a second one with a timestamp, so a manually-updated "Candidatura enviada" status never gets silently erased by a reanalysis. I reconcile these by hand, keeping the newer content under the clean filename.
- **Truncated before the finish line.** A job description with an unusually long list of requirements once produced a Claude response that got cut off mid-JSON, before the metadata the server needed to parse the result. The user-facing error was a generic "unexpected format" — not helpful for figuring out why. I raised the token ceiling and added a log line for that specific failure so the next one is diagnosable in seconds, not minutes of guessing.

---

## Service Blueprint

| | Front-stage (what I see) | Back-stage (what makes it work) |
|---|---|---|
| **Reviewing a score** | A card with score, gaps, and a status pill | The page reads every `.md` file in the folder fresh, on every request — no database, no cache |
| **Marking a rejection** | A red-bordered card with a "Motivo provável" callout | That field is never written automatically — I have to ask for the analysis explicitly before it's considered complete |
| **Editing candidacy status** | A modal, a dropdown, a save button | Only works when I'm running the app on my own machine — the hosting platform's filesystem is read-only, so in production the same button silently does nothing |
| **Trusting the score at all** | A single percentage | Depends on an environment variable being read in a way that can't get frozen into the wrong value at build time — the exact bug class that once let two confidential case pages go live without a password check |

---

## Decision Log

| Decision | Alternative considered | Why not |
|---|---|---|
| Server recalculates every score from the rubric tables; the model only reasons | Let Claude output the final percentage | A rounding drift on a 14-requirement JD undermined trust in every score the tool had ever produced |
| "Motivo da recusa" is written only when I ask for it | Auto-generate a reason the moment status flips to Recusado | I want the causal read authored on purpose — a model wasn't in the room for the actual rejection, I was |
| Reanalysis that collides with an existing file keeps the newer content, discards the timestamped duplicate | Overwrite the old file immediately | Would silently erase a "Candidatura enviada" status I'd already updated by hand |
| The "Gaps transversais" table is read live from the index file, not duplicated into the page's code | Keep a second copy in the page and remember to update both | I'd already forgotten to update both twice — once missing an entire row nobody noticed for weeks |

---

## Risk & Assumption Map

**Riskiest assumption:** an LLM can hold a fixed 0–3 rubric steady across dozens of unrelated postings without drifting.
*Mitigation:* the model never touches the arithmetic — drift in judgment can't compound into drift in the number. And every new analysis gets a manual read against the source JD before I consider it valid, which is how the 95%-with-no-JD case got caught at all.

**Second-riskiest assumption:** that a designer grading his own work with his own tool wouldn't just loosen the rubric until it flattered him.
*Mitigation:* the scoring math lives entirely on the server, untouched by any content-level judgment call. If I wanted to inflate a score, I'd have to change code, not just a feeling — which is a much harder thing to do quietly.

---

## Solution & Craft

*⬜ Screenshots to capture: the card grid with score/status/gap tags, the "Ver análise" expander with the two-bar breakdown (obligatory ×2, preferred ×1), the rejection card with the red "Motivo provável" callout, the pill filters for status and fit band.*

The interface is intentionally plain — this was never meant to be shown to anyone but me, which made it a useful test of whether good information design holds up without an audience to perform for. Score bands use color only as a second signal, never the only one: the text always says "Aderência parcial," the color is decoration.

---

## From One File to a Live Index

The tool went through three real structural stages, documented in the project's own changelog rather than reconstructed from memory:

**Stage 1 — a single flat file.** `BENCHMARK.md` held every job posting's analysis as one long document. It worked until I needed to sort by score or filter by status, and rewriting the whole file by hand for one update stopped being sustainable.

**Stage 2 — one file per posting, one index.** `Bench_job_applications/_index.md` became the ranked table; every posting got its own `.md` with the full analysis. This scaled — until the page's own code kept a second, hand-copied version of the "Gaps transversais" table for its UI, and the two quietly diverged twice.

**Stage 3 — one source, read live.**

```diff
- const gaps = [
-   { gap: 'Métricas de impacto', impacto: 'Alto', vagas: 'Todas', acao: '...' },
-   { gap: 'Artefatos visíveis',  impacto: 'Alto', vagas: 'Todas', acao: '...' },
-   { gap: 'Acessibilidade',      impacto: 'Médio–alto', vagas: 'SAP, BTG, Boticário', acao: '...' },
-   { gap: 'UX Research estruturado', impacto: 'Médio', vagas: 'C&A, SAP, ADP, Itaú', acao: '...' },
- ];
+ const gaps = parseGapsTransversais(benchDir);
```

The second version isn't better because it's shorter. It's better because there's structurally only one place left to be wrong.

---

## Outcomes

- **55 job postings scored** against the same fixed rubric — up from 11 in June, a rate I couldn't have sustained by hand.
- **3 completed analyses were sitting orphaned** from the ranked index before this pass caught them — invisible to the tool meant to make gaps visible.
- **The "UX Research" gap had been undercounted 4 vagas to 22** — the audit that fixed the sync bug also corrected the number itself, which had been quietly wrong for longer than the sync bug had existed.
- One class of bug — hand-copied data going stale — is now structurally impossible for this specific table, because there's only one copy of it left.

I'm not counting "got an interview" here. I don't have that number yet, and I'd rather leave it out than round it up.

---

## What I'd Still Want to Know

The whole tool rests on step two — Claude's reasoning — staying consistent across 55 unrelated postings, and I don't have a systematic way to check that beyond reading each file myself. That's not solved. It's a known gap I'm choosing to live with, because the alternative — trusting it blindly — is worse.

I also don't know if seeing a "Motivo provável" the moment a rejection lands actually changes what I do next, or if it's just a number I enjoy looking at. I haven't tracked that.

The part I didn't expect: writing this case forced me to read my own architecture the way I read a client's, and the thing I found wasn't a missing feature. It was the same mistake, twice — a second copy of the truth that only I was responsible for remembering to update. I'd flag that instantly in someone else's product. It took building the audit tool, and then writing about it, to flag it in mine.
