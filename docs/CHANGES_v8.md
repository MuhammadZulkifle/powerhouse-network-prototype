# PowerHouse Network — v8 changes (Oct 4, 2026, Zulkifle)

Built on v7. Scope: the five P0 conflicts between the prototype/diagrams and what was decided on the Oct 1–3 calls. Design system untouched; only template + presentation values + small view-model additions. Every v7 handler and state key is preserved.

## 1. Expert assignment (decided Oct 3: self-select + partner approval → lock)
- Business Partner · incoming request: "Recommended experts / Select expert" → "Qualified experts · you approve who starts". Explainer text; first expert shows "Picked up · awaiting approval"; button is "Approve to start"; confirmation "Approved · task locked to <name>". Delivery step renamed "Expert picked up & approved".
- Expert · Discover: subtitle rewritten; toggle "Matched to you · N" / "Browse all · N" (browse adds open-marketplace tasks outside the match with "Request task"); per-row "Not a fit for me" flag (hides the row, trains matching).
- Pick-up flow: task is "Held · awaiting partner approval" for ~9s (toast), then "Partner approved · the task is locked to you". Today queue shows "Awaiting partner approval" meanwhile.
- Today copy: "Work you picked up and were approved for, plus reviews".
- Architecture v0.3: 3A node "Auto-assigns task (top match) TBD" → "Expert picks up: matched pipeline or open market → partner approves · locks"; 5A node likewise; OQ-08 marked DECIDED; section 03 decision text updated.

## 2. Review level (decided: set by requester/partner, default by task type)
- Business Partner · incoming request: new "Review level" chips before the task split — Standard · Second opinion · Independent · Multiple solutions — with a one-line description and "Suggested for <type> work" hint. Stored per project (`reviewLevel`), default Legal/Finance = Second opinion, else Standard.
- Shown on the Expert task header ("Review level · …") and in the customer brief ("REVIEW" row). Partner overview chain includes "Review · <level>".
- Architecture v0.3: d1 "Extra review needed? Rule TBD" → "Review level above Standard?"; 5B "Human review required? Rule TBD" → "Review level? (set at accept)"; OQ-03/04 carry the Oct 3 direction.

## 3. Open peer review (resolves the assigned-vs-open conflict)
- Rail tab and titles: "Second review" → "Peer review". Rows: "Assigned · second review" → "Open for peer review · you qualify"; subtitle states the eligibility (review accuracy · accepted tasks) and the dispute path. Internal state keys unchanged.

## 4. Labs model comparison (Marcelo: "where my model scores < X", "where another model beats mine")
- Package table: "Levels" column → "Model scores · mine" (per-model rubric pass rate + your model, "trails by N" in red / "leads" in green). Levels moved to the domain line.
- Facets: "Model score" (Any / Below 30% / 50% / 70%, applied to the selected model or the weakest when All) and "Compare" (All packages / Where a model beats mine).
- Package page spec sheet: per-model scores + "Your model · nw-legal-7b … trails the best model by N pts — buy where you trail".

## 5. Completed-work import (Marcelo asked twice)
- Business Partner · Today: "Import completed work" button next to "Add existing customer". Modal: client, work name, sources (Drive · email · calls · upload), must-include (request · communications · accepted output), client opt-in toggle with opt-out warning.
- New "Completed work · data pipeline" section: Received → De-identified → Models run → Eligible → Packaged, with data earnings per row; a new import animates through the stages with toasts. Rail KPI "Data earnings".
- Architecture v0.3: d2 start node "Brings existing customer / project" → "Imports completed work (inputs · comms · output)"; section 02 decision text updated.

## Files
- `PowerHouse Network v8.dc.html` — current prototype (open this). Requires `WorkQueue.dc.html`, `Onboarding.dc.html`, `support.js` in the same folder.
- `architecture.html` — bundled architecture doc v0.3 (also saved as `incoming/PowerHouse Architecture v0.3.html`).
- `PowerHouse Network v7.dc.html` — Hamza's last version, reference only.

## Still open (unchanged from Hamza's list + audit)
Lab pricing (OQ-01/02), packaging eligibility rule (OQ-05), preview depth (OQ-06), match-score formula (OQ-07), IR selection (OQ-09), AI attempts (OQ-10), reward model (OQ-11). P1 items from the audit not done: rights tiers, deliverable exposure control, partnership options, expert trust strip, partner chooser, "wow" network opener, mobile, Onboarding restyle.

## 6. Real names (Oct 4, Zulkifle's request)
| Role | Placeholder (v7) | Now |
|---|---|---|
| End customer 1 | Northfield Systems · Daniel Reyes | Alvandi Law Group · Gill (owner, the logged-in customer) |
| End customer 2 | Atlas Freight · Jordan Lee | Berman Law Group · Khan |
| End customer 3 | Brightline Software · Sam Ortega | Ligori and Associates · Shalon |
| End customer 4 | Keel Logistics · Ana Ruiz | unchanged — no real name given (opted-out example) |
| Business partner (logged in) | Meridian Advisory · Maya Ortiz | Ned Partners · Ned |
| Other partners the customer can switch to | Ledgerline Finance · Tom Park / Harbor Legal Partners · Ines Duarte / Vantage Ops | Dustin Partners · Dustin / Jeremy Partners · Jeremy |
| Expert (logged in, also Independent Reviewer) | Sara Nazari | Zeerak |
| Expert pools (Legal · Finance · Operations) | 4 placeholder names per domain | Zeerak · Abdul Malik · Faraz (3 per domain) |
| Dispute parties | P. Menon vs T. Walsh / K. Ito vs D. Shah | Abdul Malik vs Faraz (both disputes; Zeerak is the uninvolved reviewer) |
| Auto-assigned independent reviewers | K. Adeyemi / M. Duarte / R. Iyer / J. Park | Faraz |
Vendor documents under review (e.g. "Brightline SaaS order form", "Halden Supply Agreement") are intentionally unchanged — they are contracts, not customers. Lab persona "Northwind Labs" unchanged.

## 7. Partner profile in the customer flow (Oct 4)
- "Your partner" panel (intake draft and project view) now has **View profile** next to **Change business**.
- Each alternative in the Change-business list has a **Profile** link.
- Profile modal: partner avatar/name/lead/fit/rating/review count/partner since; "Why PowerHouse matched <lead> to you"; stats (projects delivered, on-time, accepted first time, avg response, repeat clients); services; specialist network (Zeerak · Abdul Malik · Faraz); recent anonymized work; client quotes; accountability note; **Choose <partner>** when switching is allowed, or "Your current partner".
- Data lives in `PROFILE` (keyed by partner name) next to `BIZ`; state key `cProfile`.

