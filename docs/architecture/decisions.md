# Architecture Decision Records

## ADR-001: Monorepo with npm Workspaces

**Context:** The project has multiple deployable artifacts (API, frontend, demo engine) plus shared packages (database client, types, config). A monorepo structure simplifies dependency management and code sharing.

**Decision:** Use npm workspaces with Turborepo for orchestration.

**Consequences:**
- Single `npm install` at root installs all dependencies
- Turborepo caches build outputs for fast iteration
- Shared packages (`database`, `types`, `config`) are importable by all apps

---

## ADR-002: Prisma ORM with PostgreSQL

**Context:** The data model includes complex relationships (users, agents, wallets, transactions, executions, reputation) that require relational integrity and transactional operations.

**Decision:** Use Prisma ORM with PostgreSQL.

**Consequences:**
- Type-safe database access with auto-generated client
- Schema-as-source-of-truth with migrations
- PostgreSQL's JSON column type used for flexible execution results
- Neon serverless PostgreSQL used for zero-config cloud deployment

---

## ADR-003: x402 Payment Protocol (HTTP 402)

**Context:** Agents need to pay for services autonomously without human approval. Traditional payment flows (checkout pages, OAuth consent) are designed for humans.

**Decision:** Implement the x402 protocol using HTTP 402 (Payment Required) status codes with a challenge/response pattern.

**Consequences:**
- Agent makes a service request without payment
- Server responds with 402, including a payment challenge (amount, wallet, nonce)
- Agent settles the payment via the economic layer
- Agent retries the request with a cryptographic receipt
- Server verifies the receipt and executes the capability
- Receipts are marked as used to prevent replay attacks

---

## ADR-004: JWT Authentication

**Context:** The system needs stateless authentication that works across API and frontend without session storage.

**Decision:** Use JWT tokens with 24-hour expiry.

**Consequences:**
- No server-side session storage needed
- Tokens stored in `localStorage` on the frontend
- Axios interceptor automatically attaches `Authorization: Bearer` header
- Role-based access control (USER, DEVELOPER, ADMIN) via middleware

---

## ADR-005: React Query for State Management

**Context:** The frontend has many API-driven views that need caching, background refresh, and optimistic updates.

**Decision:** Use TanStack React Query (v5) for server state management.

**Consequences:**
- Automatic caching with configurable stale times
- Background refetching for fresh data
- Mutation invalidation pattern for consistency
- No global state store needed (Redux, Zustand)

---

## ADR-006: Tailwind CSS with Custom Design Tokens

**Context:** The UI needs a premium, consistent design system without the overhead of a component library.

**Decision:** Use Tailwind CSS with custom design tokens, component classes (`@layer components`), and Framer Motion for animations.

**Consequences:**
- All design values (colors, spacing, shadows) defined in `tailwind.config.js`
- Reusable component classes (`glass-strong`, `premium-card`, `btn-primary`) in `index.css`
- Typography system with Clash Display, Sora, Fraunces, JetBrains Mono
- Monochrome editorial palette for landing page, blue-accented for app dashboard

---

## ADR-007: Orchestration with Conductor Service

**Context:** Multi-agent workflows require planning, discovery, payment, and execution to be coordinated in a single pipeline.

**Decision:** Implement the Conductor service as a sequential pipeline: plan → discover → select → pay → execute → aggregate.

**Consequences:**
- Goals are decomposed by `PlanningService` using keyword matching (mock LLM)
- Providers are ranked by `reputation / (price + 1)` formula
- Each step is recorded as an `ExecutionStep` with cost and transaction ID
- Failures are thrown up to the caller (future: retry with fallback providers)

---

## ADR-008: Seeded Demo Data

**Context:** The project needs to be immediately explorable without manual configuration.

**Decision:** Provide a comprehensive seed script (`demo-seed.ts`) and an automated Playwright demo.

**Consequences:**
- Seed creates users, agents, categories, and services
- Demo user gets 1000 AXC to explore the marketplace
- Automated demo records a video walkthrough
- Demo data is fully reset on each seed run
