# BSC Phase 1 — Revision Tickets Implementation Plan

Fix all 11 tickets from Schaefer's May 8 feedback before Monday May 11, 17:30.

---

## Priority Order (per ticket doc)

| # | Ticket | Severity | Summary |
|---|--------|----------|---------|
| 1 | F01 | CRITICAL | Form backend — wire emails |
| 2 | F02 | HIGH | Replace logo & favicon |
| 3 | F04 | HIGH | FAQ answers on TTS page |
| 4 | F05 | HIGH | Buyer blocks expansion |
| 5 | F07 | HIGH | Certification wording fix |
| 6 | F08 | MEDIUM | About page copy cleanup |
| 7 | F03 | HIGH | Homepage restructure (5 sections) |
| 8 | F06 | HIGH | TTS differentiator section |
| 9 | F09 | MEDIUM | TTS in product collections |
| 10 | F10 | MEDIUM | Where to Buy polish |
| 11 | F11 | MEDIUM | Cross-browser check (last) |

---

## Open Questions

> [!IMPORTANT]
> **F01 — Email Service**: There is no email-sending backend currently in the project. We need an email delivery service. Options:
> 1. **Resend** (recommended) — free tier, simple API, works great with Next.js API routes
> 2. **Nodemailer + SMTP** — use BSC's existing SMTP credentials if available
> 3. **SendGrid / Mailgun** — alternative transactional email services
>
> **Which email service do you want to use?** If you have SMTP credentials for `info@bsundc.com`, we can use Nodemailer directly. Otherwise I'll set up Resend (just needs an API key from [resend.com](https://resend.com)).

> [!IMPORTANT]
> **F02 — Logo**: The ticket says to source the correct BSC logo from `bsundc.com` via DevTools. Currently the navbar/footer just render the text "BSC" in italic heading font — there is no image logo at all. I will:
> 1. Download the actual logo image from the live bsundc.com site
> 2. Replace the text "BSC" in header/footer with the proper `<Image>` component
> 3. Replace `/app/favicon.ico` with the correct favicon
>
> **Do you already have the logo file, or should I scrape it from bsundc.com?**

---

## Proposed Changes

### Component 1: F01 — Contact Form & Email Backend (CRITICAL)

> [!CAUTION]
> This is the single most important fix. The form is currently non-functional — all fields are disabled on the TTS page, and the contact page just sets `submitted=true` without sending anything.

#### [NEW] [route.ts](file:///Users/axelleroshlubi/Desktop/Projects/ffi/bscian/app/api/contact/route.ts)
- Create a Next.js API route at `/api/contact`
- Accept POST with JSON body: `{ enquiryType, firstName, lastName, company, email, phone, message, sourcePage }`
- Send **notification email** to `info@bsundc.com` containing all submission fields + timestamp
- Send **acknowledgment email** to the submitter:
  - Subject: `Enquiry received — BS&C Tap-to-Shower™`
  - Body: `"Thank you for your enquiry. We have received your message and will respond as soon as possible. — BS&C Team"`
- Return `200` on success, `500` on failure with error message

#### [MODIFY] [page.tsx](file:///Users/axelleroshlubi/Desktop/Projects/ffi/bscian/app/contact/page.tsx)
- Wire `handleSubmit` to POST to `/api/contact` with form data
- Add loading state while submission is in-flight
- Replace the "form delivery being finalised" holding message with nothing (remove it)
- On success: replace form with confirmation message: "Thank you for your enquiry. We have received your message and will respond as soon as possible."
- On error: show inline error message with retry option
- Remove the `disabled` note banner at top of form

#### [MODIFY] [page.tsx](file:///Users/axelleroshlubi/Desktop/Projects/ffi/bscian/app/tap-to-shower/page.tsx) (inquiry section, lines 397–496)
- Remove `disabled` attribute from all form fields
- Wire form to POST to `/api/contact` (same endpoint)
- Remove the holding-state message ("The online enquiry form is in finalisation...")
- Add `phone` field (required by ticket: "phone" must be included in notification)
- Implement success state: form replaced by confirmation message
- Add loading + error states

---

### Component 2: F02 — Logo & Favicon

#### [MODIFY] [Navbar.tsx](file:///Users/axelleroshlubi/Desktop/Projects/ffi/bscian/app/components/Navbar.tsx)
- Replace the text-only `<a>BSC</a>` logo (line 72–77) with an `<Image>` component using the correct BSC logo sourced from bsundc.com
- Ensure correct proportions and spacing

#### [MODIFY] [Footer.tsx](file:///Users/axelleroshlubi/Desktop/Projects/ffi/bscian/app/components/Footer.tsx)
- Replace the text-only `<Link>BSC</Link>` logo (line 20–25) with the proper BSC logo image (light/inverted version for dark footer background)

#### [MODIFY] [favicon.ico](file:///Users/axelleroshlubi/Desktop/Projects/ffi/bscian/app/favicon.ico)
- Replace with the correct BSC favicon sourced from bsundc.com

#### [NEW] Logo image files in `/public/images/`
- Save sourced logo files (SVG preferred, fallback to PNG)

---

### Component 3: F03 — Homepage Structure

