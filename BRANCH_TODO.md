# BRANCH_TODO — Bootstrap SnarkyNav Infrastructure (Plan)

## Objective

Bootstrap SnarkyNav’s foundational infrastructure:

- Design system using NativeWind + CSS variables (light/dark) + RTL-safe atomic components.
- Audio engine using a manifest-first pattern (expo-av preferred, expo-speech fallback).
- Tooling script to generate missing audio assets from the manifest (OpenAI API; mocked initially).

## Definition of Done (Bootstrap PR)

This bootstrap work is “done” when all of the below are true:

- [ ] App boots on iOS + Android (`npm run start`).
- [ ] App boots on web (`npm run web`) and renders with theme tokens applied.
- [ ] Preflight checks pass:
  - [ ] `npx expo-doctor`
  - [ ] `npm run typecheck`
  - [ ] `npm test`
- [ ] Detox smoke suite passes on both platforms:
  - [ ] iOS simulator smoke
  - [ ] Android emulator smoke
- [ ] Sound manifest exists and AudioManager can trigger BOOT_UP (file playback or TTS fallback).
- [ ] Tooling script runs locally and updates the manifest (mock generation).
- [ ] Agent docs are updated for any new tooling (skills/policies) and `.github/copilot-instructions.md` remains links-only.

## Concrete bootstrap decisions (avoid bikeshedding mid-implementation)

### Repo structure

- Create `src/` and use this structure:
  - `src/ui/` (atomic UI components)
  - `src/screens/` (app screens, including a dev-only debug screen)
  - `src/audio/` (AudioManager + adapters)
  - `src/types/` (manifest types)
  - `src/lib/` (pure helpers)

### Audio asset paths

- Canonical audio directory: `assets/audio/`
- Manifest `base_path` points to `./assets/audio/`

### Secrets & tooling policy

- `tools/generate_audio.ts` must be safe to run without secrets.
- When real OpenAI TTS is added later:
  - Use `OPENAI_API_KEY` from local environment only.
  - Add `.env.example` (no real keys committed).
  - Never print secrets to logs.

### Debug UI hooks (for deterministic E2E)

- Add a dev-only screen (or clearly labeled dev-only section) that:
  - exposes a BOOT_UP trigger button with stable `testID`
  - displays a UI-visible “last event played” string so E2E can assert behavior without listening to audio

### CI expectations (planned)

- CI must run Stage 1 checks on every PR: unit tests + typecheck + expo-doctor.
- CI must run Detox smoke (iOS + Android) on every PR once Detox is wired.

## Current Repo Reality Check (as of now)

- Expo SDK: `~54.0.32`
- React Native: `0.81.5` (new architecture enabled)
- No existing `src/` folder yet.
- No styling system (NativeWind/Tailwind) installed yet.
- No audio dependencies (`expo-av`, `expo-speech`) installed yet.

## Assumptions (confirm or adjust)

- We will use **NativeWind v4** (or the Expo-compatible current stable) for RN styling.
- We will add these Expo modules:
  - `expo-av` for playing prerecorded files.
  - `expo-speech` for TTS fallback.
- We will keep theming token names semantic (background/surface/foreground/primary/etc.).
- We will keep audio assets under something like `assets/audio/` (manifest-controlled).
- The tool `tools/generate_audio.ts` can be run locally via `node`/`ts-node` (or `tsx`) and does not need to run on device.

## Testing Strategy (Automated)

We will add automated tests wherever it’s practical.

Planned approach:

- Use `jest` + `jest-expo` for unit tests.
- Keep core logic testable via pure functions:
  - event selection (choose file vs fallback text)
  - manifest validation / lookup
  - tooling: “find missing audio events” and “apply manifest update”
- For native modules (`expo-av`, `expo-speech`), wrap calls behind tiny adapters so Jest can mock them.
- UI tests will be minimal smoke tests (render + props) to avoid fragile snapshot/style assertions.

### E2E testing (extensive, stable)

We should also add **end-to-end tests that run the app** (not just unit tests) so we catch regressions in navigation/audio UX.

Framework (locked):

- **Detox + Expo Dev Client** as the primary E2E framework.
- Run E2E on **both iOS and Android**.
- **Maestro is deferred** (only re-evaluate later if we want an extra “fast smoke” layer).

Setup note:

- Detox adds non-trivial native build + CI complexity. Implement incrementally (smoke first).

Initial E2E scope (minimum):

- “App boots” smoke test.
- “Press BOOT_UP demo button” → verifies either audio playback path is attempted or TTS fallback path is invoked (via UI-visible state/labels).
- “RTL mode layout smoke” (at least verifies the app doesn’t render broken / overlapping).

E2E stability rules:

- Prefer test IDs (`testID`) and stable accessibility labels.
- Avoid timing-based assertions; prefer deterministic UI state.
- Keep E2E tests focused on critical flows, not pixel-perfect layouts.

CI rollout plan:

