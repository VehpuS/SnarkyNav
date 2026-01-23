# SnarkyNav — Agent Guide (Source of Truth)

This repository is a React Native (Expo) navigation app with one job:

> **We do not provide "upcoming turn" guidance.** We provide **vocal feedback when the user makes mistakes** (missed turn, off route, speeding, GPS signal lost, etc.) — with a passive-aggressive/snarky personality.

If any product behavior is ambiguous, **do not assume**. Add clarifying questions in the PR description and/or the issue.

---

## 1) Core philosophy

- **Snarky, not unsafe.** Humor is welcome; distracting, harassing, or dangerous behaviors are not.
- **Mistake-first audio.** Emphasize events triggered by _user mistakes_ (or likely mistakes), not proactive coaching.
- **Audio-first.** Prefer prerecorded audio assets; only fall back to TTS when needed.
- **Small, testable changes.** Break work into minimal commits.

### Variable naming tone

Use playful/snarky naming where appropriate **without harming clarity**.
Examples:

- `userHasFailedNavigation` (instead of `offRoute`)
- `driverIgnoredMeAgainCount`
- `routeWasProbablyFine`

---

## 2) Mandatory workflow (Issues → Plan → PR → EAS Preview)

This repo is intended to be developed primarily from mobile/web, minimizing VS Code interaction.

### A. The Brief (Issue)

- The user writes an Issue describing _what_ to build.

### B. The Plan (first commit)

- Create `BRANCH_TODO.md` in the PR branch.
- **First commit is plan-only** (no feature code), containing:
  - scope
  - assumptions
  - implementation steps
  - verification steps
  - open questions

### C. Execution (iterative commits)

- Each commit is small and testable.
- After each commit, update `BRANCH_TODO.md` (remaining tasks, unresolved items).

### D. Verification (EAS + review)

- Goal: every PR can trigger an EAS Preview Update/Build so the user can scan a QR code and test.
- If CI/workflows aren’t set up yet, document the required secrets and commands in the PR.

---

## 3) PR reporting standard (required template)

Every PR description must include the exact template from:

- `.github/pull_request_template.md`

Do not improvise a different structure.

---

## 4) UI system requirements (future-proofed)

The app should be built with a reusable atomic component system.

### Theming & dark mode

- Prefer a semantic token system ("background", "surface", "primary", etc.).
- If using a utility-class system (e.g., NativeWind), ensure tokens map to semantic variables.
- Dark mode should be automatic (prefers-color-scheme) or system-driven.

### RTL compliance (strict)

- **Never** use Left/Right directional properties.
- Use logical properties exclusively:
  - spacing: `marginStart`/`marginEnd`, `paddingStart`/`paddingEnd`
  - alignment: `textAlign: 'left'` is forbidden; use start-aligned equivalents.
- Ensure icon + label layouts flip naturally when RTL is enabled.

### Atomic components (required targets)

Planned baseline components:

- `Screen` (SafeArea wrapper + status bar style)
- `ThemedText` (variants: `h1`, `body`, `caption`)
- `Button` (variants: `solid`, `outline`, `ghost`; RTL-safe icon placement)
- `Card` (surface container + subtle cross-platform shadow)

If the implementation approach requires adding a new styling library, **ask permission first**.

---

## 5) Sound system design (required)

### 5.1 Sound manifest is the source of truth

- Manifest path: `assets/sound_manifest.json`
- Rule: **always check the manifest before implementing new audio logic**.
- The manifest maps event identifiers → audio files (preferred) + fallback text(s) (TTS backup).

Recommended shape (adapt as needed):

- `schema_version`
- `base_path`
- `events.{EVENT_KEY}.files[]`
- `events.{EVENT_KEY}.fallback_text[]`
- `events.{EVENT_KEY}.intensity` (low/medium/high)

### 5.2 Playback behavior

- If `files` exist: pick one (random/weighted) and play it.
- Else: fall back to TTS using the provided fallback text(s).

### 5.3 TTS generation (offline asset generation)

- A script may generate MP3 files for events lacking prerecorded audio.
- Do not add/execute scripts that require new credentials/secrets without documenting setup.

---

## 6) Permissions & constraints (junior-dev rules)

Agents must:

- Ask before adding libraries or doing major refactors.
- Avoid commented-out code.
- Avoid fixing unrelated bugs (note them under “Side Effects Observed”).
- Prefer minimal diffs; keep style consistent.

---

## 7) Where to look next

- Copilot instructions: `.github/copilot-instructions.md`
- Development policies: `docs/agent/DEVELOPMENT_POLICIES.md`
- Skill recipes: `docs/agent/SKILLS.md`
- Issue template: `.github/ISSUE_TEMPLATE/feature_request.yml`
- PR template: `.github/pull_request_template.md`
