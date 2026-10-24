# DCSCompanion — agent-ready outstanding work (25 October 2026)

**Canonical project:** [Parris-Tech-Services/DCSCompanion](https://github.com/Parris-Tech-Services/DCSCompanion), `main` baseline `ebc4cc1e1b77811525aebedb87c1200fdf351467`. **Portfolio audit job:** [`GRA-037`](https://github.com/Parris-Tech-Services/RepoClean/blob/antigravity-push/docs/GREPTILE_PORTFOLIO_REVIEW_QUEUE_2026-10-24.md). **Review:** [PR #2](https://github.com/Parris-Tech-Services/DCSCompanion/pull/2), branch `feat/msp-networking-reference`, exact reviewed head `5046eb8518af66e71ca8c3128a4ee227bb95eac7`, Greptile review **`35081981` COMPLETED** on 25 October 2026 (Sydney time), confidence **4/5**, **two P2 inline findings**, both initially unaddressed. Greptile reviewed the **four-file PR diff only**, not the entire repository.

**Existing work preservation:** No `AGENTS.md`, project-level TODO/checkpoint or existing `DCSC-GR` task IDs were found in the complete 163-entry default-branch tree. The existing `src/data/taskTracker.ts` is application data, **not** this engineering tracker; [issue #2](https://github.com/Parris-Tech-Services/DCSCompanion/issues/2) and its task/PR state remain unchanged. This document introduces unique `DCSC-GR-001`–`007` IDs without renumbering other repositories' tasks. Read README, docs, Firebase rules, and branch/PR status before claiming work. Do not reproduce any potentially sensitive school/customer information in tickets or test fixtures.

**First unclaimed task / triage order:** `DCSC-GR-001` (possible browser-exposed API credential) → `DCSC-GR-002` (public school-support content/privacy check) → `DCSC-GR-003` (missing ports) → `DCSC-GR-004` (missing tests) → `DCSC-GR-005`–`007` (acceptance and closure). The first two are **independent source-inspection risk leads**, **not Greptile PR findings** and **not verified breaches**. If another agent is already changing `feat/msp-networking-reference`, coordinate rather than overwrite their branch.

## Unique tasks (all remain OPEN)

- [ ] **DCSC-GR-001** [P1 / credential-exposure triage; independent baseline observation] Verify and remediate possible **client-bundled LLM API credentials**.
  - **Start/triage:** On `main` baseline inspect [`src/services/llmClient.ts:7–8,59–62`](https://github.com/Parris-Tech-Services/DCSCompanion/blob/main/src/services/llmClient.ts#L7-L8) and [`src/services/askDcs.ts:1–13`](https://github.com/Parris-Tech-Services/DCSCompanion/blob/main/src/services/askDcs.ts#L1-L13). Both read `import.meta.env.VITE_GROQ_API_KEY` and send it as a browser-side Bearer credential. The existing [`.github/workflows/deploy.yml`](https://github.com/Parris-Tech-Services/DCSCompanion/blob/main/.github/workflows/deploy.yml) injects `secrets.VITE_GROQ_API_KEY` into the Vite build, explicitly fails if unset, and deploys `dist` to public GitHub Pages from `main`. **A successful configured production build would embed that key in public client JavaScript**. Verify whether such a build/deployment actually succeeded without publishing or copying any token; if confirmed, treat as active secret exposure and escalate to P0/rotate urgently. Determine whether a live token has ever been bundled, its scope and any usage.
  - **Evidence:** Direct independent source inspection, **not** a finding from Greptile PR #2. No actual key value or exploitation was observed in this audit; severity is provisional pending deployment verification.
  - **Dependencies:** Owner authorisation to inspect deployed configuration; do not paste tokens into GitHub/LLM logs; check any other shared app clients before revocation.
  - **Proposed minimal fix:** Move authenticated provider calls behind a server-only, access-controlled endpoint with server-side quota/rate limiting; remove `VITE_*` secret use and browser Authorization headers; rotate/revoke only verified exposed credentials through provider controls.
  - **Tests/acceptance:** Source and built JS contain no private token or browser provider credential; authenticated/unauthenticated request tests, server-side abuse limits, happy-path and failure-path Ask DCS smoke; exact build SHA and deployment proof. Keep OPEN until exposure/absence and mitigation are evidenced.

- [ ] **DCSC-GR-002** [P1 / privacy-and-authorisation triage; independent baseline observation] Reconcile **public repository visibility** with README's assertion that this school-support repository is private, and review KB/LLM disclosure boundaries.
  - **Start/triage:** GitHub repository metadata currently reports **public**, while [README Security](https://github.com/Parris-Tech-Services/DCSCompanion/blob/main/README.md#security) says it is private. Inspect `src/data/dcsKnowledgeBase.ts`, `src/data/dcsKb.ts`, `src/pages/AskDcsLLM.tsx`, `src/services/askDcs.ts`, KB import/export and compiled bundles for real internal identifiers, private staff/student data, confidential network procedures and unintended external LLM context. Do not restate sensitive values in public tasks.
  - **Evidence:** Visibility/README mismatch independently verified; **no unauthorised disclosure or actual student/customer data breach established**. The PR adds shared networking content to the searchable KB; validate whether all its examples are fictional.
  - **Dependencies:** Appropriate school/data-owner review and authority; `DCSC-GR-001` for safe LLM proxy and logging.
  - **Proposed minimal fix:** Remove/de-identify unauthorised content from public source and client bundle, use access-controlled storage for private material, enforce approved content-to-LLM allowlist and correct misleading documentation. Do not assume simply making the repo private removes already published history.
  - **Tests/acceptance:** Approved content inventory, no unauthorised data in public Git/JS/KB export or external LLM payload, negative privacy tests and owner sign-off. Preserve safe generic educational examples.

- [ ] **DCSC-GR-003** [P2 / Greptile finding #1] Include a **compact common service/port reference** in the new Networking card.
  - **Start/triage:** Inspect [PR #2 comment `r4368628775`](https://github.com/Parris-Tech-Services/DCSCompanion/pull/2#discussion_r4368628775), [`src/data/networkingKb.ts:14–18`](https://github.com/Parris-Tech-Services/DCSCompanion/blob/feat/msp-networking-reference/src/data/networkingKb.ts#L14-L18), and the Common Ports curriculum's `sections` table at `src/data/networking/networkingCurriculum.ts:1034–1037`. **Validated:** the table exists in the curriculum but the generated summary includes only key terms, commands and mistakes; port mappings are omitted.
  - **Dependencies:** Check existing branch owner and `DCSC-GR-002` privacy review; change the original PR branch with permission, not this documentation branch.
  - **Proposed minimal fix:** For the common-ports module only, extract a short, accurate table/list from its structured curriculum `sections` rather than copying the whole lesson or hard-coding a second divergent list.
  - **Tests/acceptance:** The card and `getKbContext` contain representative secure service/port pairs; other nine cards retain expected summaries; verify mobile rendering and no accidental internal endpoint values. Link passing tests, reviewed commit and resolved original comment.

- [ ] **DCSC-GR-004** [P2 / Greptile finding #2] Add automated regression tests for all **ten networking cards** and Ask DCS retrieval.
  - **Start/triage:** Inspect [PR #2 comment `r4368628776`](https://github.com/Parris-Tech-Services/DCSCompanion/pull/2#discussion_r4368628776), `src/data/networkingKb.ts:7–10`, `src/data/dcsKnowledgeBase.ts:162–196` and the repository's test configuration. **Validated:** no `*.test.*`, `*.spec.*`, `__tests__`, Vitest/Jest/Playwright/Cypress files were found in the reviewed PR tree, and package scripts have no test command.
  - **Dependencies:** `DCSC-GR-003` for port-list expectations; coordinate any test runner introduction with project standards.
  - **Proposed minimal fix:** Introduce a minimal repeatable test harness and fixtures for ten unique IDs, Networking category, title/summary/tags, all expected source links, card expansion, retrieval ranking and `getKbContext` result content, plus negative tests for missing/duplicate cards.
  - **Tests/acceptance:** Test command runs locally and in CI, records exact exit codes and fails when a card is missing or port mappings disappear; add a browser-sized smoke check. Resolve Greptile comment only after proof.

- [ ] **DCSC-GR-005** [P2 / integration and release gate] Independently validate PR #2 on its actual source branch before any merge or deployment.
  - **Start/triage:** Check PR head SHA, branch ownership, README and `.github/workflows/deploy.yml`. PR text claims `tsc -b && vite build` passed, but this audit has **not** independently run it.
  - **Dependencies:** `DCSC-GR-001`–`004`; preserve existing data and avoid exposing school-specific context in test logs.
  - **Proposed minimal fix:** Fix only confirmed build, lint, retrieval, privacy and UI regressions; do not weaken quality checks.
  - **Tests/acceptance:** `npm ci`, `npm run build`, `npm run lint`, new test command and browser journeys for category/filter/expand/Ask DCS; record output, reviewed SHA, CI URL, and release/deploy status separately. Never claim production verified from a PR build.

- [ ] **DCSC-GR-006** [P2 / re-review and finding reconciliation] After verified fixes, re-run Greptile **once** on the updated PR head and reconcile the two original P2 comments.
  - **Start/triage:** Re-fetch [review `35081981`](https://github.com/Parris-Tech-Services/DCSCompanion/pull/2), check comments `r4368628775` and `r4368628776` and current SHA. No duplicate review on unchanged head.
  - **Dependencies:** `DCSC-GR-003`–`005`; provider permissions and review credits.
  - **Proposed minimal fix:** Address only demonstrated remaining defects and regression tests.
  - **Tests/acceptance:** Greptile completed follow-up run, original comments marked addressed only when proof exists, no new P0/P1, and current PR commit/test evidence captured.

- [ ] **DCSC-GR-007** [P2 / portfolio closeout] Reconcile DCSCompanion's task IDs, GitHub issue/PR and [RepoClean `GRA-037` queue](https://github.com/Parris-Tech-Services/RepoClean/blob/antigravity-push/docs/GREPTILE_PORTFOLIO_REVIEW_QUEUE_2026-10-24.md).
  - **Start/triage:** Re-read this committed tracker and its IDs, Greptile review ID/status, comments, GitHub PR branch and existing [issue #2](https://github.com/Parris-Tech-Services/DCSCompanion/issues/2). Keep all original issue/checklist states intact.
  - **Dependencies:** `DCSC-GR-001`–`006` for final closure; queue may be updated now to `TASKS_COMMITTED` without claiming repairs.
  - **Proposed minimal fix:** Record reviewed SHA, open priorities, code/test PR, CI and deploy evidence and next unclaimed task in central queue and issue.
  - **Tests/acceptance:** Exact IDs persist in canonical source, no duplicates, all source findings mapped to comments and evidence, and every checked box has full acceptance proof. Until then this item remains OPEN.

## Status checkpoint

- **Verified:** One Greptile review `35081981` COMPLETED for PR #2; **two distinct P2 comments** validated against the actual code; independent browser credential architecture and public/private documentation mismatch observed in `main`.
- **Not verified:** Whether any live secret was bundled, whether any private school/customer data is present, any code remediation, tests/CI, production deployment, Greptile follow-up, or data-owner authorisation.
- **Next agent:** Start with `DCSC-GR-001` and claim it explicitly; for PR #2 fixes follow `DCSC-GR-003` then `004` after privacy triage.
