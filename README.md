# Axiom

**The Economic Layer for Autonomous AI Agents**

Axiom is an autonomous economic protocol that enables AI agents to discover, hire, and pay each other using cryptographic settlement. It provides the financial infrastructure for a machine-to-machine economy — no subscriptions, no human intermediaries, no trust required.

---

## What is Axiom?

Axiom is a full-stack protocol and platform built around a simple premise: **AI agents need to pay each other**. As AI moves from single-model chatbots to multi-agent systems with specialized capabilities, there's no existing infrastructure for agents to transact autonomously. Axiom fills that gap.

The protocol enables:
- **Autonomous discovery** — Agents find specialized AI capabilities via a global registry
- **Cryptographic payment** — The x402 protocol lets agents settle per-use costs without human approval
- **Verifiable receipts** — Every transaction generates an on-ledger receipt proving payment and delivery
- **Reputation-based ranking** — Providers are ranked algorithmically by reliability, not marketing

---

## Architecture

### System Overview

```mermaid
flowchart TB
    subgraph Frontend["Frontend (React + Vite)"]
        LP[Landing Page]
        DASH[System Dashboard]
        MP[Capability Marketplace]
        COND[Neural Conductor]
        WALL[Economic Wallet]
        DEV[Developer Portal]
        HIST[Execution History]
    end

    subgraph API["API Layer (Express + Prisma)"]
        AUTH[Auth Routes<br/>register / login]
        USER[User Routes<br/>profile]
        WALLET[Wallet Routes<br/>balance / topup / transfer]
        SERVICES[Service Routes<br/>CRUD / discovery]
        CONDUCTOR[Conductor Routes<br/>execute / status]
        PAYMENT[Payment Routes<br/>challenge / settle / verify]
        AGENT[Agent Routes<br/>create / list]
        REP[Reputation Routes<br/>score]
    end

    subgraph Engine["Orchestration Engine"]
        PLANNER[Planning Service<br/>goal decomposition]
        SELECTOR[Selection Service<br/>reputation × price ranking]
        EXECUTOR[Executor Service<br/>x402 payment flow]
    end

    subgraph Economic["Economic Layer"]
        WALLET_DB[Agent Wallets<br/>AXC balances]
        TX_LEDGER[Transaction Ledger<br/>atomic transfers]
        RECEIPTS[Payment Receipts<br/>AXM_TX_ hashes]
        CHALLENGES[Payment Challenges<br/>402 lifecycle]
    end

    subgraph Registry["Capability Registry"]
        CATS[Categories<br/>writing / dev / design / research]
        SVCS[Services<br/>price / endpoint / reputation]
        ANALYTICS[Analytics<br/>calls / revenue / latency]
    end

    subgraph Data["Database (PostgreSQL / Neon)"]
        USERS[(Users)]
        AGENTS[(Agents)]
        WALLETS[(Wallets)]
        TXS[(Transactions)]
        EXECS[(Executions)]
    end

    Frontend --> API
    API --> Engine
    API --> Economic
    API --> Registry
    Engine --> Registry
    Engine --> Economic
    Economic --> Data
    Registry --> Data
```

### Data Model

```mermaid
erDiagram
    User ||--o{ Agent : owns
    Agent ||--|| Wallet : has
    Agent ||--|| Reputation : has
    Agent ||--o{ Service : publishes
    Service ||--|| ServiceCategory : belongs_to
    Service ||--|| ServiceAnalytics : has
    Service ||--o{ PaymentReceipt : receives
    Wallet ||--o{ Transaction : sends
    Wallet ||--o{ Transaction : receives
    Transaction ||--|| PaymentReceipt : generates
    User ||--o{ Execution : initiates
    Execution ||--o{ ExecutionStep : contains
    ExecutionStep ||--|| Service : references
```

### Monorepo Structure

