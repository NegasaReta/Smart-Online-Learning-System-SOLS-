# GitHub Ruleset Configuration Plan (Production-Ready)

This repository uses the following branch model:
- `main` (production only)
- `development` (integration)
- `frontend` (module branch)
- `backend` (module branch)

## Ruleset Architecture
Create four branch rulesets in **Repository Settings -> Rules -> Rulesets**:
1. **RS-01 main** (highest priority)
2. **RS-02 development**
3. **RS-03 frontend**
4. **RS-04 backend**

Keep default branch as `main`.
Enable **Do not allow bypassing the above settings** for `main` (unless admin emergency override is required by organization policy).

## Branch Protection Policy by Branch

### RS-01 `main` (strict)
- Require pull request before merging.
- Restrict direct pushes to maintainers/admins only.
- Require at least **2 approvals**.
- Dismiss stale approvals when commits are pushed.
- Require Code Owner review.
- Require all review conversations resolved.
- Require required status checks.
- Block force pushes.
- Block branch deletion.
- Recommended: require signed commits, linear history, merge queue.

### RS-02 `development`
- Require pull request before merging.
- Require at least **1 approval** (use 2 for risky changes).
- Require resolved review conversations.
- Require status checks (lint/test/build scope).
- Block force pushes.
- Block branch deletion.

### RS-03 `frontend`
- Require pull request before merging.
- Require at least **1 approval** (frontend/module maintainers).
- Require resolved review conversations.
- Require module-specific checks.
- Block force pushes.
- Branch deletion optional by team preference.

### RS-04 `backend`
- Require pull request before merging.
- Require at least **1 approval** (backend/module maintainers).
- Require resolved review conversations.
- Require module-specific checks.
- Block force pushes.
- Branch deletion optional by team preference.

## Critical Enforcement: only `development` -> `main`
GitHub branch rules may not fully constrain PR source branch in every plan level.
Enforce this with required CI check:
- Workflow: `.github/workflows/branch-policy-main.yml`
- Rule: PRs targeting `main` fail unless `github.head_ref == 'development'`
- Add check **Enforce development -> main only** to required status checks in `RS-01`.

## Required Review Policy
- `main`: 2 approvals, resolved comments, stale approvals dismissed.
- `development`: 1 approval minimum, resolved comments required.
- `frontend`/`backend`: 1 module-owner approval minimum.
- Use `CODEOWNERS` for ownership accountability.

## Merge Restrictions
- `main`: allow a single standard merge method (recommended: squash).
- `development`: squash preferred.
- Disable merges when checks fail.
- Optional on `main`: merge queue.
- No direct commits to protected branches.

## Contributor Workflow
- Contributors use branches from `development` or module branch:
  - `feature/*`, `fix/*`, `hotfix/*`, `chore/*`
- PR flow:
  - feature/fix/hotfix/chore -> `development`
  - module branch (`frontend`/`backend`) -> `development`
  - `development` -> `main` (release only)
- Require PR template completion with testing and rollout evidence.
- Require linked issue/ticket for traceability.

## Role-Based Access Assumptions
- **Admins/Maintainers**: manage rulesets, release approvals, emergency overrides.
- **Module Leads**: frontend/backend review authority.
- **Contributors**: PR-only workflow, no direct pushes to protected branches.
- **CI bot**: status checks/check runs only.

## Suggested GitHub UI Configuration Steps
1. Go to **Settings -> Rules -> Rulesets -> New branch ruleset**.
2. Create rulesets for `main`, `development`, `frontend`, `backend`.
3. Configure branch protections per rules above.
4. Go to **Settings -> General** and set allowed merge methods.
5. Go to **Settings -> Collaborators and teams** and map role access.
6. Ensure `CODEOWNERS` and PR template are active.
7. Set required status checks for each ruleset.

## CI/CD Enforcement Guidance
If CI is limited or absent, start with:
- PR validation: lint + unit tests + build (as projects are added)
- Security: dependency audit + SAST (recommended)
- Main branch source policy check (already included)

Recommended required checks:
- `main`: full suite + source-branch policy check (+ optional security)
- `development`: full/near-full suite
- `frontend`/`backend`: module checks and changed-path tests

## Governance Baseline
- PR-only collaboration enforced.
- All work lands in `development` before `main`.
- `main` requires 2 approvals, green checks, and resolved comments.
- Only `development` can promote code to `main`.
