# Tap-to-Shower™ — Phase 1 Delivery Tickets

Outcome-framed scaffolding for the dev team: each ticket defines **what success looks like**, not how to get there — fill the implementation detail per ticket.

**Three standing rules for every ticket:**
1. **Success = acceptance.** The criteria here ladder up to Schedule A's Definition of Done. If a ticket's success criteria pass, that part of the contract is met.
2. **Art-direction agnostic.** Build structure and behavior now against the token layer (F1–F3). Visual styling is applied later in A1, once a brand reference is chosen — no hardcoded visual decisions in the meantime.
3. **Stay inside the build.** Out of scope for this build (separately quoted later, do **not** start): buyer-page build-out, navigation restructure, homepage repositioning, site-wide readability system, video/animation. Where a ticket touches their edge, the guardrail is stated inline.

**Land first:** P1 (the enquiry form). The client email references the form going live with routing and acknowledgement — that claim should be demonstrably true.

**Sequence:** Foundation → Form & flow → Content rebuild → QA → Handover prep.

---

## A · Foundation

### F1 — Design-token layer
*Why: lets a brand direction be applied later by editing one layer, not refactoring pages.*
**Success looks like:**
- Every color, type, spacing, radius, shadow, and motion value lives in one token source, named by role (`surface`, `ink`, `accent`, `line`…), not scattered as hardcoded values.
- Changing a single token re-themes everywhere it's used.
- No component references a raw hex or themable pixel value directly.

### F2 — Shared UI primitives
*Depends: F1*
**Success looks like:**
- Buttons, cards, section wrappers, headings, eyebrows, lists, and form fields all come from one shared set, styled only through F1 tokens.
- The Tap-to-Shower page and the existing buyer pages render from those primitives; no one-off bespoke button/card markup remains.

### F3 — Art-direction seam
*Depends: F1*
**Success looks like:**
- A single brand file documents the slots a future brand reference will fill (typeface pairing, accent + neutral ramps, imagery treatment, corner and motion personality), seeded with current values so nothing changes visually yet.
- A short note states exactly which values to edit to apply a new direction.

---

## B · Form & flow

### P1 — Enquiry form: live submit + automated acknowledgement  ·  **priority**
*Why: the contracted core of the build, and the email references it as live.*
**Success looks like:**
- Submitting the form delivers the enquiry to FFI **and** sends an automated acknowledgement to the enquirer — on phone, tablet, and desktop.
- The selected enquiry type is captured in both the notification and the acknowledgement.
- Sends from FFI's own domain for now; the branded BS&C address is a later swap, not a blocker.
- The "form in finalisation" placeholder is gone.

### P2 — Enquiry type pre-selected from context
*Depends: P1*
**Success looks like:**
- Arriving at the form from a buyer CTA pre-selects the matching enquiry type.
- Any type hint in the URL is non-sensitive only (never personal data).

### P3 — One canonical enquiry destination
*Why: CTAs currently split between `/contact?type=` and the page's `#inquiry` form. Depends: P1, P2*
**Success looks like:**
- Every "ask / enquire / request" CTA on the Tap-to-Shower and buyer pages lands on the same working form with the right type pre-selected.
- No CTA points to a second, divergent form or dead-ends.

### P5 — No broken or orphan links
*Depends: P3*
**Success looks like:**
- Every CTA on the Tap-to-Shower page, homepage feature block, and buyer pages resolves — no 404s; the End-Consumer `/where-to-buy` target either exists or is repointed.
- The homepage feature block → Tap-to-Shower page → enquiry path works end to end.
- The previously-broken contact-form function is replaced by the working enquiry flow and is not left reachable anywhere in a broken state (April 4 §2).

### P7 — Engagement tracking connected
*Why: contract asks tracking be kept active where the environment permits — not a new system. Depends: P1*
**Success looks like:**
- Page views, CTA clicks, and form submissions register in the available analytics.

---

## C · Tap-to-Shower content rebuild  (June 11 in-scope)

All operate on the **existing** page and homepage feature block. Copy is client-supplied/approved input.

### C1 — Page reordered
*Depends: F2*
**Success looks like:**
- The page reads: desire → market problem → concept → "more than a heater" → how-it-works overview → buyer gateway cards → "what to know" cards → brief FAQ → CTA, on all breakpoints.
- Installation no longer leads; no orphaned or duplicated sections remain.

### C2 — "The Concept" rewritten (desire-first)
*Depends: C1*
**Success looks like:**
- The concept section opens with the shower experience, then explains the system as more than a heater + hand shower. No installation-first framing.

### C3 — Hero rewritten (experience-first)
*Depends: C1*
**Success looks like:**
- The hero leads with the hot & cold shower experience; its CTAs resolve per P3.

### C4 — "What to Know Before Choosing" cards
*Depends: C1*
**Success looks like:**
- Five explained cards replace the bare fact tiles, each carrying the corrected message: the heater supplies hot water; designed for professional installation (no fixed time); starts from the existing water point; certification depends on the heater model; warranty must match the package.

