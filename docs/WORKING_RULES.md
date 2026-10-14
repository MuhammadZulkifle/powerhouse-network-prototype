# PowerHouse prototype — working rules

Source of truth: `PowerHouse Network v8.dc.html` (+ `WorkQueue.dc.html`, `Onboarding.dc.html`, `support.js`). See CHANGES_v8.md. Prototype is ~85% complete.

- No redesigns, no IA changes, no new major features/workflows, no removed functionality.
- Don't reinterpret requirements or assume product behavior not specified.
- Each user message = one small UI/UX iteration. Make the smallest change that accomplishes it, plus only tiny consistency tweaks. No unrelated improvements.
- Before changing: briefly state what exists, what's asked, the specific change. Then implement. Keep responses short.
- If ambiguous and a wrong guess could affect existing flows, ask one concise clarification question first.
- After edits, make sure buttons, navigation, modals, forms, back/cancel, progress states and mock data still work.
- Principle: same product, clearer experience. Prefer better labels/layout/hierarchy over new components.
- Four products are established (End Customer, Business Partner, Expert, Labs) — don't rethink them.
