# Handoff to Hamza — fortune. / PowerHouse Network prototype (Oct 14, 2026)

This repo is the complete working package. Clone it, open `index.html` over a local HTTP server, and you have exactly what is live. Paste this file into your Claude session as the starting context.

## 1. What is where

| Path | What it is |
|---|---|
| `index.html` | The prototype. It is a **Claude Design component** (`*.dc.html`): one HTML file with `<x-dc>` templates and a `<script data-dc-script>` React-style class. Same bytes as `PowerHouse Network v8.dc.html`. |
| `PowerHouse Network v8.dc.html` | Same file under its working name (edit this one, copy to `index.html` to deploy). |
| `support.js` | The DC runtime (React 18 UMD + Babel from jsdelivr). Required beside the .dc.html. Do not edit. |
| `WorkQueue.dc.html`, `Onboarding.dc.html` | Child components imported by the Expert / Partner products (`<dc-import>`). |
| `fonts/` | Geist Pixel Line (landing headline) and Manrope. |
| `architecture.html` | Workflows / architecture doc v0.5 (bundled HTML; the data is JSON inside `<script type="__bundler/template">`). |
| `docs/CHANGES_v8.md` | **Every change and the reason, items 1–46.** Items 36–46 are the fortune. era (Oct 13–14). Read this first. |
| `docs/DESIGN_DIRECTION.md` | The v7 visual system for the four product apps (still valid inside the apps). |
| `docs/WORKING_RULES.md` | The working rules we used (small iterations, no redesigns of the four apps). |

Live: https://muhammadzulkifle.github.io/powerhouse-network-prototype/ (GitHub Pages from this repo, `main` branch, root).
Shayan's copy mock we align to: https://fortune-business.shayanjnafisi.chatgpt.site/ and `/how-it-works`.

## 2. Run it

```bash
git clone https://github.com/MuhammadZulkifle/powerhouse-network-prototype
cd powerhouse-network-prototype
python3 -m http.server 8765
# open http://127.0.0.1:8765/index.html   (file:// does not work: the runtime fetches the child components)
```

Props: the component opens on **Landing** by default (`startProduct` prop: Landing · End Customer · Business Partner · Expert · Labs).

## 3. How to edit safely (what worked)

- The file is ~750 KB on long lines. **Do not hand-edit in an editor.** Use a Python script with exact-string replacements and `assert h.count(old)==1` before writing, so a mismatch aborts before anything changes.
- After every edit: extract the script and syntax-check it, then copy to the served folder:
  ```python
  import re; h=open('PowerHouse Network v8.dc.html',encoding='utf-8').read()
  m=re.search(r'<script type="text/x-dc" data-dc-script[^>]*>(.*?)</script>',h,re.S)
  open('/tmp/dc.js','w').write(m.group(1))
  ```
  ```bash
  node --check /tmp/dc.js && cp "PowerHouse Network v8.dc.html" index.html
  ```
- Verify in a browser at 1440×900. Real typing is needed for inputs (synthetic input events do not reach React state); buttons can be clicked with `document.querySelector(...).click()`.
- Template rules (DC runtime): `<sc-if value="{{ expr }}" hint-placeholder-val="{{ true|false }}">`, `<sc-for list="{{ arr }}" as="x" hint-placeholder-count="n">`, `{{ x.field }}` interpolation, `onClick="{{ fn }}"`, `style-hover="..."`. There is **no negation** in `sc-if`: compute explicit booleans in the view model. Inside an `sc-for`, reference the loop item, not outer objects (attach what a row needs to the row).
- Identifiers in the render function must be unique (`chat` and `chip` already exist for the intake chat; the sign-up chat uses `sc` / `ichip`).
- Deploy: `git add -A && git commit && git push` → Pages updates in 1–2 min. The claude.ai artifacts are owned by Zulkifle's account; use Pages, or publish your own artifact.

## 4. How the prototype is organised

**State** (`state={...}` in the class): `product` (landing | customer | partner | expert | labs), `lp` (landing page state: `page`, `sel`, `filter`, `signin`, `chosen`, …), `signedIn`, the four product states (customer intake chat, partner console, expert workbench, labs), plus:
- `inst` — the **self-serve Upwork partner chat** (fields: goal, name, nameTyped, email, via, code, verified, platform, profileUrl, ext, login, upwork, profileOk, target, targetSet, data, jobs, done, installed…). `instStageOf(IN)` derives the current stage: goal → name → email → verify → profile → hold | ext → login → connect → confirm → target → data → jobs → done. Persisted to `localStorage['fortune.chat']` (`instPersist` / `instRestore`), restored on mount ("Welcome back · continue your chat").
- `onbX`, `onbL`, `onbC`, `onbP` — expert, lab, customer, partner-application sign-ups. Each has `d` (answers), `qi` (current question index), `ask` (draft text), `done`.