#### [MODIFY] [page.tsx](file:///Users/axelleroshlubi/Desktop/Projects/ffi/bscian/app/page.tsx)

The current homepage structure is:
1. Flagship TTS product block (lines 74–252) 
2. Video Showcase (line 255)
3. Hero + 4-lane router (lines 299–483) ← this should be FIRrST
4. Proof block / stats (lines 491–555)

**Restructure to match Schaefer's required order:**

1. **Broad BSC hero** — Move the hero section (currently at lines 299–483) to the top. Update headline to: `"European Bathroom and Kitchen Solutions for Southeast Asian Markets"`. Update subheadline to: `"BSC develops, engineers, and supplies bathroom, kitchen, and retrofit shower solutions — designed in Germany and Denmark, produced through qualified partners in China."`
2. **Featured TTS innovation block** — Keep the flagship TTS product block (currently lines 74–252) as section 2
3. **Benefit cards** — Add new section with 4 cards: Easy Upgrade · Hot & Cold Control · Clean Installation · Value for Money
4. **Audience paths** — Keep the 4-lane buyer router cards (currently embedded in the hero section), pull them into their own section
5. **Featured collections area** — Uncomment and activate the hidden CollectionCarousel section (lines 266–297), ensuring TTS is included as an entry

---

### Component 4: F04 — TTS FAQ Answers

#### [MODIFY] [page.tsx](file:///Users/axelleroshlubi/Desktop/Projects/ffi/bscian/app/tap-to-shower/page.tsx) (FAQ section, lines 372–395)

Current state: Only 4 FAQ items with short answers. Ticket requires minimum 8 items from the Q&A document.

**Replace the entire FAQ data array with 10 items from the ticket:**

| # | Question | Source |
|---|----------|--------|
| 1 | What is Tap-to-Shower™? | Ticket |
| 2 | Does the tap itself heat the water? | Ticket |
| 3 | Which water heater can be used? | Ticket |
| 4 | Is any wall work required? | Ticket |
| 5 | Does installation need a plumber? | Ticket |
| 6 | What water pressure is required? | Ticket |
| 7 | What finishes are available? | Ticket |
| 8 | What warranty applies? | Ticket |
| 9 | Where can it be purchased in the Philippines? | Ticket |
| 10 | Can it be used for retail distribution or project supply? | Ticket |

The `FAQAccordion` component already works correctly — just needs the right data.

---

### Component 5: F05 — Buyer Blocks Expansion

#### [MODIFY] [page.tsx](file:///Users/axelleroshlubi/Desktop/Projects/ffi/bscian/app/tap-to-shower/page.tsx) (Who It's For section, lines 254–307)

Replace the current 4 buyer block objects (single `desc` paragraph each) with expanded versions containing:

- **Retailers / Distributors** → Headline: "Stock a Product That Explains Itself at the Shelf" + 3 bullet points
- **Developers / Builders** → Headline: "Specify Now. Let Buyers Upgrade Later." + 3 bullet points
- **Architects / Specifiers** → Headline: "No Need to Redraw Single-Line Bathroom Concepts" + 3 bullet points
- **End Consumers** → Headline: "Hot Shower Comfort Without Opening Your Wall" + 3 bullet points

Update the card rendering to display: headline → bullet list → CTA button. All B2B CTAs link to the lead capture form.

---

### Component 6: F06 — TTS Differentiator Section

#### [MODIFY] [page.tsx](file:///Users/axelleroshlubi/Desktop/Projects/ffi/bscian/app/tap-to-shower/page.tsx)

Add a new section **between** the Trust Signals section (lines 309–344) and the FAQ section (lines 372–395).

**Heading:** "Not Just a Heater. A Complete Shower Solution."

**Body:** "A standard instant water heater typically provides one outlet — usually a hand shower. Tap-to-Shower™ creates a more complete hot and cold shower solution: tap control, overhead shower, hand shower, and a cleaner visual result for single-line bathrooms. The difference is not the heat source. It is the shower experience it makes possible."

Style to match the existing editorial section pattern (SectionWrapper + Overline + heading + body text).

---

### Component 7: F07 — Certification Wording

> [!WARNING]
> Compliance risk flagged by Schaefer. The current wording implies the *full system* or *tap* is CB certified. Only the water heater is.

Files containing problematic "CB IEC 60335" references:

| File | Line | Current | Fix |
|------|------|---------|-----|
| `app/page.tsx` | 53 | `certMarks = ["CB IEC 60335", ...]` | Change to `"CB IEC 60335*"` with qualifier footnote, or remove entirely and add qualifier text |
| `app/page.tsx` | 445 | `"CB IEC 60335 certified."` | Replace with qualified wording |
| `app/tap-to-shower/page.tsx` | 211 | `"CB IEC 60335 Certified"` feature card | Change to `"CB Certified Heater*"` with qualifier |
| `app/tap-to-shower/page.tsx` | 278 | `"Specify a CB IEC 60335-certified shower system"` | Replace with qualified wording |
| `app/tap-to-shower/page.tsx` | 330 | Trust signal: `"CB IEC 60335 certified"` | Already has correct desc but title needs qualifier |
| `app/tap-to-shower/data.ts` | 225, 258, 290 | Product spec values | Add qualifier: these are in heater spec groups, which is correct context — but add "(water heater)" qualifier |

