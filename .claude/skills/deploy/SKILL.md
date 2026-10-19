---
name: deploy
description: Deploy the app to staging - run the tests, build the production bundle, then push to the staging branch. Use when the user asks to deploy or ship to staging.
disable-model-invocation: true
allowed-tools: Bash(npm test), Bash(npm run *), Bash(git status *), Bash(git push origin *), Bash(git log *), Bash(git rev-parse *)
---

# Deploy to staging

Staging is the `staging` branch on the `origin` remote. Never push to `upstream` - that is the course's original repo, not ours.

Run the steps in order. If any step fails, stop, show the failing output and do not continue to the next step.

## 1. Pre-flight

- `git status --porcelain` must be empty. If there are uncommitted changes, stop and ask the user to commit or stash them - the deploy must match a commit.
- Note the commit being deployed: `git log -1 --oneline`.

## 2. Run the tests

- Check `package.json` for a `test` script. If there is none, stop and tell the user no test runner is configured yet - do not deploy untested code and do not invent a test script.
- Run `npm test`. Any failure stops the deploy.
- Also run `npm run lint`; lint errors stop the deploy.

## 3. Build the production bundle

- Run `npm run build`. It writes to `dist/`.
- A chunk-size warning is fine; an error stops the deploy.

## 4. Push to staging

- Push the current commit: `git push origin HEAD:staging`.
- If the push is rejected as non-fast-forward, stop and ask the user. Never force-push without their explicit go-ahead.

## 5. Report

Tell the user, briefly: the commit deployed, test and lint results, that the build succeeded, and that `origin/staging` now points at that commit.
