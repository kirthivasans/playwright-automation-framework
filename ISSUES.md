# Issue Log

## [2026-07-24] Playwright test not found error
**What happened:** Ran `npx playwright test` and got "No tests found."
**Root cause:** Command was run from the repo root, not from inside `js-framework/` where `playwright.config.js` and `package.json` actually live.
**Fix:** `cd js-framework` before running Playwright commands.
**Lesson:** Playwright needs to run from the folder containing its config — always confirm current directory when hitting "not found" errors.

## [2026-07-24] Commits attributed to wrong GitHub account
**What happened:** Pushed a commit, but GitHub showed the contributor as an old/unrelated account (kirthivasan-de).
**Root cause:** Local Git identity (`user.name`/`user.email`) was still set to an old account's config, unrelated to the current repo.
**Fix:** Updated `git config user.name`/`user.email` for the repo, then corrected the already-pushed commit with `git commit --amend --author="..."` and `git push --force`.
**Lesson:** Check `git config user.name` and `user.email` before the first commit on any new machine/repo setup.

## [2026-07-24] GitHub Actions workflow not triggering
**What happened:** Added `.github/workflows/playwright.yml`, but the Actions tab showed nothing — no runs, workflow not even listed.
**Root cause:** Edits to the workflow file were being pushed to a feature branch that had already been merged once. New pushes to that branch after merge don't automatically flow into `main` again — the workflow file changes never actually reached `main`.
**Fix:** Opened a fresh PR from the branch to merge the latest changes into `main` properly.
**Lesson:** After a branch is merged, any further edits to it need a new PR/merge to reach `main` — don't assume old branch pushes auto-sync.