### C5 — "More than a heater with hand shower" section
*Depends: C1*
**Success looks like:**
- The repetitive "Why This System" block is replaced by one section that differentiates against the basic heater + hand-shower alternative (tap control, hot/cold mixing, overhead/hand options, cleaner routing, complete package).

### C6 — "Who It's For" as a buyer gateway
*Depends: C1, P2*
**Success looks like:**
- Four gateway cards summarize each buyer's value and link onward, with the matching enquiry type pre-selected.
- **Guardrail:** cards link to the existing buyer pages as-is. Building those pages out is out of scope for this build.

### C7 — FAQ trimmed + suitability folded in
*Depends: C1*
**Success looks like:**
- The FAQ shows ~5–6 generic questions that actually expand (answers visible) on all breakpoints, with the standalone suitability content folded into them.
- **Guardrail:** no per-buyer FAQ is added.

### C8 — Claim wording corrected
*Why: accuracy/liability — these claims appear live today. Depends: C1, C9*
**Success looks like:**
- Across the Tap-to-Shower page and homepage feature block, no claim implies the tap heats water, a fixed install time, universal compatibility, or full-system certification.
- Origin wording uses "European know-how" phrasing rather than implying the product is made or engineered in Germany or Denmark.
- **Input dependency:** certification and warranty wording must come from BS&C's supplied materials (April 4 §4). Where those aren't yet supplied, flag rather than guess — accurate certification/warranty claims depend on the client's documents.

### C9 — Homepage Tap-to-Shower feature block copy
*Depends: F2*
**Success looks like:**
- The homepage feature block carries the experience-first headline, short description, visual, and CTA into the Tap-to-Shower page.
- **Guardrail:** the company hero and "Who We Serve" section are untouched.

### C10 — Baseline readability & visual hierarchy (in-scope surfaces)
*Why: April 4 §3 and §7 require the delivered page to be "modern, professional, user-friendly" with "clear hierarchy, readable content, visible calls to action," and make execution quality and clarity of the user journey acceptance criteria. The content rebuild handles section order and copy; this handles the visual legibility the agreement also requires — and it's the most defensible basis a "not complete" objection could rest on. Depends: F1, C1–C9*
*Scope guard: the Tap-to-Shower page and homepage feature block only — the surfaces being delivered. This is **not** the site-wide readability system, which stays out of scope and separately quoted. Art-direction-agnostic: set a legible default in the token layer; a brand reference later (A1) can restyle the aesthetic without undoing the baseline.*
**Success looks like:**
- On both delivered surfaces, heading levels are visually distinct (clear H1 > H2 > H3 hierarchy), body text is legible (sane size, line-height, and line length), and color contrast clears a reasonable legibility threshold.
- Section/asset order and font hierarchy present the product clearly — no competing emphasis, no buried or low-contrast CTAs.
- Spacing rhythm is consistent across sections.
- These values live in the F1 token defaults, so the baseline holds even if no brand direction is ever applied.

---

## D · QA & acceptance evidence

### P6 — Responsive QA pass  (the acceptance gate)
*Why: this is the deemed-acceptance evidence under the Amendment, and it verifies the April 4 §3/§7 bar. Depends: C1–C10, P1–P5*
**Success looks like:**
- A checklist with per-breakpoint screenshots demonstrates the Schedule A criteria, across **phone, tablet, laptop, and desktop**, with interaction behaviors appropriate to each screen size:
  1. Responsive layouts — no broken layouts, clipped text, overlap, unusable buttons, or form faults.
  2. Working CTA path: homepage feature block → Tap-to-Shower page → enquiry form.
  3. Successful test enquiry — type captured, acknowledgement received.
  4. Agreed section flow and corrected wording present on the in-scope surfaces.
  5. The §3/§7 baseline holds (C10): clear hierarchy, readable content, visible CTAs on the delivered surfaces.
- This file is what gets attached at delivery.

---

## E · Handover  (staged — prep now, execute at the gates)

### H1 — Branded sending-domain swap
*Depends: P1*
**Success looks like:**
- A runbook exists with the exact domain-verification steps and the single config change; the DNS records have been requested from the client.
- **Status:** execution waits on the client's domain. Does not block the form going live.

### H2 — Handover package
**Success looks like:**
- A drafted checklist + handover-note outline covers final code, editable assets, credentials/access under BS&C control, and a "how to maintain" note.
- **Status:** final transfer waits on Milestone 2 settlement.

### H3 — Production deployment runbook
*Depends: H1*
**Success looks like:**
- Deploy-to-client-domain steps are written and ready.
- **Status:** execution waits on Milestone 2 settlement + client inputs.

---

## F · Deferred

### A1 — Apply art direction
*Fires when a brand reference is chosen. Depends: F1, F3*
**Success looks like:**
- With a brand reference in hand, editing the F1 tokens and the F3 brand file re-skins the whole site — no structural or component changes — and the P6 QA pass still holds.
