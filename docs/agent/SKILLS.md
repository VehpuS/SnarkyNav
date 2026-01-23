# Agent Skills Library (Recipes)

These are repeatable “how we do things here” patterns.

---

## Skill: Create a plan-only PR

**Goal:** Establish scope and verification before coding.

**Steps:**

1. Create `BRANCH_TODO.md` with sections:
   - Objective
   - Assumptions
   - Tasks (checkboxes)
   - Verification Plan
   - Unresolved
   - Side Effects Observed
2. Commit only the plan.

---

## Skill: Add a new sound event

**Goal:** Add a new snark event in a consistent way.

**Rules:**

- Edit `assets/sound_manifest.json`.
- Prefer adding prerecorded file(s). If none exist, add `fallback_text`.

**Checklist:**

- Event key name is uppercase with underscores (`MISSED_TURN_REPEATED`).
- `files` is an array (even if empty).
- `fallback_text` is an array of one or more strings.
- `intensity` is one of `low | medium | high`.

---

## Skill: Implement playback logic (manifest-first)

**Goal:** Always prefer prerecorded audio, then fall back to TTS.

**Expected behavior:**

- Load manifest once (or cache it safely).
- For a requested event:
  - if `files.length > 0`: choose one and play it
  - else: pick a fallback string and use TTS

**Guardrails:**

- Do not hardcode file paths; use manifest `base_path`.
- If an event key is missing, log a clear error and fail gracefully.

---

## Skill: RTL-safe layout

**Goal:** UI flips automatically.

**Rules:**

- Use `paddingStart`/`paddingEnd`, `marginStart`/`marginEnd`.
- Use `flexDirection: 'row'` with ordering that works for RTL by relying on `start` placement (or conditional swap if necessary).
- Use start-aligned text (`textAlign: 'left'` is forbidden).

---

## Skill: Theming tokens

**Goal:** Avoid hardcoded colors.

**Rules:**

- Use semantic tokens: `background`, `surface`, `primary`, `foreground`, etc.
- If using a utility system, map class names to tokens.
- Dark mode must swap tokens, not rewrite components.

---

## Skill: Add an atomic component

**Goal:** Ensure components are reusable and consistent.

**Checklist:**

- Strong TS props (no `any`).
- RTL-safe spacing.
- Uses theme tokens.
- Includes a minimal usage example in the PR description.

---

## Skill: Snarky naming without chaos

**Goal:** Keep humor in code while staying maintainable.

**Guidelines:**

- Snark in variable names is OK when the meaning stays precise.
- Avoid jokes in public API names unless explicitly desired.
- Keep user-facing copy in manifest strings or centralized text modules.