- Stage 1: run unit tests + typecheck + expo-doctor on every PR.
- Stage 2: run Detox **smoke suite** on both iOS + Android for every PR (must-pass).
- Stage 3: expand Detox coverage (navigation/audio regressions) and consider nightly full suite if PR runtime gets too long.

### Running the app as a test

This is covered by **Definition of Done (Bootstrap PR)** above.

Preflight commands we will ensure exist and stay green:

- `npm run start`
- `npm run web`
- `npx expo-doctor`
- `npm run typecheck`
- `npm test`

## Defaults (can be changed later)

- **Theme source:** Follow OS settings automatically (no in-app override in this bootstrap).
- **Manifest shape:** `fallback_text` is an **array of strings** (randomized pick).
- **Audio formats:** Standardize on **.mp3** for generated and recorded assets.
- **OpenAI TTS (when un-mocked):** Use `tts-1` with voice `nova` by default.

---

## Phase 1 — Design System (NativeWind)

### 1. Install + configure NativeWind

- [ ] Add required dependencies and config for **NativeWind v4** + Tailwind (use the official Expo setup).
- [ ] Ensure it works for iOS/Android and (if desired) web.
- [ ] Add test dependencies + config (`jest`, `jest-expo`).
- [ ] Add CI-friendly “preflight” scripts (doctor + typecheck) to reduce broken PRs.

**Expo Web support (decision):**

- Web is **supported from day one** for basic rendering + theme tokens (because `global.css` + CSS variables are part of the design). CI/E2E remains mobile-first.

**Developer experience (.vscode):**

- [ ] Add `.vscode/settings.json` with:
  - consistent formatting defaults
  - TypeScript SDK usage (workspace)
  - optional test runner integration
- [ ] Add `.vscode/extensions.json` recommended extensions (TypeScript, ESLint if added later, etc.).
- [ ] Add `.vscode/tasks.json` with common tasks:
  - `expo:start`
  - `test:unit`
  - `typecheck`
  - `e2e:detox` (and/or split `e2e:ios`, `e2e:android`)

**Planned files/config:**

- [ ] `tailwind.config.js` mapping semantic colors to CSS variables.
- [ ] `global.css` defining light/dark variables.
- [ ] `babel.config.js` / Metro config updates required by NativeWind (exact steps depend on NativeWind version).
- [ ] `app.json` adjustments if needed for web/CSS support.

**Acceptance criteria:**

- A simple component can use `className` and semantic tokens.
- Dark mode swaps tokens without touching component code.

**Tests (where feasible):**

- [ ] Jest config runs in CI/local (`npm test` or equivalent).

**Test commands (decision):**

- Standardize on `npm test` for Jest.
- Add `npm run typecheck` for `tsc --noEmit`.

### 2. Create theme tokens (CSS variables)

- [ ] Create `global.css` with `:root` variables.
- [ ] Add `@media (prefers-color-scheme: dark)` override.

**Proposed tokens (minimum):**

- `--color-background`
- `--color-surface`
- `--color-foreground`
- `--color-primary`
- `--color-on-primary`
- `--color-border`

### 3. Atomic components

Create a minimal reusable component layer under `src/ui/`.

- [ ] `src/ui/Screen.tsx`
  - Wraps `SafeAreaView`
  - Applies `bg-background`
  - Sets a safe default `StatusBar` style

- [ ] `src/ui/ThemedText.tsx`
  - Defaults to `text-foreground` and `text-start`
  - Supports `variant: 'h1' | 'body' | 'caption'`
  - RTL-safe: uses start alignment and no left/right spacing

- [ ] `src/ui/Button.tsx`
  - Variants: `solid | outline | ghost`
  - RTL-safe layout: icon at “start” (no hardcoded left/right)
  - Uses semantic colors (`bg-primary`, `text-on-primary`, etc.)

**Acceptance criteria:**

- App renders using `Screen` + `ThemedText` + `Button` without inline styles.
- No `left`/`right` directional usage in these components.

**Tests (where feasible):**

- [ ] `Screen` renders children.
- [ ] `ThemedText` renders variants (`h1`, `body`, `caption`) without crashing.
- [ ] `Button` renders label and handles disabled/press props (no runtime errors).

---

## Phase 2 — Audio Engine (Manifest Pattern)

### 4. Add manifest file

- [ ] Create `assets/sound_manifest.json` with a minimal schema and a sample `BOOT_UP` event.

**Acceptance criteria:**

- Manifest parses and includes:
  - `schema_version`
  - `base_path`
  - `events.BOOT_UP.files[]`
  - `events.BOOT_UP.fallback_text[]`

**Tests:**

- [ ] Manifest file can be loaded/parsed in a unit test.

### 5. Type-safe manifest types

- [ ] Create `src/types/SoundManifest.ts`
  - Defines the manifest shape
  - Defines `SoundEventKey` as a union of manifest keys
  - Exposes helpers for safe lookup

**Tests:**

