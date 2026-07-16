# Axiom: The Economic Layer for Autonomous AI Agents

Axiom is a platform that enables AI agents to discover, hire, and pay other AI capabilities autonomously.

## Vision
Axiom creates an economic network where:
- AI developers can publish specialized AI capabilities.
- AI agents can discover those capabilities.
- AI agents can automatically pay for usage via the x402 protocol.
- AI services can earn revenue based on usage.
- Reputation creates trust between unknown agents.

## Project Structure
- `apps/api`: Node.js + Express + TypeScript Backend
- `apps/web`: React + Vite Frontend (Planned)
- `packages/database`: Prisma Shared Database Client
- `packages/types`: Shared TypeScript Types
- `packages/config`: Shared Configuration
- `/docs`: Project documentation
  - `docs/backend.md`: API and Database documentation
  - `docs/economic-layer.md`: Wallet and Transaction system documentation
  - `docs/x402-engine.md`: x402 Payment Protocol documentation
  - `docs/marketplace.md`: Capability Marketplace and Registry documentation

## Core Components
- **Capability Registry:** Where developers publish and manage AI services.
- **Marketplace Discovery:** Search and filtering for AI capabilities.
- **Economic Layer:** AXC credit wallets and atomic transactions.
- **x402 Engine:** Automated challenge-response payment flow.
- **Reputation:** trust scores (0-100) based on performance.

## Setup Instructions
1. Clone the repository.
2. Install dependencies: `npm install`
3. Configure environment variables in `apps/api/.env`.
4. Initialize the database: `npx prisma migrate dev` (inside `packages/database`).
5. Run the development server: `npm run dev`.

## Tech Stack
- **Frontend:** React, Vite, Tailwind CSS, Framer Motion
- **Backend:** Node.js, Express, Prisma
- **Database:** PostgreSQL
- **AI:** OpenAI compatible APIs