**All instances** will use the approved wording: "Compatible instant water heater models may be supplied with CB certification according to IEC 60335-2-35, subject to model and market."

---

### Component 8: F08 — About Page Copy

#### [MODIFY] [page.tsx](file:///Users/axelleroshlubi/Desktop/Projects/ffi/bscian/app/about/page.tsx)

**Flagged phrases found and their locations:**

| Phrase | Location | Action |
|--------|----------|--------|
| `"cutting-edge solutions"` | Line 88 (hero subtext) | Replace hero H1 + subtext |
| `"cutting-edge solutions"` | Line 136 (About BSC body) | Rewrite paragraph |
| `"Global Reach"` | Line 80 (hero H1) | Replace H1 |
| `"global reach"` | Line 158 (blockquote) | Rewrite blockquote |
| `"innovative"` | Line 275 (mission body) | Rewrite mission paragraph |
| `"Identification of Tomorrow's Trend"` | Line 265–267 (mission H2) | Replace section heading |

**Replacements:**

1. **Hero H1** (line 74–81): Replace `European Expertise, Global Reach` with `European Bathroom and Kitchen Product Development for Southeast Asian Markets`
2. **Hero subtext** (line 83–90): Replace with `"BSC develops, engineers, and supplies bathroom, kitchen, and retrofit shower solutions designed in Germany and Denmark and produced through qualified subcontracting partners in China."`
3. **About BSC body** (lines 132–141): Rewrite to remove "cutting-edge solutions"
4. **Blockquote** (lines 154–160): Replace "global reach" with factual statement
5. **Mission heading** (lines 261–268): Replace "Identification of Tomorrow's Trend" with grounded heading
6. **Mission body** (lines 270–280): Remove "innovative"

---

### Component 9: F09 — TTS in Collections

#### [MODIFY] [CollectionCarousel.tsx](file:///Users/axelleroshlubi/Desktop/Projects/ffi/bscian/app/components/CollectionCarousel.tsx)

TTS is actually already present in the carousel at line 38–45 with `href: "/tap-to-shower"`. However, the **Collections carousel is commented out/hidden on the homepage** (lines 266–297 in `app/page.tsx`).

**Actions:**
1. In the homepage restructure (F03), uncomment and activate the Collections section
2. Ensure TTS appears as the **first or featured entry** in the carousel — move it to index 0 in the `collections` array
3. Verify the collections index page (if one exists as a standalone page) also includes TTS

---

### Component 10: F10 — Where to Buy Polish

#### [MODIFY] [page.tsx](file:///Users/axelleroshlubi/Desktop/Projects/ffi/bscian/app/where-to-buy/page.tsx)

**Replace current content with Schaefer's approved copy:**

- **Heading:** `"Retail and Distribution Availability"` (replace "Where to Buy")
- **Body:** `"Retail and distribution availability across the Philippines is currently being prepared. For project, retail, or consumer purchasing enquiries, please contact BSC directly."`
- **Primary CTA:** `"Request Information"` → links to `/contact`
- **Secondary CTA:** `"Ask About Availability"` → links to `/contact`

Both CTAs link to the contact form (not `mailto:` links).

---

### Component 11: F11 — Cross-Browser Check

> [!NOTE]
> This should be done **last**, after all other tickets are closed.

**Manual browser testing checklist:**
- [ ] Chrome (desktop): Homepage, TTS page, Contact page
- [ ] Firefox (desktop): Homepage, TTS page, Contact page
- [ ] Edge (desktop): Homepage, TTS page, Contact page

**Items to verify per browser:**
1. Header alignment and logo display
2. Menu open/close behaviour
3. Section spacing
4. Font rendering (Calibri weight and size)
5. Button alignment and sizing
6. Image scaling
7. Text wrapping in narrow containers
8. Form layout and field sizing

**Potential fixes based on current CSS:**
- Calibri font may render differently across browsers — may need fallback tuning
- `backdrop-blur` not supported in all older Firefox versions — add fallback
- `appearance: none` on selects may need `-webkit-appearance` prefix

---

## Verification Plan

### Automated Tests
1. **Build check**: `npm run build` — must pass with zero errors
2. **Form E2E**: Use browser subagent to submit the contact form on both `/contact` and `/tap-to-shower#inquiry` and verify success state displays
3. **Codebase grep**: Search for all flagged phrases (`cutting-edge`, `global reach`, `innovative`, `seamless`, `revolutionary`, `world-class`, `identification of tomorrow's trend`) — must return zero results
4. **CB IEC grep**: Search for `CB IEC 60335` and `CB certified` — every instance must include the qualifier

### Manual Verification
1. Visual comparison of logo against bsundc.com
2. Homepage section order matches the 5-section structure
3. FAQ accordion opens/closes on mobile and desktop
4. Cross-browser check (Chrome, Firefox, Edge) — F11
5. Contact form end-to-end test: submit → notification to info@bsundc.com → acknowledgment to submitter
