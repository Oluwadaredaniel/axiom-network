# Axiom Technical Architecture & Development Blueprint

## 1. Product Architecture Overview
Axiom operates as a decentralized-logic service mesh for AI agents.
- **Frontend Dashboard:** React-based command center.
- **Backend API:** Node.js/Express core managing registry and x402 flow.
- **Service Registry:** Searchable index of AI specialized endpoints.
- **AI Orchestrator:** LLM-driven planner and executor.
- **Wallet System:** Virtual ledger for "Axiom Credits".
- **Payment Engine:** Implements the x402 "Challenge-Response" protocol.

## 2. System Architecture Diagram
```text
[ User ] <--> [ React Frontend ]
                    |
              [ Express API ] <-----------> [ LLM (Planner) ]
              /      |      \
    [ Registry ] [ Wallet ] [ Orchestrator ]
         |           |           |
    [ Postgres ] <---+---> [ x402 Engine ]
                                 |
                    [ External AI Capabilities ]
```

## 3. Tech Stack
- **Frontend:** React, Vite, Tailwind CSS, Framer Motion
- **Backend:** Node.js, Express
- **Database:** PostgreSQL + Prisma
- **AI:** OpenAI SDK

## 4. x402 Simulation Flow
1. **Challenge:** Agent calls Service -> Service returns 402 + Price.
2. **Payment:** Agent backend verifies credits -> generates signed receipt.
3. **Verification:** Agent retries with receipt.
4. **Settlement:** Service verifies receipt -> executes task -> credit transfer.

## 5. Roadmap (16 Days)
- **Phase 1 (Day 1-3):** Infrastructure & Registry.
- **Phase 2 (Day 4-7):** Wallet & x402 Engine.
- **Phase 3 (Day 8-11):** Orchestrator Logic.
- **Phase 4 (Day 12-14):** Frontend Dashboards.
- **Phase 5 (Day 15-16):** Polishing & Demo.
