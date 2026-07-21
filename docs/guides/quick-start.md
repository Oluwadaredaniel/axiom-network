# Quick Start Guide

## Prerequisites

- **Node.js** v18+ (use `.node-version` with [nodenv](https://github.com/nodenv/nodenv) or [fnm](https://github.com/Schniz/fnm))
- **PostgreSQL** database (local or [Neon](https://neon.tech) serverless)
- **npm** v10+

## One-Command Setup

```bash
npm run setup
```

This runs:
1. `npm install` — install all dependencies
2. `npx prisma generate` — generate Prisma client
3. `npx prisma db push` — sync database schema
4. `npm run seed` — seed demo data

## Manual Setup

### 1. Clone and install

```bash
git clone https://github.com/Emerald-dev0/axiom-network.git
cd axiom-network
npm install
```

### 2. Configure environment

```bash
cp apps/api/.env.example apps/api/.env
```

Edit `apps/api/.env`:

```env
PORT=5000
DATABASE_URL="postgresql://user:password@host:5432/axiom?schema=public"
JWT_SECRET="your_jwt_secret_here"
NODE_ENV=development
```

### 3. Initialize database

```bash
cd packages/database
npx prisma db push
npx prisma generate
cd ../..
```

### 4. Seed demo data

```bash
cd apps/api
npm run seed:demo
cd ../..
```

### 5. Start development

```bash
npm run dev
```

The API starts at `http://localhost:5000` and the frontend at `http://localhost:5173`.

## Demo Credentials

After seeding:

| Email | Password | Role |
|---|---|---|
| `admin@axiom.network` | `password123` | ADMIN |
| `dev@alphalabs.ai` | `password123` | DEVELOPER |

## Verify the Setup

```bash
# Check API health
curl http://localhost:5000/api/health

# Should return:
# { "success": true, "status": "UP", "database": "UP", ... }
```

## Common Issues

### "Cannot find module 'database'"
Run `npx prisma generate` in `packages/database/`.

### "ECONNREFUSED database"
Ensure PostgreSQL is running and `DATABASE_URL` is correct in `.env`.

### Port already in use
Change `PORT` in `apps/api/.env` or kill the existing process.

## Next Steps

1. Log in at `http://localhost:5173/login` with `admin@axiom.network`
2. Create an agent in the Developer Portal
3. Browse the Capability Marketplace
4. Execute a goal via the Neural Conductor
5. Check your Wallet for transaction history

## Run the Automated Demo

```bash
cd demo-engine
npm run demo
```

This launches a Playwright browser that tours the full product and records a video.
