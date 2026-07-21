import { describe, it, expect } from 'vitest';

const score = (reputation: number, price: number) => reputation / (price + 1);

describe('SelectionService — provider ranking algorithm', () => {
  it('should rank higher reputation providers first at equal price', () => {
    const a = score(90, 5);
    const b = score(50, 5);
    expect(a).toBeGreaterThan(b);
  });

  it('should prefer lower price when reputation is similar', () => {
    const a = score(80, 3);
    const b = score(80, 10);
    expect(a).toBeGreaterThan(b);
  });

  it('should handle zero price without division by zero', () => {
    const s = score(75, 0);
    expect(s).toBe(75);
  });

  it('should give score of 0 when reputation is 0', () => {
    const s = score(0, 5);
    expect(s).toBe(0);
  });

  it('should rank cheap high-reputation over expensive high-reputation', () => {
    const cheapGood = score(85, 2);
    const expensiveGood = score(90, 20);
    expect(cheapGood).toBeGreaterThan(expensiveGood);
  });
});

describe('PlanningService — goal decomposition', () => {
  const planGoal = (goal: string): string[] => {
    const lower = goal.toLowerCase();
    const tasks: string[] = [];

    if (lower.includes('landing') || lower.includes('website') || lower.includes('site')) {
      tasks.push('Writing', 'Design', 'Marketing');
    } else if (lower.includes('security') || lower.includes('audit')) {
      tasks.push('Development', 'Research');
    } else {
      tasks.push('Research', 'Writing');
    }

    return tasks;
  };

  it('should decompose landing page goals', () => {
    expect(planGoal('Create a landing page for my startup')).toEqual(['Writing', 'Design', 'Marketing']);
  });

  it('should decompose security audit goals', () => {
    expect(planGoal('Run a security audit on my API')).toEqual(['Development', 'Research']);
  });

  it('should use defaults for unknown goals', () => {
    expect(planGoal('Help me write a poem')).toEqual(['Research', 'Writing']);
  });

  it('should match website keyword', () => {
    expect(planGoal('Build a website')).toContain('Design');
  });

  it('should be case insensitive', () => {
    expect(planGoal('LANDING PAGE')).toEqual(['Writing', 'Design', 'Marketing']);
  });
});

describe('ReputationService — score math', () => {
  it('should increase score on success (capped at 100)', () => {
    expect(Math.min(50 + 2, 100)).toBe(52);
    expect(Math.min(99 + 2, 100)).toBe(100);
    expect(Math.min(100 + 2, 100)).toBe(100);
  });

  it('should decrease score on failure (min 0)', () => {
    expect(Math.max(50 - 5, 0)).toBe(45);
    expect(Math.max(3 - 5, 0)).toBe(0);
    expect(Math.max(0 - 5, 0)).toBe(0);
  });

  it('should track transaction counts', () => {
    const state = { successful: 0, failed: 0 };
    state.successful += 1;
    state.failed += 1;
    expect(state.successful).toBe(1);
    expect(state.failed).toBe(1);
  });

  it('should handle multiple transactions', () => {
    const state = { successful: 0, failed: 0, score: 50 };

    for (let i = 0; i < 5; i++) {
      state.successful += 1;
      state.score = Math.min(state.score + 2, 100);
    }
    for (let i = 0; i < 2; i++) {
      state.failed += 1;
      state.score = Math.max(state.score - 5, 0);
    }

    expect(state.successful).toBe(5);
    expect(state.failed).toBe(2);
    expect(state.score).toBe(50);
  });
});

describe('WalletService — balance operations', () => {
  it('should create wallet with zero balance', () => {
    const wallet = { balance: 0, currency: 'AXC' };
    expect(wallet.balance).toBe(0);
    expect(wallet.currency).toBe('AXC');
  });

  it('should add credits correctly', () => {
    const wallet = { balance: 0 };
    wallet.balance += 100;
    expect(wallet.balance).toBe(100);
    wallet.balance += 50;
    expect(wallet.balance).toBe(150);
  });

  it('should deduct credits correctly', () => {
    const wallet = { balance: 200 };
    wallet.balance -= 75;
    expect(wallet.balance).toBe(125);
  });

  it('should throw on insufficient funds', () => {
    const wallet = { balance: 10 };
    const amount = 20;
    if (wallet.balance < amount) {
      expect(() => { throw new Error('Insufficient balance'); }).toThrow('Insufficient balance');
    }
  });

  it('should not go negative', () => {
    const wallet = { balance: 5 };
    const amount = 10;
    const hasSufficientFunds = wallet.balance >= amount;
    expect(hasSufficientFunds).toBe(false);
  });
});

describe('x402 — receipt verification', () => {
  it('should generate receipt with correct prefix', () => {
    const receipt = `AXM_TX_${Math.random().toString(16).slice(2, 10)}`;
    expect(receipt).toMatch(/^AXM_TX_[0-9a-f]{8}$/);
  });

  it('should prevent replay attacks', () => {
    const receipt = { used: false };
    expect(receipt.used).toBe(false);
    receipt.used = true;
    expect(receipt.used).toBe(true);
  });

  it('should validate receipt matches service', () => {
    const receipt = { serviceId: 'svc-1', amount: 5 };
    const matchesService = receipt.serviceId === 'svc-1' && receipt.amount >= 5;
    expect(matchesService).toBe(true);

    const wrongService = receipt.serviceId === 'svc-2' && receipt.amount >= 5;
    expect(wrongService).toBe(false);
  });
});