## 8. Intake-first questioning (Oct 4) — AI asks everything before the scope can be approved
- Customer intake: when the AI drafts the project it also lists every missing detail (required + optional, generated by the same gap analysis the partner used) and asks them one at a time in the chat. Each answer updates the draft (criteria, requirements, deliverables, timing, scope) and is recorded.
- Draft panel: new "Before we finalize" checklist (answered · required · optional). **Approve scope & create project** is locked ("Answer N required questions to approve") until every required question is answered; typing "looks right" early gets the remaining list back.
- Created projects carry `clar` (the Q&A) and `intakeComplete`; the customer brief shows them under "Your answers".
- Business Partner: incoming requests now show **Intake complete · N questions answered by <customer> during intake** with the Q&A, and the old "More information may be needed" block becomes **Optional follow-ups** with nothing pre-selected. Queue tag becomes "Approval required" instead of "Missing information". Both seeded incoming requests (Berman handbook, Alvandi customer-contract review) carry intake answers.
- Architecture v0.3: d1 "Drafts scope" → "asks every missing detail (required · optional)", "Scope correct?" → "Scope correct & all required answered?", partner "Info missing?" → "Still unclear? (rare)"; d2 and 5A updated the same way; decision-point text updated for sections 01, 02, 05.

## 9. Branding aligned to powerhouse.so (Oct 4)
Source: https://www.powerhouse.so/ — near-black #0B0C10 shell, white #F7F7F8 text, warm gold (#C0A583 / #D8B586) and soft blue (#A2B1D5 / #AFC1E2) accents, Manrope headings, Inter body, monospace uppercase eyebrows, pill buttons, bolt-in-circle logo with the "PowerHouse" wordmark.
- Shell: bolt-in-circle logo + "PowerHouse" (Manrope) replaces "powerhouse."; active product underline is gold; product dots use gold/blue; tag reads v8.
- Palette mapping (app surfaces stay light for legibility): ink #0B0D12/#0E1726/#18181B/partner navy #13203A → #0B0C10; customer green #1F5D4C → gold text #8A6B3F (tints → #F6EFE4); partner teal #0F766E → brand blue #5B6FA3 (tints → #EEF1F8 / #F4F6FB); expert violet #6E56CF → gold #8A6B3F; labs blue #3B4BDB → #5B6FA3; info blue → #5B6FA3. Success/warning/danger unchanged.
- Eyebrow labels (e.g. "PowerHouse analysis", "Intake complete") in gold like the site's section labels.
- Typography: page titles (28/20px) in Manrope 500 with tighter tracking; body stays Inter; numbers stay JetBrains Mono.
- Shape: all buttons/chips are pills (999px); panels/modals 10px radius like the site's cards.
- Applied to the main prototype, WorkQueue and Onboarding components; architecture doc header now reads "PowerHouse · internal documentation".

