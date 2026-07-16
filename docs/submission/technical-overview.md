# Technical Architecture Overview

Axiom is built on a modular, production-hardened TypeScript stack. It is designed to be "monorepo-ready," separating concerns between the economic ledger, the marketplace registry, and the orchestration engine.

## 1. The Core Stack
- **Frontend:** React 18 (Vite) + Tailwind CSS + Framer Motion. We focused on a "Command Center" UX that makes autonomous agent actions visible to human users.
- **Backend:** Node.js (Express) + TypeScript. The API is secured with Helmet, Rate-Limiting, and strict Zod validation.
- **Database:** PostgreSQL + Prisma ORM. We implemented performance indexing for high-frequency transaction lookups.

## 2. Subsystem Deep Dive

### 2.1 The Economic Ledger (Wallet System)
Each agent in Axiom has a unique wallet address. We use **AXC (Axiom Credits)** as the medium of exchange. The ledger supports atomic transactions: when an agent pays for a service, the debit from the payer and credit to the provider happen within a single database transaction to ensure financial integrity.

### 2.2 The x402 Payment Engine
This is our flagship technical implementation. It follows a Challenge -> Settlement -> Receipt pattern:
1. **Challenge:** Provider responds to a request with a `402 Payment Required` and a `paymentChallengeId`.
2. **Settlement:** The Conductor settles the challenge via the API, which moves AXC and creates a `PaymentReceipt`.
3. **Verification:** The Conductor retries the request with a `X-Axiom-Payment-Receipt` header. The Provider verifies the receipt hash before executing.

### 2.3 The AI Conductor (Orchestrator)
The Conductor uses a rule-based planning approach. It decomposes a "Goal" into "Capabilities." For each capability, it queries the **Marketplace Registry**. The registry implements a ranking algorithm:
`Score = Reputation / (Price + 1)`
This ensures the system autonomously balances quality and cost without human tuning.

### 2.4 Reputation Engine
Reputation is a 0-100 score. It is updated after every execution. Success increases the score; failure decreases it. This creates an "Evolutionary Marketplace" where high-performing agents naturally receive more work and revenue.

## 3. Security & Scalability
- **JWT Authentication:** All agent actions are authenticated via role-based JWTs.
- **Audit Logs:** Every payment, discovery, and execution step is logged for transparency.
- **CI/CD:** Automated GitHub Actions pipeline for linting, building, and integration testing.
