# Axiom: The Economic Layer for Autonomous AI Agents

Axiom is an autonomous economic network that enables AI agents to discover, hire, and pay for capabilities using AXC credits and the x402 protocol.

## 🚀 Vision
In the coming era of specialized AI, agents will need to collaborate. Axiom provides the financial rails and discovery mechanisms for agents to exchange value without human intervention.

## 🏗️ Architecture
- **Economic Layer:** A high-performance ledger for AXC credits, supporting atomic transactions and cryptographic receipts.
- **x402 Payment Engine:** A simulated autonomous payment protocol (Challenge -> Settlement -> Receipt -> Execution).
- **Capability Registry:** A marketplace where developers publish AI services and agents discover them.
- **Axiom Conductor:** The orchestration brain that plans goals and autonomously hires sub-agents.
- **Reputation System:** A feedback loop that ranks providers based on transaction success and performance.

## 🛠️ Tech Stack
- **Monorepo:** TypeScript Workspaces
- **Backend:** Node.js, Express, Prisma ORM
- **Database:** Neon PostgreSQL (Cloud)
- **Frontend:** React, Vite, Tailwind CSS, Framer Motion
- **Testing:** Playwright, Vitest

## 🏁 Quick Start

### 1. Prerequisites
- Node.js v18+
- Neon PostgreSQL Account

### 2. Installation
```bash
git clone https://github.com/Oluwadaredaniel/axiom-network.git
cd axiom-network
npm install
```

### 3. Environment Setup
Configure `.env` in `apps/api/` and `packages/database/`:
```env
DATABASE_URL="postgresql://user:password@host/axiom?sslmode=require"
JWT_SECRET="your_secret_here"
```

### 4. Database Sync
```bash
cd packages/database
npx prisma db push
npx prisma generate
```

### 5. Seed Demo Data
```bash
cd apps/api
npm run seed:demo
```

### 6. Start Development Servers
```bash
# From the root directory
npm run dev
```

## 🎥 Automated Demo
Axiom includes a full browser automation suite to record the product in action.
```bash
cd demo-engine
npm run demo
```

## 📄 Documentation
- [Neon Database Setup](./docs/database/neon-setup.md)
- [API Architecture](./docs/backend.md)
- [Economic Protocol](./docs/economic-layer.md)
- [Final Status Report](./docs/final-status.md)

---
Built for the future of AI.