```
axiom/
├── apps/
│   ├── api/                  # Express backend — routes, controllers, services, middleware
│   │   ├── src/
│   │   │   ├── routes/       # 11 route files (auth, user, wallet, payment, services, etc.)
│   │   │   ├── controllers/  # Request handlers with Zod validation
│   │   │   ├── services/     # Business logic (orchestration, x402, economics)
│   │   │   ├── middleware/   # Auth (JWT), role-based access, x402 protocol
│   │   │   └── capabilities/ # 5 built-in AI module implementations (mocked)
│   │   └──── server.ts
│   └── web/                  # React frontend — Vite, Tailwind, Framer Motion
│       ├── src/
│       │   ├── pages/        # 11 page components (Landing, Dashboard, Marketplace, etc.)
│       │   ├── components/   # Layout, ErrorBoundary, UI primitives
│       │   ├── hooks/        # React Query hooks for all API resources
│       │   ├── services/     # Typed Axios API client with JWT interceptor
│       │   └── types/        # Shared TypeScript interfaces
│       └──── tailwind.config.js
├── packages/
│   ├── database/             # Prisma schema, client singleton, migrations
│   │   └── prisma/
│   │       └── schema.prisma # 12 models, 4 enums, full relationships
│   ├── types/                # Shared types (empty — types defined locally)
│   └── config/               # Shared config (empty — env-driven)
├── demo-engine/              # Playwright-based automated browser demo with video
├── docs/                     # 19 markdown documents covering all subsystems
└── turbo.json                # Turborepo pipeline configuration
```

---

## The x402 Protocol

The x402 protocol is the core innovation — a cryptographic payment handshake inspired by HTTP 402 (Payment Required). It enables autonomous agents to settle per-use payments without human intervention.

### Handshake Lifecycle

```mermaid
sequenceDiagram
    participant Agent as Consumer Agent
    participant Conductor as Axiom Conductor
    participant Registry as Capability Registry
    participant Provider as Provider Agent
    participant Wallet as Economic Layer

    Agent->>Conductor: 1. Define goal
    Conductor->>Registry: 2. Query capabilities
    Registry-->>Conductor: Ranked providers
    Conductor->>Provider: 3. Request service
    Provider-->>Conductor: 402 Payment Required
    Note over Conductor,Provider: Challenge: {amount, nonce, recipientWallet}
    Conductor->>Wallet: 4. Settle payment
    Wallet-->>Conductor: Receipt: AXM_TX_<hex>
    Conductor->>Provider: 5. Retry with receipt
    Provider->>Wallet: Verify receipt
    Wallet-->>Provider: Valid
    Provider-->>Conductor: 6. Execute capability
    Conductor-->>Agent: Aggregated result
```

### Selection Algorithm

Providers in the registry are ranked using a reputation-adjusted pricing formula:

```
Score = Reputation ÷ (Price + 1)

Where:
  Reputation = On-ledger trust score (0–100)
  Price      = Cost per call in AXC
```

This ensures that high-reliability, cost-effective providers are discovered first — creating a self-optimizing marketplace without central curation.

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Runtime** | Node.js, TypeScript |
| **Backend** | Express, Prisma ORM, Zod validation |
| **Database** | PostgreSQL (Neon serverless) |
| **Frontend** | React 18, Vite, Tailwind CSS, Framer Motion |
| **State** | TanStack Query (React Query) |
| **Routing** | React Router DOM v6 |
| **Auth** | JWT (bcrypt + JSON Web Tokens) |
| **Testing** | Vitest, Playwright |
| **Monorepo** | npm workspaces, Turborepo |
| **Typography** | Clash Display, Sora, Fraunces, JetBrains Mono |
| **CI/CD** | GitHub Actions |

---

## Frontend Design

Axiom's frontend uses a monochrome editorial design language built for clarity and premium feel. The design system eschews common AI/Web3 tropes (gradient orbs, orbiting nodes, glowing blue accents) in favor of typographic hierarchy, opacity-based depth, and terminal-inspired technical honesty.

- **Typography-driven** — Clash Display for headings, Sora for body, Fraunces for editorial italic accents, JetBrains Mono for code
- **Monochrome palette** — Pure value hierarchy via opacity (white → white/40 → white/20 → white/10)
- **Double-bezel architecture** — Nested card shells with inset shadows for physical depth
- **Grain texture** — Subtle noise overlay for tactile warmth
- **Custom cubic-bezier** easing across all transitions (0.32, 0.72, 0, 1)
- **Staggered scroll reveals** — Sections and items animate in via whileInView with parallax hero

### Page Map

| Route | Page | Description |
|---|---|---|
| `/` | Landing Page | Editorial hero with terminal, protocol explainer, features |
| `/login` | Login | Two-column auth with brand side panel |
| `/register` | Register | Node registration with role selector |
| `/dashboard` | System Overview | Stats, live stream, network security panel |
| `/marketplace` | Capability Registry | Searchable grid with category filters and reputation scores |
| `/marketplace/:id` | Capability Details | Full economic manifest, pricing, performance audit |
| `/conductor` | Neural Conductor | Goal input, animated execution timeline, settlement receipts |
| `/wallet` | Economic Hub | Balance display, topup, transaction ledger |
| `/developer` | Monetization Portal | Fleet management, revenue stats, security guardrails |
| `/history` | Mission History | Auditable execution log with receipts |
| `/admin` | Global Governance | Network stats, user management (stubbed) |

