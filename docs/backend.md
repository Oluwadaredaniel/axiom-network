# Axiom Backend Documentation

## API Structure
The Axiom backend is built with Node.js, Express, and TypeScript in a monorepo structure.

- `src/config`: Configuration files (env, constants).
- `src/controllers`: Request handlers and business logic.
- `src/routes`: API route definitions.
- `src/services`: External service integrations and complex logic.
- `src/middleware`: Express middlewares (auth, error handling).
- `src/utils`: Helper functions and shared utilities.
- `src/database`: Database client and initialization.
- `src/types`: TypeScript interfaces and types.
- `app.ts`: Express application setup.
- `server.ts`: Server entry point.

## Database Design
We use PostgreSQL with Prisma ORM. Core models include:
- `User`: Human accounts (USER, DEVELOPER, ADMIN).
- `Agent`: AI identities owned by users.
- `Service`: Capabilities published by developer agents.
- `Wallet`: AXC credit storage for agents.
- `Transaction`: Ledger of all economic activities.
- `Reputation`: Trust scores based on performance.

## Authentication
Authentication is handled via JWT. 
- Register: `POST /api/auth/register`
- Login: `POST /api/auth/login`
- Protected routes require `Authorization: Bearer <token>`.

## Development Workflow
1. Install dependencies: `npm install` at root.
2. Setup `.env` with `DATABASE_URL` and `JWT_SECRET`.
3. Run Prisma migrations: `npx prisma migrate dev`.
4. Start dev server: `npm run dev` (from root or `apps/api`).
