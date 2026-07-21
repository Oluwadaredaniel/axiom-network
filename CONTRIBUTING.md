# Contributing to Axiom

Thank you for considering contributing to Axiom — the economic layer for autonomous AI agents.

## Development Setup

```bash
# 1. Install dependencies
npm install

# 2. Set up environment
cp apps/api/.env.example apps/api/.env
# Edit DATABASE_URL and JWT_SECRET

# 3. Sync database
cd packages/database
npx prisma db push
npx prisma generate
cd ../..

# 4. Seed demo data
npm run seed

# 5. Start development
npm run dev
```

The API runs on `http://localhost:5000` and the frontend on `http://localhost:5173`.

## Project Structure

```
apps/
  api/      Express backend with Prisma + PostgreSQL
  web/      React frontend with Vite + Tailwind CSS
packages/
  database/ Prisma schema and client singleton
demo-engine/ Playwright automated demo
docs/       System documentation
```

## Code Standards

- **TypeScript** — Strict mode enabled in all packages. No `any` without explicit justification.
- **Commits** — Follow [conventional commits](https://www.conventionalcommits.org/): `feat:`, `fix:`, `refactor:`, `docs:`, `style:`, `perf:`, `test:`, `chore:`
- **API routes** — Thin controllers, business logic in services, Zod validation on inputs
- **Frontend pages** — React Query for data fetching, Framer Motion for animations, Tailwind for styling
- **Design tokens** — Defined in `tailwind.config.js`. Use semantic classes (`premium-card`, `glass`) from `index.css`

## Pull Request Process

1. Create a feature branch from `main`
2. Make small, focused commits
3. Ensure the app builds: `npm run build`
4. Verify linting: `npm run lint`
5. Open a PR with a clear description of the change and why it matters

## Architecture Decisions

Any significant change should be documented in an ADR (Architecture Decision Record) under `docs/decisions/`. Explain the context, options considered, and the decision made.

## License

By contributing, you agree that your contributions will be licensed under the project's license.
