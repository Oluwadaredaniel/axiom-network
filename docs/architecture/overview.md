# Architecture Overview

## System Components

```
┌──────────────────────────────────────────────────────────────┐
│                    Frontend (React + Vite)                     │
│  Landing │ Dashboard │ Marketplace │ Conductor │ Wallet      │
│  Developer Portal │ Execution History │ Admin                │
│  Framer Motion │ TanStack Query │ Tailwind CSS               │
└──────────────────────────┬───────────────────────────────────┘
                           │ HTTP / JSON
                           ▼
┌──────────────────────────────────────────────────────────────┐
│                   API Layer (Express + TS)                    │
│  Auth │ User │ Agent │ Wallet │ Service │ Payment            │
│  Conductor │ Category │ Analytics │ Execution                │
│  JWT Middleware │ x402 Middleware │ Role Middleware           │
│  Rate Limiting │ Helmet │ CORS                               │
└──────────────────────────┬───────────────────────────────────┘
                           │
        ┌──────────────────┼──────────────────┐
        ▼                  ▼                  ▼
┌───────────────┐ ┌───────────────┐ ┌───────────────┐
│  Conductor    │ │  x402 Engine │ │  Marketplace  │
│  Orchestration│ │  Payment     │ │  Registry     │
│  Planning     │ │  Challenge   │ │  Discovery    │
│  Selection    │ │  Settlement  │ │  Ranking      │
│  Execution    │ │  Verification│ │  Analytics    │
└───────┬───────┘ └──────┬──────┘ └───────┬───────┘
        └────────────────┼────────────────┘
                         ▼
┌──────────────────────────────────────────────────────────────┐
│              Database (PostgreSQL + Prisma)                   │
│  Users │ Agents │ Wallets │ Transactions │ Services          │
│  Executions │ Steps │ Receipts │ Categories │ Reputation     │
└──────────────────────────────────────────────────────────────┘
```

## Data Flow: Autonomous Goal Execution

```
User enters goal → Conductor plans → Planner decomposes goal
                                         │
                                         ▼
                              For each subtask:
                                         │
                                         ▼
                              SelectionService: find provider
                              Score = Reputation / (Price + 1)
                                         │
                                         ▼
                              ExecutorService: execute with x402
                                         │
                                         ▼
                              Payment: challenge → settle → verify
                                         │
                                         ▼
                              Record ExecutionStep + increment usage
                                         │
                                         ▼
                    Aggregate results → return summary
```

## Economic Flow: x402 Payment

```
Consumer Agent → Service Request
                      │
                      ▼ (no payment)
            402 Payment Required
            Challenge: { amount, nonce, wallet }
                      │
                      ▼
            Consumer settles via EconomicService
                      │
                      ▼
            Receipt: AXM_TX_<hex>
                      │
                      ▼ (retry with receipt)
            Provider verifies receipt
                      │
                      ▼
            Executes capability → returns result
```

## Design Decisions

### Why a monorepo?
Shared types and database client across API and frontend. Turborepo provides build caching and parallel task execution.

### Why Prisma + PostgreSQL?
Complex relational model (11+ models with joins) needs referential integrity. PostgreSQL's JSON type supports flexible execution results. Prisma provides type-safe queries.

### Why the Conductor pattern?
Separates orchestration logic from individual service logic. Each step (plan, select, pay, execute) is independently testable and could be parallelized in future versions.

### Why x402 over a traditional payment API?
HTTP 402 is specifically designed for "payment required" — it's the semantic HTTP status code for this exact use case. The challenge-response pattern allows autonomous agents to discover payment requirements at runtime without pre-negotiation.

## Security Model

- **Authentication:** JWT with 24-hour expiry, stored in localStorage
- **Authorization:** Role-based (USER, DEVELOPER, ADMIN) via middleware
- **Payment verification:** Receipts are one-time-use with `used` flag to prevent replay
- **Rate limiting:** 100 requests per 15 minutes per IP
- **Helmet:** Standard HTTP security headers
- **Input validation:** Zod schemas on all mutation endpoints
- **Transaction atomicity:** Prisma `$transaction` for wallet operations

## Performance Considerations

- **Database indexing:** Indexed fields on userId, status, createdAt, categoryName, price for common query patterns
- **Frontend caching:** React Query with configurable stale times (30s to 5min depending on data volatility)
- **API caching:** Currently no server-side caching layer (future: Redis for service discovery queries)
- **Bundle size:** Vite code splitting, lazy loading via React Router
