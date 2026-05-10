# BSC Phase 1 — Revision Tickets
## Five Fold Industries · May 2026 · Internal

Source: Schaefer feedback dated May 8, 2026.
Fix before Monday May 11, 17:30.
Priority order at the bottom.

---

## TICKET-F01 · CRITICAL · Form and Email
**File:** `app/api/contact/route.ts` (or equivalent form handler)

**ISSUE**
The form shows a holding message and cannot submit. `info@bsundc.com`
is now confirmed as the delivery address. Automatic acknowledgment
to submitters is confirmed. This is the single most important fix
before the meeting — Schaefer named it explicitly.

**FIX**
1. Wire the form handler to send a notification email to `info@bsundc.com` on every submission.
2. Include in the notification: enquiry type, name, company, email, phone, message, timestamp, source page.
3. Send an automatic acknowledgment to the submitter:

   > **Subject:** Enquiry received — BS&C Tap-to-Shower™
   >
   > **Body:** "Thank you for your enquiry. We have received your message and will respond as soon as possible. — BS&C Team"

4. Remove the holding-state message from the UI entirely.
5. Implement the success state: form replaced by confirmation message on successful submission.
6. Test end-to-end: submit → notification fires to `info@bsundc.com` → acknowledgment fires to submitter.

**DONE WHEN**
A test submission on the live staging site fires both emails with no errors and the success state displays correctly.

---

## TICKET-F02 · HIGH · Logo
**Files:** `components/header.tsx`, `components/footer.tsx`, `public/`

**ISSUE**
Schaefer flagged the logo as incorrect. This is a fixed constraint in the signed agreement — the BSC logo must remain unchanged. Current treatment is wrong.

**FIX**
1. Source the correct BSC logo from bsundc.com via DevTools Network tab (filter by Img, find logo file, save at full resolution). Use SVG if available.
2. Replace logo in header and footer across all pages.
3. Check: correct proportion, no distortion, correct spacing around the logo, consistent across all pages.
4. Replace favicon in `/public/favicon.ico` with the correct BSC favicon sourced from the live site.

**DONE WHEN**
Logo matches the current live bsundc.com logo exactly on all pages in Chrome, Firefox, and Edge.

---

## TICKET-F03 · HIGH · Homepage Structure
**File:** `app/page.tsx`

**ISSUE**
Homepage currently leads with two TTS blocks which makes BSC look like a single-product company. Schaefer's required structure:

1. Broad BSC hero
2. Featured TTS innovation block
3. Benefit cards
4. Audience paths
5. Featured collections area with TTS as an entry

**FIX**
Reorder existing sections to match the structure above. Remove or consolidate the duplicate TTS block.

Broad BSC hero headline:
> "European Bathroom and Kitchen Solutions for Southeast Asian Markets"

Subheadline:
> "BSC develops, engineers, and supplies bathroom, kitchen, and retrofit shower solutions — designed in Germany and Denmark, produced through qualified partners in China."

Benefit cards (keep existing or build): Easy Upgrade · Hot & Cold Control · Clean Installation · Value for Money.

**DONE WHEN**
Homepage follows the five-section structure above with no duplicate TTS blocks.

---

## TICKET-F04 · HIGH · TTS Page — FAQ Answers
**File:** `app/tap-to-shower/page.tsx` (FAQ section)

**ISSUE**
FAQ section shows questions only, no answers. Schaefer named this explicitly. Answers sourced from the Q&A document in the documentation package.

**FIX**
Populate all FAQ items with answers. Minimum eight items. Do not invent answers — use the Q&A document.