## 10. Modern visual layer (Oct 4)
Implemented as a CSS layer in the prototype's helmet (selectors match the rendered inline styles) plus small template hooks, so Hamza's handlers and layout are untouched.
- Navigation icons (lucide, as CSS masks) on the Partner rail, Expert rail and Labs header via `data-nav` attributes.
- Depth: soft shadows on bordered panels and modals (14px radius), glass sticky headers (blur), gradient-tinted rails, radial brand glow behind each product's landing area (gold for Customer/Expert, blue for Partner), gradient avatars.
- Dark Labs header (gradient #0B0C10→#15161C, gold active underline, dark search field) echoing powerhouse.so; the Labs catalog stays light for data legibility.
- Primary buttons: subtle vertical gradients with inset highlight for ink, gold and blue; hover lift on all buttons; example-prompt cards lift on hover.
- Typography: page titles 32px Manrope; the intake headline is a 42px gradient (ink → gold) hero.
- Motion: 350ms fade/slide-in when a product screen mounts; WorkQueue rows nudge on hover; pill toasts with deeper shadow.

## 11. Customer rail: "Your business partners" (Oct 4)
- Rail section renamed from "Your businesses" to **Your business partners**; each partner row is clickable (shows "N active · M past").
- Clicking opens the partner profile, which now starts with **Your work with <partner>**: ongoing projects (status, price, parts done), past projects, and ongoing services with that partner. Each project row opens that project. Below it: the profile details (why matched, stats, services, specialist network, anonymized recent work, client quotes).

## 12. More business partners for the customer (Oct 4)
Alvandi Law Group now works with all three partners: Ned Partners (existing projects), Dustin Partners (Q3 cash reconciliation · complete; Monthly bookkeeping close · active), Jeremy Partners (Renewal notice tracking setup · complete, referred by Ned; Intake routing automation · active). Ongoing services now list one per partner. Ned's partner console still shows only Ned's projects.

## 13. Recurring services as a real concept (Oct 4)
- Customer rail: "Ongoing services" → **Recurring services**; each row shows status dot, partner, cadence and next run, and is clickable.
- Service detail: recurring-service header (Active/Paused, cadence, next run, since), price per run, runs completed, review level, delivering partner (click → partner profile), "What happens each run" (4 numbered steps), what's included, run history (date · volume · result · invoice), actions: Pause/Resume (live), Change cadence, Request a change.
- Data: `SERVICES` (Monthly invoice categorization · Ned; Monthly bookkeeping close · Dustin; Renewal notice alerts · Jeremy; Weekly ad performance report · Ned for Berman).
- Business Partner console: new **Recurring services** table (service, customer, last run, next run, price, View) above the data pipeline; View opens the same detail.

## 14. Partner "This quarter" KPIs are clickable (Oct 4)
Each rail KPI opens a detail view (period Jul 1 – Oct 4): **Customers** (source, active/done projects, revenue, last activity; channel mix), **Active projects** (progress, value, due, next step → opens the project), **Completed** (16 deliveries with acceptance; monthly counts → opens seeded projects), **Revenue** (by month, projects vs recurring; by source; paid/awaiting/scheduled), **Profit** (revenue − execution − platform fee; margin by type; your time), **Data earnings** (packaged work, package, sales, your 15% share), **On-time delivery** (by month, late reason, promised vs actual lead time).

## 15. Expert side: everything clickable (Oct 4)
- Rail: Zeerak's profile row (skills with tasks/accuracy/earnings, verification, availability) and the Paid / Pending / Accepted / Tasks stats.
- Discover: each "Matched on" skill opens a skill detail (tasks, accuracy, earned, open matches, recent tasks); "Available 20 hrs/wk" opens an availability picker that updates matching.
- Earnings & reputation: all nine tiles open details (payouts by month and type, pending by task → opens task, acceptance by month, completed by domain/level, revisions, disputes, peer-reviewed findings, successful challenges, review accuracy trend); the reputation card explains tiers and what's next; payout-history rows open the task or the payout detail.
- Shares the generic drill-down modal with the partner KPIs (gold accent for the expert).

## 16. Part / task detail on customer and partner sides (Oct 4)
- Customer › project › Parts: every part opens a detail — status and ETA, review level, who is on it (de-identified specialist), a 7-step progress timeline (Queued → AI first pass → Specialist review → Second opinion/Quality check → Final checks → Delivered → Accepted), acceptance criteria with pass marks, and the result once delivered (or a preview if the partner shared one; otherwise an explicit "appears when delivered" note). Actions: Ask about this part (prefills chat), Request a change (after delivery).
- Partner › project › Tasks: task names open the full detail — expert, task kind/level/effort, expert pay, the same timeline and criteria, AI first pass, expert corrections (struck line → fix, reason, confidence), peer-review verdict, independent-review decisions, final output. Actions: Share preview with customer (controls what the customer sees before acceptance), Escalate to independent review, Send back for another pass (puts the task into revision).

## 17. Landing page + end-customer marketplace (public entry)

- The prototype now opens on a **landing page** that replicates powerhouse.so (dark `#0B0C10`, Manrope/Inter, gold eyebrows, pill buttons, bolt logo). It is a fifth product state (`product:'landing'`) and the `startProduct` prop default.
- Nav: logo (home) · Product · For businesses · For partners · For experts · For AI labs · **Sign in** · **Discuss a data pilot**. The nav is the missing piece from the live site, which has no navigation.
- Hero ("Real work gets done. Better AI gets built."), network stats strip, **four doors** (For businesses / business partners / experts / AI labs), the site's "Inside a data package" and "Our sourcing advantage" sections, footer.
- **End-customer door → public marketplace** (`lp.page:'customers'`): partner cards built from `BIZ` + `PROFILE` (lead, fit, rating, reviews, since, services, 3 KPIs), service filters with keyword matching (`FKEY`), "View profile" and "Work with <lead>". A match-me card for customers who do not want to pick.
- **Public partner profile page**: why-pick line, 5 KPIs, services, specialist network, anonymized recent work, client quotes, two "Work with" CTAs.
- **Mock sign-in modal** (Google or work email, prefilled per door). Submitting lands in the right app; a chosen partner is deep-linked into the customer intake (`intakeBiz`, `fromMarket`) and shown in the empty draft panel as "Your partner · chosen on the marketplace" with View profile / Browse partners. Plain sign-in shows "auto-matched" instead.
- App header: logo and a new **← Site** button return to the landing. Modal state is cleared on the way in and out.
- Partner / expert / labs doors currently open the sign-in straight away (their marketplaces are the next step).

## 18. Business-partner door (public page + open-request marketplace)

- "For partners" in the nav and the second landing door open a **partner page** (`lp.page:'partners'`): hero "Serve more customers with less work." with a worked example of one project's split (customer pays $4,800 → partner 30% $1,440 → execution $2,400 → PowerHouse $960), "How partners earn" (own the relationship · PowerHouse runs execution · completed work pays twice), the **open-request marketplace**, partner stories, a 5-step "How it works" (Apply → Onboard → Receive requests → Approve & deliver → Get paid) and an "Already a partner?" sign-in card.
- **Open customer requests** come from a new `LEADS` constant: six de-identified requests (type, customer blurb, brief, requirements, volume, customer price, partner share, timing, posted, tags, recurring flag) with filters by Legal / Finance / Operations / Marketing / Recurring. Identities are revealed only after a claim.
- **Claim this request → sign-in as Ned → console.** `claimLead()` creates a `submitted` project for Ned Partners with the real customer revealed (e.g. Ligori and Associates · Shalon), source "PowerHouse lead · claimed on the marketplace", intake answers seeded, and opens it in the partner drawer on Today. The claimed request disappears from the marketplace.
- Partner stories reuse the public profile page; in the partner context its back link and CTAs read "← For partners" / "Become a partner like Ned →" / "Apply to join as a partner →".
- Sign-in modal: chip label switches to "Your request:" for partners; the note says the request will be waiting in the console.
- Fixed: the "For partners" nav key pointed at sign-in instead of the page.

## 19. Expert door (public page + open-task marketplace)

- "For experts" in the nav and the third landing door open an **expert page** (`lp.page:'experts'`): hero "Turn your judgment into income." with a "How a task pays" panel (typical task $40–$120 · peer review 50% of task pay · paid on client acceptance · weekly payouts), a 4-step "How it works" (Get matched → Pick up → Correct the AI → Get paid), the **open-task marketplace**, a reputation ladder (New expert → Verified → Trusted reviewer → Lead reviewer) and expert stories for Zeerak, Abdul Malik and Faraz.
- **Open tasks** are the real `open` tasks from the project data (name, kind, domain, difficulty, effort, pay, brief, first three project requirements, de-identification note, deadline, skills) plus the open-marketplace extras from `MKT`. Filters are built from the domains present. Real tasks show "Pick up this task →"; marketplace extras show "Request after sign-in →".
- **Pick up → sign-in as Zeerak → workbench.** `claimTask()` marks the task held for Zeerak (`expert:'me'`, `status:'review'`, `approval:'pending'`), opens it in the expert workbench under In progress with the "Held · awaiting partner approval" status, and the partner approves 9 seconds later with a toast, matching the in-app pickup flow. The task disappears from the public marketplace.
- Sign-in modal: chip reads "Your task: <name> · $<pay>" and the note says the task is held the moment you sign in.
- Fixed: the sign-in view model referenced the chosen task before it was computed (now resolved before the modal model is built).

## 20. AI labs door (public page + data catalog)

- "For AI labs" in the nav, the fourth landing door and both "Discuss a data pilot" CTAs lead to a **labs page** (`lp.page:'labs'`). It replicates the live site's lab-facing copy: hero "Expert-corrected data for the tasks your models still fail." + "Pilot training data from paid business workflows…", an "A paid pilot" panel (one domain · 2–4 weeks · 200–500 packaged tasks · failure + expert fix + verification test per task · priced per accepted example), "Why it matters" (failures you cannot scrape · fixes with reasons · tests that prove the fix), and "Rights & reproducibility" (client-permitted · de-identified · licensed not sold on · reproducible).
- **"See a data example"** anchors to a real sample from the Commercial contract reasoning package (`PKGS[0].samples[0]`), laid out as the site's four steps: Task + context → Model failure (output + trajectory) → Expert fix → Expected verification (rubric + second-expert critique), with the business outcome and provenance line.
- **Data catalog** (`lpPkgs`): one card per package with code, unit price, name, domain and levels, task line, artifact types, trajectories / expert-reviewed / failure cases / inter-expert agreement, frontier-model scores drawn as bars on the package's own rubric with "Best frontier model X% · experts Y%", the top failure modes, and "Request this package →". Filters are built from the package domains.
- **Request → sign-in as Northwind Labs → workspace.** Sign-in opens the chosen package in the Labs workspace (`lPage:'data'`, `pkgId`). If Northwind does not yet hold a licence the "Request access" modal opens pre-filled (`accessOpen`, `aMode:'Request access'`); if the package is already licensed the toast says so instead and the detail view shows the licence.
- Sign-in modal: chip reads "Your package: <name> · <code>".
- All four doors now have a public page and a deep link into their product. The nav keys map one-to-one to pages (home, customers, partners, experts, labs).

## 21. Workflows updated for the landing and marketplaces (architecture.html v0.4)

- New section **00 · Entry · Landing & marketplaces** with diagram **D-00** "Landing → marketplace → sign-in → product": one public-site lane feeding four participant lanes (customer · partner · expert · lab), each with browse → choose → sign-in → product landing, plus the principle note that everything before sign-in is public and de-identified. Decision points and prototype notes describe the four doors and deep links.
- **Open questions are now rendered.** The list existed in the data but had no markup; there is now an "Open questions" section at the end (13 cards with context bullets and section links) and each section shows its related OQ chips. Added to the table of contents.
- New OQ-12 (how much is public before sign-in) and OQ-13 (who may claim from the public marketplace). OQ-01 records the standard-vs-exclusive rights direction.
- P1 decisions added to the section decision lists: customer picks a partner on the marketplace or is auto-matched (§01); partnership option at onboarding and pre-acceptance exposure control (§02); expert trust guardrails (§03); rights tier at purchase (§04). Header bumped to v0.4.

## 22. Remaining P1 audit items built into the prototype

- **G6 · Lab rights tiers.** Purchase panel has a Rights selector: Standard ×1 · Exclusive window ×3 (90 days) · Exclusive ×10 (package retired from the catalog). Total and the discount line reflect the multiplier; the purchase toast names the tier.
- **G7 · Deliverable exposure control.** Partner Delivery tab: "What the customer sees before acceptance" — Summary only · Walkthrough · Full output (stored per project as `exposure`, default walkthrough). Customer Results: when a project is delivered but not yet accepted, outputs are clipped to a sentence (summary) or ~240 chars (walkthrough) with a lock note; full output unlocks on acceptance.
- **G8 · Partnership options.** Partner Permissions page gains "Your partnership": Sell completed work · Outsource overflow · Growth partnership, each with what it means and how it pays; a note explains the routing consequence. Data earnings already sit beside revenue in This quarter.
- **G9 · Expert trust strip.** Discover and Earnings show: never charged · paid on client acceptance · first 3 tasks guaranteed · new pickups pause while a task is unfinished · Reliability 98%.
- **G11 · Opener.** The landing is the opener; its stats strip is labelled "Network · live this week" with a pulsing live dot.
- Still open: a real fourth customer name for the Keel Logistics placeholder (not provided).

## 23. Business-partner sign-up (application wizard)

- "Apply to become a partner" (partner page hero and footer card) and a new "New to PowerHouse? Apply to become a partner →" link in the partner sign-in modal open a **9-step application** (`lp.page:'onb-partner'`). Sign-in as Ned is unchanged.
- **Required steps** set up matching: 01 Create your account (business, name, work email; magic link, no password) · 02 What you deliver (12 services, industries, location, team size, years) · 03 Your partnership (sell completed work / outsource overflow / growth) · 04 Capacity & service levels (projects per month, response time, default review level, recurring) · 08 Permissions & data (files, communications, names, data opt-in) · 09 Review & submit.
- **Optional, skippable steps** raise rank: 05 Your specialists (in-house domains + "use PowerHouse specialists") · 06 Track record (clients served, typical client, certifications, import completed work) · 07 Connect systems (Drive, HubSpot, QuickBooks, Slack). Each has "Skip for now"; the left rail marks them optional and lets you jump back.
- **Profile strength** (30% base, +services, +partnership, +capacity, +specialists, +track record, +systems, +data opt-in) updates live in the rail and maps to a **starting rank**: A first pick of marketplace requests · B standard routing · C listed after first accepted project. The review step lists which boosts are done.
- Continue is disabled with a toast until the step's required fields are filled; Review shows the full summary and the partner terms.
- **Done state**: "Welcome, <name>. Verification has started." with a timeline (magic link now · automated identity check today · business verification ~2 days · listed after verification), a live preview of the marketplace card, remaining rank boosts, and CTAs: See your card on the marketplace (the new business appears as "Pending verification", counted in the total) · Open your console (prototype signs in as Ned so a working account is visible) · Edit application.
- Architecture §00 records the sign-up vs sign-in decision and the required/optional split. Expert and lab sign-up flows are next.

## 24. Expert sign-up (application wizard with qualification task)

- The application wizard is now shared by partners and experts (`onbP` / `onbX` state, one template, per-audience steps and copy). "Apply to join as an expert" (expert page hero and footer card, landing "Apply to join"), and "New to PowerHouse? Apply to join as an expert →" in the expert sign-in modal open it (`lp.page:'onb-expert'`). Sign-in as Zeerak is unchanged; the nav Sign in button now opens the expert sign-in on expert pages.
- **Required steps** set up matching: 01 Create your account (name, email, location/time zone; magic link) · 02 Your expertise (domains, specialties, years, credentials) · 03 Availability (hours per week, working window, pickup-to-start commitment) · 04 **Qualification task** · 07 Payout & identity (payout method, country, ID check before first payout) · 08 How PowerHouse works for experts (the four guardrails as acknowledgements: never charged · paid on acceptance · pickups pause while unfinished · confidentiality) · 09 Review & submit.
- **Qualification task**: one real de-identified example (§9.2 liability cap vs. playbook with the §11 carve-out) and the AI's output; the applicant picks Correct / Incorrect-one-sided / Incorrect-amount and gets graded instantly with an explanation. Passing unlocks L1 in the first domain; a wrong answer can be changed.
- **Optional, skippable steps** raise level: 05 Work history & samples (portfolio, tasks elsewhere, reference, platforms) · 06 Preferences (work types, min pay, max concurrent, de-identified only).
- **Match score** (30% base + domains + experience + credential + availability + qualification + history + preferences) maps to a **starting level**: L2 with peer review from day one (≥80% and passed) · L1 verified · L1 after a second attempt.
- **Done state**: "Welcome, <name>. You are qualified." with a timeline (magic link · qualification graded · first pickup held until partner approves · ID check before first payout, weekly payouts), an expert-profile preview (level, hours, match), remaining boosts, and CTAs: See tasks matched to you (open tasks in the applicant's domains carry a "Matches your profile" badge) · Open your workbench (signs in as Zeerak) · Edit application.
- Architecture §00 records the expert pattern. Lab sign-up is next.

## 25. AI labs sign-up (pilot-request wizard)

- Every "Discuss a data pilot" CTA (nav, labs hero, labs footer card) and "New to PowerHouse? Start a data pilot →" in the labs sign-in modal open the labs wizard (`lp.page:'onb-labs'`, state `onbL`). Sign-in as Northwind Labs is unchanged (footer "Sign in", nav Sign in on labs pages, catalog "Request this package").
- **Required steps**: 01 Create your account (organization, name, work email, role) · 02 Your organization (type, team size on data, country, website) · 03 **Capability goals** (one-line goal, domains, artifacts, failure modes; the step note shows how many packages currently match) · 04 Intended use & compliance (training / evaluation / both / research, data residency, and the three licence terms as acknowledgements: no resale · no re-identification · deletion flows through) · 08 Verification (work-email domain, organization check, authorized-to-procure) · 09 Review & submit.
- **Optional, skippable steps**: 05 Pilot scope (budget, timeline, first-batch volume, rights preference) · 06 Your models (models to benchmark, own model, before/after eval) · 07 Procurement & security (card / PO / MSA, security review, NDA).
- **Pilot readiness** (30% base + domains + artifacts + failure modes + goal + use + pilot scope + models + procurement + verification) maps to: Pilot-ready · full samples and pricing unlocked (≥80) · Qualified · samples after email verification (≥60) · Exploring · catalog and one example only.
- **Done state**: "Welcome, <name>. Your pilot request is in." with the number of matched packages, a timeline (magic link · organization check · samples unlocked or NDA first · pilot call to scope the first batch within the stated budget), a lab-profile preview (use, matched packages, readiness), remaining boosts, and CTAs: See packages matched to your goals (catalog cards in the chosen domains carry a "Matches your goals" badge) · Open your workspace (signs in as Northwind; the typed capability goal is added to Capability goals and the workspace opens there) · Edit application.
- Fixed: the goal was only added once per application; the flag is now set only when a goal is actually added.
- All three sign-up flows (partner, expert, lab) now share one wizard component; architecture §00 records the lab pattern.

## 26. Minimal sign-up for the two buyer sides: AI labs (rewritten) and end customers (new)

- **Why**: labs and customers are the buyers; onboarding friction costs demand. Both flows are now **two steps** on the shared wizard (`minimal:true`): no profile-strength score, no optional steps; the rail shows "What unlocks" instead.
- **AI labs** (`onb-labs`): 01 Create your account (organization, name, work email) · 02 What should your model get better at? (domains required, optional one-line goal, intended use) → "Request samples →". Done: "Welcome, <name>. Samples are on their way." with matched-package count, timeline (magic link · one example per package open now · full samples after the link · 10-minute call for pricing and first batch), lab-profile card, CTAs to the badged catalog and the workspace (goal carried into Capability goals). Pilot scope, models to benchmark and procurement are explicitly deferred to the workspace.
- **End customers** (`onb-customer`, new): 01 Create your account (business, name, work email) · 02 What do you need done? (one line and/or service chips, timing) → "Meet your partner →". PowerHouse **pre-selects a partner** from the description/services (finance words → Dustin, renewal/automation/support → Jeremy, otherwise Ned) or keeps the partner chosen on the marketplace. Done: "Welcome, <name>. <Lead> will own your work." with the match reason, a timeline (account · partner matched · scope drafted when you send · work after approval, pay on acceptance), the partner's card and CTAs: "Describe your work →" (signs in with the partner pre-selected and the **description pre-filled in the intake chat**) · Browse all partners · Edit.
- Entry points: marketplace match-me card "Get started →"; "New to PowerHouse? Create your account →" in the customer sign-in modal (carries the chosen partner, reopens step two if the account is already filled). Partner and expert flows keep their full applications since their data drives matching and ranking.
- Architecture §00 records the minimal-buyer-flow decision.

## 27. End-customer sign-up made visible

- The customer flow from item 26 was reachable only via a small link under Sign in and the match-me card at the bottom of the marketplace. Added prominent entry points:
  - **Nav**: "Discuss a data pilot" replaced by a context-aware **Get started** button (Get started · Apply as a partner · Apply as an expert · Discuss a data pilot, depending on the page). Sign in stays beside it.
  - **Hero**: primary CTA is now "Get started · it takes two steps →" (customer sign-up); "Browse business partners" is secondary.
  - **Marketplace header**: "Get started · two steps →" with an "Already a customer? Sign in" line.
  - **Sign-in modal**: the sign-up link is now a full-width secondary button under a "new here?" divider, for all four audiences.
- Customer door card copy: "Get started or browse partners".

## 28. "Work with <partner>" goes through onboarding

- Marketplace "Work with Ned →", the public profile's "Work with Ned →" and "Get started with Ned · two steps →" now open the **two-step customer onboarding with that partner pre-selected** (step 1 note: "Your partner: Ned Partners · chosen on the marketplace"). No sign-in modal in between.
- The wizard rail carries an **"Already a customer? Sign in"** link (and the equivalent for partners, experts and labs) that opens the sign-in modal with the chosen partner kept.
- In the customer sign-in modal, the Google button reads **"Sign up with Google"** for new visitors: it fills the account step from the Google identity (prototype: Gill · Alvandi Law Group) and jumps straight to step 2 with the partner kept. For partners, experts and labs, and for signed-in customers, it stays "Continue with Google" and signs in.
- Sign-in submit logic extracted into one function (`lpSignSubmit`) so both the email and Google buttons share it.

## 29. Workflows updated for the onboarding flows (architecture.html)

- Section 00 gains two diagrams beside D-00:
  - **D-00B · Buyer sign-up · two steps (end customer · AI lab)**: Get started / Work with <partner> → account → what you need → decision "partner chosen on marketplace?" (Yes → keep; No → PowerHouse pre-selects from the description) → meets partner → intake chat with the description pre-filled. Lab lane: Discuss a data pilot → account → domains · goal · use → PowerHouse ranks packages and sends the verification link → samples on the way → decision "email domain verified?" (not yet → catalog + one example; yes → workspace with goal added and full samples). Note: magic link, no password; Google sign-up skips step one.
  - **D-00C · Supply application (business partner · expert)**: partner lane with required steps → decision "optional steps?" (complete → profile strength ↑, rank A/B; skip → rank C until first accepted project) → permissions · review · submit → identity check + ~2-day business verification → listed as pending, console open. Expert lane with required steps → graded qualification task → decision "correct?" (yes → L1 unlocked, optional history/preferences; no → change answer or second task by email, retry loop) → payout · identity · guardrails → match score → L1/L2, ID check before payout → matched pipeline open, first 3 tasks guaranteed.
- New decision points in §00: buyers vs supply depth; marketplace partner kept vs pre-selected; expert qualification outcomes; verification gates per audience. The sign-up/sign-in decision text now covers the in-wizard "Already a … ? Sign in" link and Google sign-up.
- New **OQ-14 · Verification and qualification policy** (what gates each audience, who performs it, retry limits, manual review, public visibility of a failed qualification, free-mail lab domains), linked from §00.

## 30. Deployed (base version)

- Prototype published as a private claude.ai artifact: https://claude.ai/artifact/Aa172rmpeEdG12kuBxfmDf (page `powerhouse-network.html` + `support.js`, `WorkQueue.dc.html`, `Onboarding.dc.html`). The deploy copy of `support.js` loads React, ReactDOM and Babel from cdn.jsdelivr.net instead of unpkg (same files, same SRI hashes) because the artifact host only allows jsdelivr/cdnjs scripts.
- Architecture doc published as a private artifact: https://claude.ai/artifact/7MHFRu87rH4d3tz2xhjBjG (self-contained bundle; React embedded).
- Both are private until shared from the page's Share menu. Deploy folder: scratchpad `deploy/`. Republish the same files to update the same URLs.

## 31. Logo mark corrected

- Replaced the generic lucide bolt-in-a-white-circle with PowerHouse's own split-bolt mark (the path from the product app's `newLogo.svg`, used in its login, signup, onboarding and side nav), drawn without a circle in the text colour. Applied to the landing nav, landing footer, sign-in modal and the in-app product switcher.

## 32. Public URL (GitHub Pages)

- Public site: https://muhammadzulkifle.github.io/powerhouse-network-prototype/ (prototype) and https://muhammadzulkifle.github.io/powerhouse-network-prototype/architecture.html (workflows). Source repo: https://github.com/MuhammadZulkifle/powerhouse-network-prototype (public, static files, Pages from main / root).
- The claude.ai artifacts remain as private copies. To update the public site: refresh `~/Documents/Powerhouse/Product/powerhouse-network-design/public-site/` from handoff-v8 (index.html = prototype, architecture.html, support.js with jsdelivr CDN, WorkQueue.dc.html, Onboarding.dc.html), commit and push to main.

## 33. Computer-use agent screen + coding example (Oct 13 direction)

- **Why**: Oct 13 calls (Morgan × Shayan; Update) dropped the legal plan and set coding as the first market (35% of lab data spend), with a self-serve computer-use agent on the freelancer's machine, experts guiding at stop points, and supply scalability as the investor proof point. Morgan asked to see the product and data examples.
- **Coding project** `p12` "Client intake booking app" (Alvandi Law Group · Ned Partners · Software · $3,400): four computer-use parts — Prevent double bookings (paused for an expert), Stripe webhook idempotency (agent working), Index the availability lookup (verified), Confirmation email (queued). Visible in the customer rail and partner console.
- **Agent session workbench** (expert, `data-screen-label="Expert agent session"`): header with machine, due, pay and status pill; left column task, requirements, acceptance, the agent's allow-list (may use / may not use) and "Captured for labs" (actions, screens, interventions, tests before → after, package); middle column a screen frame (VS Code / Terminal / Browser mock with coloured diff and test lines) and the **session timeline** (click any step to see its screen); right column **Your judgment**: stop card (paused at 08:12 after two failed attempts, agent's proposal) with three options — approve the mutex, use a database constraint, ask Ned.
  - Database constraint → agent resumes live (migration 0043, transaction + 409, 29/29 tests, PR #142) → "Submit · send PR #142 to Ned" → task verified, Submitted tab.
  - Mutex → passes in one process, fails with two instances → second stop that recommends the constraint.
  - Ask Ned → "Waiting for Ned" → reply after a few seconds ("schema change is fine") → back to the options.
- **Today queue**: agent tasks surface as "Agent paused · needs your judgment" (urgent, action Guide), "Agent working", "Waiting for Ned" or "Agent finished · ready to submit".
- **Partner console**: project overview shows a "PowerHouse agent on your MacBook" card with per-part status and the allow-list note; after submit it reads "PR #142 ready for your review".
- **Labs**: new first package **PH-CODE-WORKFLOWS · v1** (Software, 6,800 trajectories, screen recordings, GPT 38% · Claude 57% · Open-weights 24%, $6.00/example) with the double-booking sample as its real example; the public labs page's "See a data example" now shows the computer-use trajectory, the expert intervention and the rubric 1/5 → 5/5.
- Architecture: §03 and §05 record the computer-use stop-point model and that coding is the first package.

## 34. Self-serve partner install flow (default partner sign-up) + Upwork pipeline

- "Get started · install in minutes" is now the partner sign-up (partner page hero and footer card, nav Get started on partner pages, sign-in modal button, "Sign up with Google" which fills the account and jumps to step 2). The 9-step application stays for agencies ("Use the full application" link in the rail and on the partner page).
- **Four steps** (`lp.page:'onb-install'`, state `inst`): 01 Create your account (name, email) · 02 **Connect Upwork** (simulated OAuth → profile card: Jordan Comstock, Top Rated Plus, $85/hr, $142k earned, 98% JSS, 61 jobs, skills; "Starting rank A · Top Rated Plus + 98% job success") · 03 **Install the agent** (Download for macOS → downloading → opening → "Installed · connected"; allow-list of what it may / may not touch) · 04 **Approve first jobs** (five matched Upwork jobs with client, budget, match % and why; checkboxes; live "n selected · est. $ if all win"; revenue-share note 30% you · 70% execution) → "Approve & send proposals →".
- Each step gates Continue with a toast ("Connect Upwork first", "Install the agent first", "Pick at least one job"); the rail lists the four steps and "What unlocks".
- **Done**: "You are live, Jordan. 4 proposals sent." with the sent list and a timeline (sent now · replies < 24 h · on a win PowerHouse scopes · delivery on your machine, you keep 30%) → Open your console (signs in as Ned) / Start over.
- **Partner console Today** gains an **Upwork pipeline · agent on** card: matched today 14 · proposals sent (5 + the ones approved in the flow) · interviews 2 · won this month 3 · $9,400, plus "Matched this morning" rows with Proposal sent / Ready · approve to apply.
- Partner page "How it works" rewritten to the install steps. Architecture D-00C partner lane now shows the install flow with the agency branch; §00 decision text updated.

## 35. Landing page rewritten for the new direction

- **Hero**: eyebrow "The PowerHouse agent · now on your computer"; H1 "A business partner that makes you money."; sub explains connect Upwork → install → approve jobs → it wins and delivers on your computer with specialists behind it → you keep the clients and 30% → every accepted job becomes expert-verified training data. Three CTAs: Get started · install in minutes (partner install flow) · I need work done (customer two-step) · I buy data (labs two-step). Note: "Live with Upwork freelancers today · coding first · mid-size businesses next".
- **Supply · live this week** strip (the investor proof point): +38 partners joined, 1,900 proposals sent, 61 jobs won, 1,400+ tasks completed, 97% accepted first time, 6 packages for labs.
- New **How it works** (Connect Upwork · Install the agent · Approve the jobs it finds · Win, deliver, get paid) with a Get started CTA and the Upwork framing (6,000 jobs a day).
- New **The agent** section: "On your computer, not in the cloud" with three cards (works inside your limits · pauses for a specialist · every session becomes data) beside a recorded-session mock (failing test → paused for the specialist → 29 passed · PR #142).
- New **Meet the partners** stories with numbers: Jordan Comstock (+$9,400 this month), Ned ($13k → $38k MRR), Jeremy ($22k deal + $4k/mo in two weeks).
- Four doors re-copied for the direction (Hire a partner who delivers · A business partner that makes you money · Guide the agent, get paid · Coding data from real paid work).
- "Inside a data package" now narrates the computer-use version of the booking example; "Our sourcing advantage" became **Why labs buy from us** (real paid work · supply that compounds · coding first = 35% of lab data spend) with pilot and expert CTAs. Footer tagline updated.

## 36. Front page rebuilt as "fortune." (per Shayan's #fortune mock, Oct 14)

- **Brand**: landing nav and footer now read "fortune." (sparkle mark, mint period) with a small "by PowerHouse"; footer "Your ambition. Our execution. · © 2026 Fortune · fortune.ceo". The product apps keep the PowerHouse shell.
- **Palette**: landing region switched to Shayan's dark green (bg #0A1210, cards #0F1A16, borders #1F2E27, text #F3F7F5, muted #A7B8AF, mint accent #6EE7B7 / #34D399; primary buttons mint). Applies to the public pages, sign-in modal and sign-up wizards.
- **Hero** (copy from the mock): eyebrow "Your AI business partner"; H1 "Get the work done. / Build your fortune." (second line mint gradient); sub "Find more clients and get more work done. With an expert responsible for every action."; prompt box **"What's holding you back?"** with an arrow button and chips **More clients ↗ · More capacity ↗ · Both ↗**; note "On your computer. With you on your phone."
- **Self-serve links** under the prompt: Download for macOS · Connect Upwork · I need work done → · I buy data →.
- The prompt and chips start the **install flow with the goal captured**: the rail shows "You said: “more clients”. The agent will prioritise finding and winning new clients." (capacity / both variants).
- **Three features** from the mock: Find the right work · Make room for more · Build what you need.
- Sections beneath kept and re-voiced: "Self-serve from the first minute" (install steps), "The fortune agent", partner stories, four doors ("Choose how you work with us"), data example, why labs buy.
- **Referral** (Gail's question on bringing in Upwork freelancers): the install done page gains "Bring a freelancer, earn 5% of their first year" with a copyable fortune.ceo/j/<name> link.

## 37. Front page aligned to Shayan's live fortune site + "one earnings number"

- Shayan's feedback in #fortune (Oct 13 18:10 PDT): keep the landing simple, move details behind links, and replace the six-number strip with **one earnings number that opens the details**. His live site (fortune-business.shayanjnafisi.chatgpt.site) is black with a gold accent and a Geist Pixel Line headline.
- **Home now** = nav · hero · three features · a links row · footer. Hero: gold-dash eyebrow "Your AI business partner", pixel headline "Get the work done. / Build your fortune." (Geist Pixel Line and Manrope woff2 copied from Shayan's site into `fonts/`), sub, "What's holding you back?" prompt with white arrow, chips More clients · More capacity · Both, "On your computer. With you on your phone.", and **one live number**: "$184,300 earned by partners this week · See the details ↗".
- **Details modal**: the six network numbers (partners joined, proposals, wins, tasks, acceptance, packages), top earners this week (Jordan, Ned, Jeremy), CTAs Get started / Meet the partners.
- **Links row**: How it works · The agent · Partner stories · For businesses · For experts · For AI labs · Workflows (opens architecture.html).
- Palette reverted from green to the black + gold of Shayan's live site; brand mark white, no "by PowerHouse"; footer "fortune. Your ambition. Our execution. © 2026 Fortune".
- The self-serve install steps, "The fortune agent" session block and partner stories moved to the **For partners** page (top of the page, before "How partners earn"). Doors, data example and "why labs buy" are reachable from the nav/labs page.

## 38. Shayan's follow-up feedback (Oct 13, 18:13–18:16 PDT)

- **"this can go into `how it works` page"** → new **How it works** page (nav + home links row): the four self-serve steps and "The fortune agent" session block, ending in a "Tell us who you are" CTA. Removed from the partners page.
- **"this would be success stories"** → new **Success stories** page: the partner cards (Jordan, Ned, Jeremy) plus the six network numbers underneath. Nav is now: How it works · Success stories · For businesses · For partners · For experts · For AI labs.
- **"once user says who he is, we need to show onboarding page where we can ask them to identify themselves, plan together how we can help them, and execute the plan"** → the install flow is now **Identify · Plan · Execute** (three steps):
  1. Identify yourself: name, email, "Where does your work come from today?" (Upwork · Fiverr · My own clients / agency · Not freelancing yet); Upwork → Connect Upwork inline (profile, rank).
  2. Plan together: a week-by-week plan generated from the goal (more clients / more capacity / both: this week · days 2–7 · first win · month 1), adjustable with "hours per week" and "target this month" chips, a forecast line (proposals → interviews → win → pipeline value), and the first jobs the agent will apply to.
  3. Execute the plan: install the fortune agent (allow-list) and "Approve & send proposals" → live.
- **"for now, we only serve upwork businesses… we save your name and come back to you later"** → picking anything but Upwork shows the hold note and the button becomes "Save my name →"; the done screen reads "Thanks, <name>. We saved your name… we will come back to you at <email> when we are ready to collaborate with <Fiverr sellers / businesses with their own clients / people starting out>", with "I am on Upwork too →" to switch and a link to How it works.
- Sign in on the home, how-it-works and stories pages defaults to the partner audience, so "Sign up with Google" lands in this onboarding.

## 39. Onboarding as a chat, not a form (Shayan's Loom feedback, Oct 13 18:29–18:35 PDT)

- **"this should be done via chat. no forms. forms are pre ai"** → the Identify · Plan · Execute flow is now a conversation with the fortune agent (`onb-install` page). The three phases stay as a small progress strip at the top.
- **Order (Shayan)**: goal → name → email → **verify** (6-digit code typed into the chat, or **Continue with Google**) → **"Paste your Upwork or LinkedIn profile link"**. Google from the sign-in modal lands in the same chat with email already verified.
- **"we will only have upwork. if none upwork, get their info and tell them we will get back to them when ready"** → a LinkedIn link, any other link or "I don't have a profile yet" ends the chat with "I saved your name and email; we will write to <email> the moment we are ready for <LinkedIn profiles / people who are starting out>" plus "I am on Upwork too →".
- **Loom ("all of the chat has to happen here… action buttons have to be in the chat… block the text until they do it")** → every action is a button inside the agent's last message (Connect Upwork · Yes, that is me · hours · target · how hands-on · Looks good, execute · Add the Chrome extension / Download the desktop app · Approve & send · Open your console). While an action is pending the text input is replaced by a locked bar ("Connect Upwork above to continue", "Install fortune above to continue", …).
- **"here's the information we pulled from you, is it good?"** → after Connect Upwork the profile card asks "Is this right?" (Yes, that is me / Not me · connect another account).
- **"if profile is strong, show that you are approved for $X of credit to use for customer acquisition"** → strong profiles (rank A) get an "Approved · customer-acquisition credit · $500" card in the chat (covers the connects for ~60 proposals, first proposals at no cost, grows with wins).
- **"ask the product to message him when it finds jobs that match… let him apply, or approve the submission, or approve the connects"** → new question "How much should I do on my own?" with three modes: *Message me when a job matches · I apply myself* / *Draft the proposal · I approve each one before it goes* / *Apply on your own · I approve the connects budget*. The jobs list, the final button ("Turn on job alerts →" / "Approve & send N proposals →" / "Approve 40 connects a week & send →") and the live screen follow the mode.
- **"download the Chrome extension, install it, or install the product so we can use computer use"** → install step offers *Add the Chrome extension* (Upwork + browser) or *Download the desktop app* (computer use); allow-list and status shown in the chat.
- **"this is too busy, lets move them all to footer"** → the nav keeps only the logo, Sign in and Get started; How it works · The agent · Success stories · The network this week · For businesses · For partners · For experts · For AI labs · Workflows now live in the footer on every public page (hidden on the chat page). The links row under the hero is gone.
- **"dont use modal, show it in a page"** → the earnings number opens **The network this week** page (the six numbers, top earners, Get started / Success stories) instead of a modal.
- Workflows doc v0.5: D-00C partner lane redrawn as the chat (name/email/verify → Upwork or LinkedIn? → connect + confirm + credit → plan in chat → install/approve → live or job alerts; the "other" branch ends in "saved · we come back to you"); the sign-up decision text updated.

## 40. Copy aligned to Shayan's updated fortune site (Oct 13, 18:40 PDT) + footer trim

- Shayan: "I updated it" (fortune-business.shayanjnafisi.chatgpt.site). Home now carries his copy: eyebrow **For Upwork businesses**; headline **Your expertise. / A bigger business.**; sub "Fortune finds customers and gets the work done. You focus on the relationships and decisions that grow your business."; note "On your computer. Directed from your phone or desktop."; three features **Start with what already works. · Grow where you're stuck. · Stay the face of your business.** with his target / layers / person icons.
- Nav matches his: logo · "How it works ↗" · Sign in (Get started removed; the prompt is the call to action).
- **How it works** page rewritten to his version: "Your business. A new kind of partner.", "Starting with Upwork businesses", four steps (Start with your track record · Build a plan together · Put Fortune on your computer · Stay close. Let work move.), "A person behind every action", "Your work. Your data choice." (Private / Data partner), closing "Start where you are · What's holding you back? · Build your plan →".
- Chat phases renamed to his: **About you · Your plan · Get to work**. New last question in the plan: **data preference** (Data partner · preferred pricing and a data share / Private · keep my work out of data licensing); Private removes "data share on top" from the plan.
- Footer (Zulkifle): "The network this week" and "Workflows" removed. The network page stays reachable from the earnings number; architecture.html is linked from the repo README.

## 41. Chat phase pills are navigation

- "About you · Your plan · Get to work" at the top of the chat are now buttons: a reached phase scrolls the conversation back to where that phase starts; a phase not reached yet shows "Finish “About you” first · <what is pending>". Every agent message is tagged with its phase.
- Where Shayan's two channel ideas live in the chat: (1) **"message me when jobs match / approve each / approve connects"** = the question "How much should I do on my own?" (after hours and target), which changes the job list, the final button and the live screen; (2) **"approved for $X of credit"** = the gold "Approved · customer-acquisition credit · $500" card shown right after "Yes, that is me" for a strong (rank A) profile.

## 42. Shayan's review of the chat (Oct 14, 04:54–05:13 +03): extension + login, credit criteria, no hours / autonomy questions, proposals in a right panel

- "yes directionally this is right. small UI improvements are needed."
- **"we dont need connect with upwork, we need install extension and login. and if user is not logged in to their upwork, we ask them to login"** → after the Upwork link: *Add the fortune extension to Chrome* → "Extension installed." → "You are not logged in to Upwork in this browser" → *Log in to Upwork* → profile read → "Is this right?". The "Connect Upwork" button is gone.
- **"we need criteria based on what we approve them"** → the credit card now lists why the profile qualifies: Top Rated Plus (we need Top Rated or above), 98% job success (90%+), $142k earned ($50k+), 61 jobs (20+).
- **"not sure if this is required"** (hours per week) → the hours question is removed; the plan no longer depends on hours.
- **Loom "Aligning chat logic with existing storage"**: the "how much should I do on my own?" question is new logic with nowhere to store it, so it is removed; the chat stays inside the logic the product already has. (Approve-each-proposal is the behaviour.)
- **Loom "Reviewing and approving right panel components"**: the matched jobs moved out of the chat into a **right panel** ("Proposals to approve", tap to drop, forecast, *Approve & send N proposals →*). After approval the panel shows "Sent just now" and a link to the console. The chat's text input is locked with "Approve the proposals in the panel on the right to continue".
- Phases now: About you (goal · name · email/verify or Google · profile link · extension · login · confirm · credit) · Your plan (target · data choice · plan) · Get to work (live; the desktop app for computer use is offered from the live message).
- Workflows doc D-00C partner lane and the sign-up decision text updated accordingly.

## 43. Track incoming conversations and bring people back (Shayan, Oct 14 05:25 +03)

- "we also need to track all incoming users and convos and have a way to contact them back if we lose them mid convo."
- The chat is now **saved as it goes** (goal, name, email, stage reached) in the visitor's browser. Leaving and coming back shows **"Welcome back, <name> · continue your chat →"** under the hero prompt; clicking it restores the conversation exactly where it stopped. "Start over" clears it.
- Once the email is known the chat header says **"Conversation saved for <email> · if we lose you here, we email a link to pick up where you left off"**.
- Workflows doc: new open question **OQ-15 Incoming-conversation tracking and re-contact** (what we record and from which message, the internal "Incoming conversations" view with stage reached / last seen / one-tap re-contact, cadence and channel, consent wording) and the §00 sign-up text notes that every conversation is tracked from the first message.
- Not built (proposal): the internal **Incoming conversations** screen for the team. The prototype has no internal/ops product today; it would be a new screen listing every visitor who started a chat (name, email, stage reached, last seen, goal) with "Email a resume link" and "Mark contacted".

## 44. All sign-up flows are chats now (expert · AI lab · end customer · partner full application)

- Zulkifle: "change the rest of the flow form to chat also, same as we did for partners." The four wizards now run on the same chat engine as the self-serve partner chat: agent bubbles, one question at a time, action buttons inside the message, the text input locked until the pending action is done, phase pills that navigate, and the same done screens.
- The questions, data and outcomes are unchanged (the wizard definitions drive the chat): required questions must be answered, optional ones have a **Skip** button; chip groups are inline buttons (multi-select with **Done →**); the partnership choice is three option cards; the expert **qualification task** is a card in the chat, graded instantly with Continue / Change my answer; guardrails and permissions are toggle rows with **I agree →** / **Looks good →**; the review step is a summary card (profile strength, rank or level, boosts) with **Submit application →**; the done message carries the timeline and the profile / marketplace card with the same actions (Open your console · See your card · Start over).
- Phases per audience: expert About you · Qualify · Set up; partner About you · Capacity · Set up; AI lab About you · Your goals; customer About you · What you need.
- Google sign-up still skips the account questions (the chat starts at "What do you need done?"); "Work with Ned" opens the customer chat with Ned pre-selected.
- The form templates (rail, fields, step buttons) are removed; the footer is hidden on every chat page.

## 45. No "Done" buttons in the chats · a pick processes directly

- Zulkifle: "a lot of the chat options have done buttons, it should directly process."
- Multi-choice questions (services, industries, domains, specialties, credentials, platforms, certifications, work types): tapping a chip records it and moves to the next question. Several at once: type them separated by commas (e.g. "Contract review, Document review"); the text input stays open on every chip question.
- Single-toggle questions (PowerHouse specialists for the rest · import completed work · de-identified tasks only · ID check before payout) are a direct **Yes / No**.
- "Connect your systems" is a direct pick (Google Drive · HubSpot · QuickBooks · Slack · None yet), or several typed with commas.
- Only two consent steps keep one button: the expert guardrails (**I agree →**) and the partner permissions (**Looks good →**). Submit stays on the review card.

## 46. Sign-in pop-up asks who you are

- Zulkifle: the nav "Sign in" pop-up offers "Sign up with Google", but never asks whether you are a partner, a business, an expert or a lab.
- The pop-up is now **"Sign in or sign up"** with an **"I am"** row: *Upwork business · I need work done · Expert · AI lab*. The choice switches the sign-in account, the Google action and the sign-up button underneath.
- **Sign up with Google** now starts the right chat for every audience with the account answers filled in: Upwork business → the partner chat (name and email verified); I need work done → the customer chat (business, name, email); Expert → the expert chat (name, email; next question is location); AI lab → the lab chat (organization, name, email; next question is the capability goal).

## 47. Hero animations from Shayan's site

- Zulkifle: "Shayan's gpt site has animations, mine is missing that."
- Replicated from his page, same timings: two dashed **pixel curves** behind the hero (grey tracks; a gold trail travelling along one over 16 s, a silver trail in reverse on the other, offset by 8 s); the headline lines **wipe in** left to right (0.85 s, second line delayed 0.24 s, second line in his lighter grey); the sub-line, the prompt box and the earnings number **fade and scale in** (surface-enter, staggered 0.28 / 0.4 / 0.55 s); the prompt box and the chat composer get his **focus glow**. Respects `prefers-reduced-motion`.
