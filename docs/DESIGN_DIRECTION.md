# PowerHouse — Visual Redesign Direction (v7)

Scope: visual + composition only. Product, flows, content, terminology, logic, navigation structure are LOCKED. Work on a copy: `PowerHouse Network v7.dc.html` (from v6). Keep every handler/state key; only restructure template markup and presentation values.

## Foundation (shared)
- Type: Inter (UI), JetBrains Mono (IDs, numbers, code). Scale: 11 / 12 / 13 / 14 / 16 / 20 / 28. Page title 28/600/-0.02em. Section title 14/600. Labels 11/600 uppercase .06em. Body 14/1.55. Metadata 12 secondary. Numbers tabular.
- Spacing: 4-pt grid — 4, 8, 12, 16, 24, 32, 48. Page gutters 32 desktop / 16 mobile.
- Radius: 6 controls, 8 panels, 999 only for status dots/tags.
- Elevation: none by default. Hairline 1px borders; one overlay shadow for drawers/modals only.
- Neutrals: ink #0B0D12, text #1F2430, secondary #5B6272, tertiary #8B91A0, line #E6E8EC, subtle bg #F7F8FA.
- Status: success #12805C, warning #B45309, danger #C2410C, info #2563EB — as 6px dot + text, never filled blocks.
- Fewer cards: sections separated by dividers + typography. Tables/lists instead of card grids. Side panels/drawers for detail.
- Motion: 140ms ease for color/border; 200ms for drawers. Buttons: hover, active, disabled, loading (spinner), success (✓) states.

## Product identities
- Customer — calm. Warm off-white #FAF8F4, accent deep green #1F5D4C. Max content width 760, generous whitespace, one primary action per screen, progress as a single clear timeline.
- Business Partner — operating console. Cool white, navy #13203A + teal #0F766E. Left rail nav; "Attention" inbox as the hero (table rows, inline actions); projects as a dense table; project detail = header + tabs + right context panel (customer, value, status).
- Expert — workbench. Dense, zinc neutrals, violet #6E56CF accent only for selection. Three-pane: left task/context/rubric, center AI output (largest, line-numbered, selection highlight), right findings/chat/evidence. Sticky review status bar.
- Labs — technical platform. Near-white with ink, blue #3B4BDB. Filters as a left facet panel with counts; packages as a data table (ID, capability, model, domain, failure modes, trajectories, κ, price); package page = identity header + spec sheet (key/value grid) + artifact matrix + preview + sticky purchase panel.

## Order of work (one product per turn)
1. Shared shell: top product switcher + per-product nav treatment.
2. Expert workbench + task lists.
3. Labs discovery + package page.
4. Business Partner today + project detail.
5. Customer chat + project panel.
6. Responsive + consistency pass, then rebuild export.


## v7 implementation notes (applied)
- Shell: 44px ink switcher (#0B0D12), underline tabs, mono "v7" tag. Each product owns its nav: Customer + Expert + Partner = 224px rail; Labs = 48px hairline header with underline tabs.
- Three-pane workbench pattern (Expert task, Independent review): sticky 56px status bar (back · eyebrow · title · meta) → left context (task, rubric, sources, trajectory) · center AI output (line-numbered, selection highlight, inline corrections) · right findings/investigation/rubric/decision (sticky, subtle bg). Collapses: ≤1280 left pane spans top as 2-col; ≤900 single column.
- Lists are tables: hairline rows, 11/600 uppercase column heads, mono tabular numbers right-aligned, status as 6px dot + text, actions as 32px buttons at row end. No cards.
- Status never fills blocks: dot + text, colored by TONE (success #12805C · warning #B45309 · danger #C2410C · info #2563EB).
- Buttons: 32px (36px primary in panels), radius 6, hover darkens; chips 28px radius 6; inputs 32px.
- Labs: facets left (sticky), packages as data table; package page = task statement as title + KPI row + spec sheet (key/value) + composition bars + artifact matrix + numbered preview (01–06) + samples + rights; sticky purchase panel right.
- Partner: left rail with quarter KPIs; Today = Attention list (exceptions w/ inline actions + customer needs) then Clients & projects table; project = sticky header with tabs + content + right context panel (customer, progress, conversation).
- Customer: warm #FAF8F4, green #1F5D4C, 760px column, hairline draft/results cards, progress timeline in the right panel.
- Responsive hooks: data-pane="three|two|left|right|facets|cust|cust-rail|cust-panel" + data-cols/data-col-head drive helmet media rules at 1280 / 1100 / 900.