**Landing pages** (`lp.page`): `home`, `how`, `stories`, `network` (earnings details), `customers` (partner marketplace), `partners`, `experts`, `labs`, `onb-install` (partner chat), `onb-expert` / `onb-labs` / `onb-customer` / `onb-partner` (sign-up chats). Nav = logo · "How it works ↗" · Sign in. Footer carries the other links; hidden on chat pages (`lpFooter`).

**The chat engine** (one template, two view models):
- Template: the block starting `<sc-if value="{{ sc.isOpen }}">`. Renders `sc.msgs` (agent / user bubbles; agent messages carry card flags: `isProfile`, `isCredit`, `isPlan`, `isJobs`, `isInstall`, `isDone`, `isOpts`, `isQual`, `isToggles`, `isSummary`, `isOnbDone`, `isWait`), inline `actions` on the last agent message, the composer `sc.c` (`open` text input or `locked` bar with `lockText`), the phase pills `sc.phases` (clickable; each agent row has `data-chat-phase`), and the right panel `sc.panel` (proposals to approve / sent).
- `inst` view model (partner chat): builds `msgs` from the `inst` state, stage table `ST` gives actions / lock text / placeholder per stage.
- `onbChat` view model (the four sign-ups): flattens the wizard definitions `STEPS` (unchanged from the form era: fields, chip groups, option cards, qualification task, toggles, review) into a question list `Q`; `ONB.qi` is the cursor. Required keys per audience in `REQ`; phases in `PHMAP` / `PHL`. Picks process directly (no Done); several answers can be typed with commas; single toggles are Yes / No; `agree` (expert guardrails) and `perms` (partner permissions) keep one confirm button.
- `const sc = lpInst ? inst : onbChat` is what the template reads.

**Sign-in pop-up** (`lpSign`): "I am" row (partner · customer · expert · labs) switches the account, the Google action and the sign-up button. Google sign-up prefills the account answers and opens the right chat.

**Workflow doc** (`architecture.html`): diagrams are `D{ d0, d0b, d0c, d1..d6 }` with nodes `[id,col,row,kind,label,{a,w}]` and edges `[from,to,label]`; sections, decisions, open questions (`OQ`, now 15). To edit: `json.loads` the template script, replace strings, `json.dumps` back with `</` → `<\/`.

## 5. Shayan's direction (Oct 13–14), in his words — all built

1. Brand **fortune.** (fortune.ceo). Black + gold, Geist Pixel Line headline, Manrope body. Landing simple; details behind links; one earnings number; a page, never a modal.
2. Home copy from his mock: "For Upwork businesses" · "Your expertise. A bigger business." · prompt "What's holding you back?" (More clients / More capacity / Both) · "On your computer. Directed from your phone or desktop." · three features.
3. **Onboarding is a chat, not a form.** Action buttons inside the chat; text input locked until the pending action is done. Order: goal → name → email (6-digit code or Google) → Upwork or LinkedIn profile link.
4. **Upwork only**; others: save name + email, "we come back to you".
5. **No "Connect Upwork"**: install the fortune Chrome extension → log in to Upwork if needed → profile read → "Is this right?".
6. **Credit** for strong profiles with the criteria shown (Top Rated+, 90%+ job success, $50k+ earned, 20+ jobs → $500).
7. Plan in chat: target + data choice (Private / Data partner). No hours question; no "how hands-on" question (chat must stay inside existing product logic).
8. **Proposals reviewed in a right panel** (the existing review component), not in the chat.
9. Phases About you · Your plan · Get to work.
10. **Track every incoming conversation; contact back if lost mid-chat.** Visitor side built (saved chat, welcome back). Internal screen not designed.
11. Review designs **one small piece at a time, with a master plan**.

## 6. Open for design

1. Internal **Incoming conversations** screen (who, goal, stage reached, last seen, one-tap re-contact). No internal product exists yet.
2. Shayan's "small UI improvements" pass on the chat (bubbles, action buttons, locked input, phase strip, right panel).
3. The desktop app / computer-use moment after the first win (today a button on the live screen).
4. How it works · Success stories · Fortune network pages polish.
5. Inside the apps: supply dashboard for investors; mobile pass; `Onboarding.dc.html` still v6 look.

## 7. Gotchas

- Build `shared`? No: this is a static prototype, no build step. Only the HTTP server matters.
- The customer intake chat (`chat`, `chip`) and the sign-up chat (`sc`, `ichip`) are different things.
- `startCustomer(partner, prefill)` and the Google paths set `qi` to skip answered account questions (3 for customer/lab, 2 for expert).
- The `data-onb-chip="true"` / `data-onb-card="true"` / `data-onb-knob` attributes drive selected states via CSS in the helmet.
- Loom transcripts, Slack history and the Oct 13 call digests are in Zulkifle's notes; ask him if you need the raw sources.
