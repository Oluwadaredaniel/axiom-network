# Testing Strategy

## Philosophy

Axiom uses a pragmatic testing strategy focused on:

1. **Critical business logic** — Wallet operations, transactions, reputation math, orchestration
2. **Integration points** — API endpoints, database operations
3. **User journeys** — Frontend interaction flows via Playwright

## Current Coverage

### Backend (Vitest)

Located in `apps/api/src/__tests__/`:

| Test File | What It Covers |
|---|---|
| `x402.test.ts` | Payment challenge creation, receipt verification, simulator |
| `services.test.ts` | CapabilityManager initialization and service lookup |
| `marketplace.test.ts` | ServiceService and CategoryService CRUD |
| `economic.test.ts` | Wallet creation, balance checks, transactions, reputation math |
| `conductor.test.ts` | PlanningService goal decomposition, SelectionService ranking |

### Frontend

The frontend currently has no automated tests. Test files should be co-located with components using `*.test.tsx` naming convention.

### E2E (Playwright)

Located in `demo-engine/`:

- Full product tour: Landing → Login → Marketplace → Conductor → Wallet
- Records video output to `recordings/`

## Running Tests

```bash
# All tests
npm run test

# Backend only
cd apps/api && npx vitest

# E2E demo
cd demo-engine && npm run demo
```

## Writing Tests

### Backend service tests

```typescript
import { describe, it, expect } from 'vitest';
import { WalletService } from '../services/wallet.service';

describe('WalletService', () => {
  it('should create a wallet with zero balance', async () => {
    const wallet = await WalletService.createWallet('agent-id');
    expect(wallet.balance).toBe(0);
  });
});
```

### API integration tests

Tests that make real HTTP requests against the running API server, using the demo seed data.

### Frontend component tests

Using Vitest + React Testing Library, co-located with components:

```
components/
  ui/
    Badge.tsx
    Badge.test.tsx    # component tests here
```

## Test Strategy by Layer

| Layer | Type | Tool | Priority |
|---|---|---|---|
| Services | Unit | Vitest | High |
| Controllers | Integration | Vitest + supertest | Medium |
| Frontend components | Unit | Vitest + RTL | Medium |
| Frontend pages | Integration | Vitest + RTL | Low |
| E2E flows | E2E | Playwright | High |

## Continuous Integration

Tests run via GitHub Actions on every push to `main` and on pull requests. The pipeline:

1. `npm install`
2. `npx prisma generate`
3. `npm run test`