| Question | Answer |
|----------|--------|
| What is Tap-to-Shower™? | Tap-to-Shower™ is a shower concept for bathrooms with only one cold-water outlet. When connected to a suitable instant single-point water heater, it allows hot and cold water to be controlled at the tap without opening the wall or adding concealed pipework. |
| Does the tap itself heat the water? | No. The tap connects to an instant single-point water heater via a flexible PEX tube. The heater warms the water; the Tap-to-Shower™ tap controls the mix and flow at the shower point. |
| Which water heater can be used? | Tap-to-Shower™ is compatible with suitable instant single-point water heaters with a G½" connection. The included connection set is designed for this purpose. |
| Is any wall work required? | No major wall modification is required. The PEX tube routes along the wall surface and is fixed with the included brackets and clips. No concealed pipework needs to be added. |
| Does installation need a plumber? | BSC recommends installation by a qualified professional plumber and, where applicable, a qualified electrician for the water heater connection. |
| What water pressure is required? | The system requires a minimum water pressure suitable for the connected instant water heater. It is not suitable for very low pressure or gravity-fed roof-tank installations. |
| What finishes are available? | Chrome, Matt Black, and Brushed Stainless Steel. |
| What warranty applies? | The Tap-to-Shower™ tap carries a 3-year limited warranty. Compatible instant water heater models may carry their own warranty — please confirm with BSC at time of order. |
| Where can it be purchased in the Philippines? | Philippine availability is currently being prepared. Please contact BSC directly for purchasing and distribution enquiries. |
| Can it be used for retail distribution or project supply? | Yes. BSC supplies Tap-to-Shower™ for retail stocking, project specification, and distribution. Contact BSC to discuss commercial terms. |

**DONE WHEN**
All FAQ items display question and answer. Accordion opens and closes correctly on desktop and mobile.

---

