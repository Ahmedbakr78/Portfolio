# Contribution and Engineering Standards

## Portfolio Ecosystem of Ahmed Abo Bakr

Thank you for your interest in contributing to this portfolio application. This codebase adheres to strict engineering guidelines to maintain deterministic behavior, type safety, and zero telemetry.

---

## 1. Codebase Principles

1. **Zero External Tracking**: The application must remain 100% private. No third-party tracking scripts, cookies, or remote analytics are permitted.
2. **Local-First Execution**: All calculators, simulators, audio engines, and search utilities must execute purely client-side without backend dependencies.
3. **Strict Type Safety**: All TypeScript files must pass compilation with `tsc --noEmit` under strict mode with zero implicit any types.
4. **Deterministic Unit Testing**: Every business logic function, sizing formula, and credential formatter must be backed by unit tests in `src/utils/portfolioLogic.test.ts`.
5. **No Emojis in Documentation or Code Comments**: Documentation, commit messages, and source code must maintain a clean, professional, and corporate technical tone without emojis.

---

## 2. Development Workflow

### Prerequisites
- Bun v1.3.0 or higher (recommended) or Node.js v20.0.0 or higher
- Git 2.30 or higher

### Local Setup
```bash
git clone https://github.com/Ahmedbakr78/Portfolio.git
cd Portfolio
bun install
```

### Running Tests
```bash
bun test
```
All unit tests must pass before opening a pull request.

### Building for Production
```bash
bun run build
```
Verify that the build generates clean bundles in `dist/` without compilation warnings or runtime errors.

---

## 3. Branching and Commit Standards

- Main branch: `main` (production deployment branch)
- Feature branches: `feat/<feature-name>`
- Fix branches: `fix/<fix-name>`
- Documentation branches: `docs/<doc-name>`

### Conventional Commit Format
```
feat(scope): add new feature
fix(scope): resolve issue
docs(scope): update documentation
test(scope): add automated unit test
refactor(scope): optimize internal implementation
```

Do not include emojis in commit titles or descriptions.

---

## 4. Verification and Pull Request Checklist

Before submitting a pull request, ensure:
- [ ] `bun test` passes with 0 failures.
- [ ] `bun run build` completes successfully.
- [ ] The local development server (`bun run dev`) renders cleanly in both Onyx Dark and Minimal White modes.
- [ ] Stacking context and accessibility labels are verified across mobile and desktop viewports.
- [ ] No emojis are present in added or modified documentation.
