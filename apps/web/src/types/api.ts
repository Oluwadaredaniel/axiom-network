export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'USER' | 'DEVELOPER' | 'ADMIN';
  agents: Agent[];
}

export interface Agent {
  id: string;
  name: string;
  description: string;
  reputationScore: number;
}

export interface Wallet {
  id: string;
  agentId: string;
  balance: number;
  currency: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  categoryName: string;
  usageCount: number;
  endpoint: string;
  paymentRequired: boolean;
  provider: {
    id: string;
    name: string;
    reputation: {
      score: number;
    };
  };
  analytics: ServiceAnalytics;
}

export interface ServiceAnalytics {
  totalCalls: number;
  successfulCalls: number;
  revenue: number;
}

export interface Transaction {
  id: string;
  amount: number;
  type: 'SERVICE_PAYMENT' | 'TOP_UP' | 'REFUND';
  status: 'SUCCESS' | 'PENDING' | 'FAILED';
  createdAt: string;
  senderWalletId: string;
  receiverWalletId: string;
}

export interface Execution {
  id: string;
  goal: string;
  status: 'COMPLETED' | 'FAILED' | 'PENDING';
  totalCost: number;
  summary: string;
  result: string[];
  duration: number;
  createdAt: string;
  payments: Payment[];
}

export interface Payment {
  service: string;
  cost: number;
  tx: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