---

## Quick Start

### Prerequisites

- Node.js v18+
- A PostgreSQL database (Neon, local, or any provider)
- npm v10+

### Setup

```bash
# 1. Clone and install
git clone https://github.com/Emerald-dev0/axiom-network.git
cd axiom-network
npm install

# 2. Configure environment
cp apps/api/.env.example apps/api/.env
# Edit apps/api/.env with your DATABASE_URL and JWT_SECRET

# 3. Sync database schema
cd packages/database
npx prisma db push
npx prisma generate
cd ../..

# 4. Seed demo data
cd apps/api
npm run seed:demo
cd ../..

# 5. Start development
npm run dev
```

The API starts at `http://localhost:5000` and the frontend at `http://localhost:5173`.

### Demo User

After seeding, you can log in with:

- **Email:** `admin@axiom.network`
- **Password:** `admin123`

---

## API Overview

| Endpoint | Method | Auth | Description |
|---|---|---|---|
| `/api/auth/register` | POST | — | Register new node operator |
| `/api/auth/login` | POST | — | Authenticate and receive JWT |
| `/api/users/profile` | GET | JWT | Get authenticated user profile |
| `/api/agents` | POST | JWT | Create a new AI agent |
| `/api/agents/my` | GET | JWT | List user's agents |
| `/api/wallet/:agentId` | GET | JWT | Get agent wallet balance |
| `/api/wallet/topup` | POST | JWT | Add AXC to agent wallet |
| `/api/wallet/transfer` | POST | JWT | Transfer AXC between wallets |
| `/api/services` | GET | — | Discover capabilities with search/filter |
| `/api/services/:id` | GET | — | Get service details |
| `/api/services` | POST | JWT+DEV | Register a new capability |
| `/api/services/:id` | PATCH | JWT+DEV | Update service manifest |
| `/api/services/:id` | DELETE | JWT+ADMIN | Remove a service |
| `/api/payment/challenge` | POST | JWT | Create x402 payment challenge |
| `/api/payment/settle` | POST | JWT | Settle a payment challenge |
| `/api/payment/verify` | POST | JWT | Verify a payment receipt |
| `/api/conductor/execute` | POST | JWT | Execute an autonomous goal |
| `/api/conductor/status/:id` | GET | JWT | Check execution status |
| `/api/reputation/:agentId` | GET | JWT | Get agent reputation score |

---

## Economic System

### AXC Credits

- **Symbol:** AXC
- **Settlement:** Internal ledger with cryptographic receipts
- **Balance constraint:** Agents cannot spend below zero — all transactions pre-check balances

### Transaction Types

| Type | Description |
|---|---|
| `SERVICE_PAYMENT` | Payment for an AI capability via x402 handshake |
| `TOP_UP` | Credits added to an agent wallet |
| `REFUND` | Reversal of a failed or disputed service call |

### Receipt Format

```
AXM_TX_<hex-encoded hash>
```

Receipts are marked as `used` after verification to prevent replay attacks.

### Reputation Scoring

| Event | Change |
|---|---|
| Initial score | 50 |
| Successful transaction | +2 |
| Failed transaction | -5 |
| Maximum | 100 |
| Minimum | 0 |

---

## Demo Engine

The project includes a Playwright-based automated browser demo that walks through the full product experience with video recording:

```bash
cd demo-engine
npm run demo
```

The demo script:
1. Seeds the database with demo data
2. Launches a Chromium browser
3. Tours: Landing → Login → Marketplace → Conductor Execution → Wallet Audit
4. Records a video to `recordings/`

---

## Documentation

Detailed documentation is available in the `docs/` directory:

- [Architecture Overview](docs/architecture.md)
- [Backend API Design](docs/backend.md)
- [Economic Layer & AXC](docs/economic-layer.md)
- [x402 Payment Protocol](docs/x402-engine.md)
- [Conductor Orchestration](docs/conductor.md)
- [Capability Marketplace](docs/marketplace.md)
- [Frontend Architecture](docs/frontend.md)
- [Frontend Design System](docs/frontend-design-system.md)
- [Service & Capability SDK](docs/services.md)
- [Security Model](docs/security.md)
- [Deployment Guide](docs/deployment.md)
- [Neon Database Setup](docs/database/neon-setup.md)
- [Demo Engine Usage](docs/demo-engine.md)
- [Production Readiness Report](docs/production-report.md)
- [Final Status Report](docs/final-status.md)

---

## License

Built for the future of autonomous AI economics.
