---
description: Test a feature — spawns test-agent for full suite (jest-expo, lint, typecheck, expo export) + handoff checklist
---

Spawn the **test-agent** for feature: `$ARGUMENTS`

## Preconditions
- Verify `.claude/active-work/$ARGUMENTS/progress.md` exists. If not → "Run `/implement $ARGUMENTS` first."
- Verify the plan doc has checked-off tasks. If all tasks are unchecked → "Implementation doesn't appear complete. Run `/implement $ARGUMENTS` first."
- If `.claude/active-work/$ARGUMENTS/session-log.md` exists, include it in the agent prompt for context.

## Steps
1. Launch a test-agent: "Test feature '$ARGUMENTS'. Run jest-expo tests, lint, typecheck, and the `npx expo export` bundle check (plus pytest if packages/api exists). Walk the handoff checklist in the plan doc. Emit the manual Expo Go verification list for demo-critical flows. Write report to `.claude/active-work/$ARGUMENTS/`."
2. When agent returns:
   - **PASS:** Update STATUS.md: phase=`test-pass`, next=`/finalize $ARGUMENTS`. Suggest: "Tests passed! Run `/finalize $ARGUMENTS`?"
   - **FAIL:** Update STATUS.md: phase=`test-fail`, next=`/diagnose $ARGUMENTS`. Suggest: "Tests failed. Run `/diagnose $ARGUMENTS`?"
3. Give user the pass/fail summary with test counts

## Expected Output
**Pass:** `test-pass.md` with results table, build/lint status, handoff checklist verified.
**Fail:** `test-fail.md` with failures table, failure categories, and recommendation.

**Do NOT run tests yourself. Spawn the agent.**
