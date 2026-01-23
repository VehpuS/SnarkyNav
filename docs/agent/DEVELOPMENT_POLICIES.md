# Development Policies (Agent-Enforced)

These are the constraints future agents must follow when working on SnarkyNav.

## 1) Project intent

- This is a React Native (Expo) app.
- Navigation voice output is **reactive**: callouts happen primarily when the user makes mistakes.

## 2) “Junior dev” operating mode

Agents must behave like a junior developer:

- Do not assume ambiguous business logic.
- Ask clarifying questions in the PR description when needed.
- Prefer incremental changes over “big bang” rewrites.

## 3) Approval gates

Ask for permission _before_:

- Adding any new dependency (JS/TS package) or replacing a major existing one.
- Introducing a new architecture pattern that touches many files.
- Making changes to build/CI (EAS/GitHub Actions) that could break releases.

## 4) No idle chatter rule

In PR conversations, every agent response must result in at least one of:

- code changes
- tests
- updates to `BRANCH_TODO.md`
- PR comments (when requested)

## 5) Audio-first policy

- **Always check** `assets/sound_manifest.json` before audio work.
- Prefer prerecorded assets.
- Use TTS only as fallback.

## 6) Snark style policy

- Use passive-aggressive/snarky tone.
- Keep it non-hateful, non-violent, and non-explicit.
- Avoid personal attacks (race, religion, disability, etc.).

## 7) RTL policy (strict)

- Never introduce “left/right” assumptions.
- Use logical properties and start/end alignment.

## 8) TODO and unfinished work

- Do not leave commented-out code.
- If blocked, add items to `BRANCH_TODO.md` under **Unresolved**.

## 9) Scope control

- If you find unrelated bugs, do not fix them.
- Note them in `BRANCH_TODO.md` (or the PR description) as **Side Effects Observed**.

## 10) Quality checks

- Prefer TypeScript types over `any`.
- Run the narrowest tests/commands available for the change.
- Avoid formatting unrelated files.
- Avoid unnecessary mocking/stubbing in tests - test real behavior where possible.