## TICKET-F05 · HIGH · TTS Page — Buyer Blocks Expansion
**File:** `app/tap-to-shower/page.tsx` (Who It's For section)

**ISSUE**
Current buyer blocks are single short paragraphs. Schaefer requires three specific value points per buyer group.

**FIX**
Expand each block to include a headline and three value points.

**RETAILERS / DISTRIBUTORS**
Headline: "Stock a Product That Explains Itself at the Shelf"
- Ready retail package with clear value-for-money story
- Strong shelf-level product explanation — no staff training required
- Margin and turnover relevance in cold-water bathroom markets

**DEVELOPERS / BUILDERS**
Headline: "Specify Now. Let Buyers Upgrade Later."
- Single-line bathroom compatibility — no floor plan redesign
- No additional plumbing runs or concealed pipework required
- Cost and project simplicity with optional buyer upgrade logic

**ARCHITECTS / SPECIFIERS**
Headline: "No Need to Redraw Single-Line Bathroom Concepts"
- Specification-friendly — suitable for homes, condos, and hospitality
- Clean and compact installation with no concealed pipe requirement
- Technical support, dimensional drawings, and datasheets available

**END CONSUMERS**
Headline: "Hot Shower Comfort Without Opening Your Wall"
- Neat visible installation in approximately 30 to 45 minutes
- Available in Chrome, Matt Black, and Brushed Stainless Steel
- 3-year limited warranty on the tap

**DONE WHEN**
Each buyer block displays headline plus three value points. CTA buttons present and linking to the lead capture form.

---

## TICKET-F06 · HIGH · TTS Page — Differentiator Section
**File:** `app/tap-to-shower/page.tsx`

**ISSUE**
No section explains why Tap-to-Shower™ is different from a standard instant water heater. Schaefer required this explicitly.

**FIX**
Add a section between the trust signals and the FAQ with the following content:

**Heading:** "Not Just a Heater. A Complete Shower Solution."

**Body:**
> "A standard instant water heater typically provides one outlet — usually a hand shower. Tap-to-Shower™ creates a more complete hot and cold shower solution: tap control, overhead shower, hand shower, and a cleaner visual result for single-line bathrooms. The difference is not the heat source. It is the shower experience it makes possible."

**DONE WHEN**
Section is present, renders correctly on mobile and desktop.

---

## TICKET-F07 · HIGH · Certification Claim Wording
**File:** `app/tap-to-shower/page.tsx` (trust signals / features section)

**ISSUE**
"CB IEC 60335 certified" currently reads as applying to the complete Tap-to-Shower™ system. It applies to the water heater only. Schaefer flagged this as a compliance risk.

**FIX**
Replace current certification claim with:

> "Compatible instant water heater models may be supplied with CB certification according to IEC 60335-2-35, subject to model and market."

Remove any wording that implies the full system or the tap itself is CB certified.

**DONE WHEN**
No mention of CB IEC 60335 appears without the above qualifier. Search the entire codebase for "IEC" and "CB certified" to catch all instances.

---

## TICKET-F08 · MEDIUM · About Page Copy
**File:** `app/about/page.tsx`

**ISSUE**
Three phrases flagged by Schaefer as generic and imprecise: "Cutting-edge solutions", "Global Reach", "Identification of Tomorrow's Trend".

**FIX**
Replace with Schaefer's approved direction:

Company positioning line:
> "European Bathroom and Kitchen Product Development for Southeast Asian Markets"

Company description:
> "BSC develops, engineers, and supplies bathroom, kitchen, and retrofit shower solutions designed in Germany and Denmark and produced through qualified subcontracting partners in China."

Search the entire About page for any instance of the following and remove:
- cutting-edge
- global reach
- world-class
- innovative
- seamless
- revolutionary
- identification of tomorrow's trend

**DONE WHEN**
None of the flagged phrases appear on the About page. Schaefer's approved wording is in place.

---

## TICKET-F09 · MEDIUM · TTS in Product Collections
**File:** `app/collections/page.tsx` or equivalent collections index

**ISSUE**
Tap-to-Shower™ is missing as an entry in the Product Collections area. Schaefer required this explicitly.

**FIX**
Add Tap-to-Shower™ as the first or featured entry in the Product Collections overview. Link to `/tap-to-shower`. Use the existing product visual as the tile image.

**DONE WHEN**
Tap-to-Shower™ appears in the collections area and links correctly to the TTS page.

---

## TICKET-F10 · MEDIUM · Where to Buy Placeholder
**File:** `app/where-to-buy/page.tsx`

**ISSUE**
Current placeholder looks unfinished. Schaefer accepted the placeholder concept but asked for it to be polished.

**FIX**
Replace current content with:

**Heading:** "Retail and Distribution Availability"

**Body:**
> "Retail and distribution availability across the Philippines is currently being prepared. For project, retail, or consumer purchasing enquiries, please contact BSC directly."

**Primary CTA:** "Request Information" — links to contact form

**Secondary CTA:** "Ask About Availability" — links to contact form

**DONE WHEN**
Page displays polished placeholder with two CTAs both linking to the contact form.

---

## TICKET-F11 · MEDIUM · Cross-Browser Check
**All pages**

**ISSUE**
Schaefer noticed the site renders differently across Firefox, Chrome, and Edge. Must be consistent before the meeting.

**FIX**
Run after all other tickets are closed. Open the staging site in Chrome, Firefox, and Edge and check each of the following. Fix anything that differs materially:

- Header alignment and logo display
- Menu open/close behaviour
- Section spacing
- Font rendering (Calibri weight and size)
- Button alignment and sizing
- Image scaling
- Text wrapping in narrow containers
- Form layout and field sizing

Focus on homepage, TTS page, and contact page — the three pages Schaefer will open first.

**DONE WHEN**
Homepage, TTS page, and contact page look materially identical in Chrome, Firefox, and Edge on desktop.

---

## Priority Order

| Priority | Ticket | Who |
|----------|--------|-----|
| 1 | F01 — Form backend | Axelle / Ian |
| 2 | F02 — Logo | Ian |
| 3 | F04 — FAQ answers | Anyone |
| 4 | F05 — Buyer blocks | Anyone |
| 5 | F07 — Certification wording | Anyone |
| 6 | F08 — About page copy | Anyone |
| 7 | F03 — Homepage restructure | Axelle |
| 8 | F06 — Differentiator section | Anyone |
| 9 | F09 — TTS in collections | Ian |
| 10 | F10 — Where to Buy | Anyone |
| 11 | F11 — Cross-browser | All — last |

F01 and F02 tonight. F04, F05, F07, F08 are copy edits — split between whoever is free. F03, F06, F09, F10 are build tasks for tomorrow morning. F11 is the final check before the meeting.
