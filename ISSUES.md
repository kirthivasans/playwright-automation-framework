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

## [2026-07-25] GitHub Actions "Cannot find module" after adding Page Object Model files
**What happened:** POM refactor worked perfectly locally, but GitHub Actions failed with `Cannot find module '../pages/LoginPage'`, even after confirming the files were committed and pushed.
**Root cause:** Case-sensitivity mismatch. Files were saved as `loginPage.js`/`inventoryPage.js` (lowercase first letter), but `require()` statements referenced `LoginPage`/`InventoryPage` (capital first letter). Windows (local dev) is case-insensitive, so it worked locally — Linux (GitHub Actions runners) is case-sensitive, so the mismatch only surfaced in CI.
**Fix:** Renamed files to match the import casing exactly (`git mv loginPage.js LoginPage.js`).
**Lesson:** File name casing must match `require()`/`import` statements exactly — don't trust that something "works locally" as proof it's correct, especially on Windows. Always verify case consistency for any cross-platform (CI) project.

## [2026-07-25] Files not appearing on GitHub after commit
**What happened:** Created `pages/LoginPage.js` and `pages/InventoryPage.js` locally, but they weren't visible on the branch after pushing — `git status` showed "clean," yet the files were missing from the last commit.
**Root cause:** Files were created after the initial `git add . && commit` ran, so they were never staged in that specific commit — a timing issue, not a location or `.gitignore` issue.
**Fix:** Ran `git add .` again after confirming `git status` showed them as untracked/modified, then committed and pushed again.
**Lesson:** After creating new files mid-session, always re-run `git status` before assuming a previous `git add .` already captured them.

## [2026-07-25] Playwright Inspector "End of file expected"
**What happened:** Syntax error when running a page object file.
**Root cause:** Method referenced parameters (`username`, `password`) that were never declared in the method signature.
**Fix:** Added the missing parameters to the method definition.
**Lesson:** When a method uses a variable, always double-check it's declared as a parameter — undeclared variables can cause confusing parse-level errors, not just runtime ones.