- [ ] Lookup helper returns event for known key and `null`/throws predictably for missing key (whichever we choose).

**Open question:**

- Do we want to generate types automatically from JSON at build-time later? (Probably not yet.)

### 6. Create `AudioManager` singleton

- [ ] Add `expo-av` and `expo-speech` dependencies.
- [ ] Create `src/audio/AudioManager.ts` implementing:
  - `playEvent(eventKey: SoundEventKey): Promise<void>`
  - Loads manifest (with caching)
  - Chooses prerecorded file if present
  - Falls back to TTS if no files
  - Stops/cleans up sounds to avoid overlaps and leaks

**Implementation for testability:**

- [ ] Keep selection logic in pure helpers (e.g., `pickAudioFile`, `pickFallbackText`).
- [ ] Use adapters for `expo-av` / `expo-speech` so tests don’t require device APIs.

**Tests:**

- [ ] Event with `files` calls the AV adapter (and not TTS).
- [ ] Event without `files` calls the TTS adapter.
- [ ] Missing event key fails gracefully (no crash).

**E2E hooks:**

- [ ] Add stable `testID`s / accessibility labels to any UI used to trigger audio events.
- [ ] Provide a simple “Audio Debug / Boot Up” screen or button in dev builds for E2E.

**Behavior notes:**

- If `files.length > 0`: choose a file (random pick for now).
- Else: choose a fallback text (random pick for now) and call `expo-speech`.
- If event missing: log error and no-op.

**Acceptance criteria:**

- Calling `AudioManager.playEvent('BOOT_UP')` plays audio if file exists, otherwise speaks fallback.

---

## Phase 3 — Tooling (Audio Generation)

### 7. Add `tools/generate_audio.ts`

- [ ] Create a Node script that:
  - Reads `assets/sound_manifest.json`
  - Finds events where `files` is empty
  - Generates an mp3 for (one of) their fallback texts
  - Writes it to `assets/audio/`
  - Updates the manifest to include the newly created file

**Implementation for testability:**

- [ ] Put core logic in pure functions (e.g., `findEventsMissingAudio`, `applyGeneratedFileToManifest`).

**Tests:**

- [ ] Finds events with empty `files`.
- [ ] Adds generated filename to the correct event.
- [ ] Leaves events with existing files untouched.

**DevEx:**

- [ ] Add a documented npm script (e.g., `npm run tools:generate-audio`) so agents don’t guess how to run it.

### 8. Mock OpenAI TTS initially

- [ ] Implement generation via a mocked function first:
  - Write a **real, valid `.mp3`** (e.g., tiny silent MP3 buffer) so playback flows don’t break later.
  - Avoid `.txt` placeholders.

**Follow-up (future PR):**

- Add real OpenAI integration gated by env var `OPENAI_API_KEY`.
- Add documentation for setup.

**Acceptance criteria:**

- Running the tool updates the manifest and creates files in `assets/audio/`.

---

## Implementation Order (Commit Strategy)

1. NativeWind install + minimal config + one smoke screen.
2. `global.css` + `tailwind.config.js` token mapping.
3. Atomic UI components + update `App.tsx` to use them.
4. Add audio deps + manifest + types.
5. Implement `AudioManager` + hook BOOT_UP to a demo trigger.
6. Add `tools/generate_audio.ts` with mock generation.
7. Add Detox + Expo Dev Client + first smoke flows (iOS + Android).

## Verification Plan

This section is the step-by-step way to validate the **Definition of Done (Bootstrap PR)** above.

- [ ] `npm run start` (iOS/Android): confirm UI renders using NativeWind classes.
- [ ] Toggle system dark mode: confirm tokens swap without code changes.
- [ ] Force RTL (device setting): verify text + icon layouts still read correctly.
- [ ] Trigger `AudioManager.playEvent('BOOT_UP')` from a button press: verify file playback or TTS fallback.
- [ ] Run `node tools/generate_audio.ts` (or documented runner): verify manifest update + asset creation.
- [ ] Run tests (Jest): verify manifest/tooling/selection logic.
- [ ] Run Detox locally:
  - iOS simulator: app boots + BOOT_UP smoke
  - Android emulator: app boots + BOOT_UP smoke

## Documentation / Agent enablement (keep docs current)

When we add new tooling (NativeWind, Jest, Detox/Maestro, scripts), we must also update the agent docs so future agents don’t drift.

- [ ] Update `docs/agent/SKILLS.md`:
  - add “Skill: Add/maintain E2E tests”
  - add “Skill: Add testIDs/accessibility labels for stability”
  - add “Skill: Run preflight checks (doctor/typecheck/tests)”
- [ ] Update `docs/agent/DEVELOPMENT_POLICIES.md`:
  - define when E2E is required for a change (e.g., core audio/navigation flows)
  - set a standard for `testID` usage
- [ ] Keep `.github/copilot-instructions.md` links-only, but ensure it links to any new agent docs added.

## Side Effects Observed

- None yet.
