# Tap-to-Shower™ — Codebase Change Manifest

What should be **different in the code** once the Phase 1 ticket list is fully implemented. This is the end state to verify against — not the steps to get there.

---

## New things that should exist

- **One styling-values file.** All colours, text sizes, spacing, corner radii, shadows, and motion values live in a single place, named by role (e.g. "surface," "ink," "accent") rather than scattered as fixed values across the code. *(F1)*
- **A set of shared building blocks.** Reusable button, card, section wrapper, heading, and form-field pieces that the pages are built from, instead of each page carrying its own one-off versions. *(F2)*
- **A brand-settings file.** A single file listing the things a future visual style would change (fonts, accent colours, image treatment), pre-filled with the current look so nothing changes yet. *(F3)*
- **A working form handler.** A small backend endpoint that, when the form is submitted, sends the enquiry to FFI and an automatic confirmation email to the person who enquired. *(P1)*
- **One configurable "from" address.** The email sending address is a single setting, so switching to the client's branded address later is a one-line change, not a rewrite. *(H1)*

---

## Things that should change

### The Tap-to-Shower page
- **Sections reordered** to: experience-led hero → the real problem (bathrooms starting with one water point) → the concept → "more than a heater with hand shower" → a short how-it-works overview → buyer gateway cards → "what to know before choosing" cards → a brief FAQ → call to action. Installation is no longer first. *(C1)*
- **Hero and "The Concept" rewritten** to lead with the shower experience. *(C2, C3)*
- **The old "facts to know" tiles replaced** by five explained cards with corrected wording. *(C4)*
- **The repetitive "Why This System" block replaced** by a "more than a heater with hand shower" section. *(C5)*
- **"Who It's For" turned into four gateway cards** that link out (to the existing buyer pages as they are) with the right enquiry type pre-set. *(C6)*
- **FAQ trimmed** to ~5–6 questions whose answers actually open (today only the questions show), with the standalone "suitability" content folded into it. *(C7)*
- **Claim wording corrected:** the tap doesn't heat water, no fixed install time, no "works with everything" implication, certification tied to the right part, and "European know-how" phrasing rather than "engineered in Germany/Denmark." *(C8)*
- **Legible baseline:** text hierarchy, spacing, and contrast set so headings, body, and buttons read clearly — driven by the styling-values file. *(C10)*

### The homepage
- **The Tap-to-Shower feature block updated** — headline, short description, product visual, and button into the Tap-to-Shower page. *(C9)*
- Nothing else on the homepage changes.

### The enquiry form
- **The "form in finalisation" notice and email-fallback button are gone;** the form submits for real. *(P1)*
- **It pre-selects the buyer type** based on the link the visitor arrived through. *(P2)*
- **A confirmation email goes out automatically** on submit. *(P1)*

### Links and routing
- **Every "ask / enquire / request" button points to one single form** (today they split between the contact page and the Tap-to-Shower form). *(P3)*
- **The old broken contact form is replaced and not reachable in a broken state** anywhere. *(P5)*
- **Dead or wrong links fixed** (e.g. the End-Consumer "where to buy" link). *(P5)*

### Tracking
- **Page views, button clicks, and form submissions are reported** to whatever analytics the site already has — no new analytics system. *(P7)*

---

## Things that should NOT change (guardrails)

The codebase agent should leave these alone — touching them is out of scope and separately quoted:

- **The buyer pages** — linked to as they are, not built out or restyled.
- **The top navigation** — no restructure, no moving items around, no new dropdowns.
- **The homepage company hero and the "Who We Serve" section** — untouched.
- **The rest of the site's readability** — only the Tap-to-Shower page and the homepage feature block get the legibility baseline; not a site-wide pass.
- **No new pages, no video or animation.**

---

## Produced alongside the code (documents, not code)

- A short runbook for switching the form's sending address to the client's branded domain later. *(H1)*
- A handover package outline: final code, editable assets, an access/credentials note, and a "how to maintain" note. *(H2)*
- A deployment runbook for going live on the client's own domain later. *(H3)*

---

## Deliberately not in this round

- **Applying an actual brand/visual style.** The styling-values and brand-settings files are in place so this becomes a quick change later, but no brand look is applied until a reference is chosen. *(A1)*