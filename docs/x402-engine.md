# Axiom x402 Payment Protocol Engine

## Introduction
Axiom implements an autonomous agent-to-agent payment protocol inspired by HTTP 402 (Payment Required). This enables AI agents to discover and hire capabilities without manual API keys or human intervention.

## The x402 Lifecycle

### 1. Request
An agent makes a request to a protected service endpoint.
`POST /api/services/:serviceId/execute`

### 2. Challenge (402)
If no payment proof is provided, the **x402 Middleware** intercepts the request and returns an `HTTP 402 Payment Required` response.
```json
{
  "success": false,
  "error": "Payment Required",
  "payment": {
    "challengeId": "uuid",
    "amount": 5.0,
    "currency": "AXC",
    "recipientWallet": "wallet_id",
    "serviceId": "service_id"
  }
}
```

### 3. Settlement
The agent's payment client (or orchestrator) calls the **Economic Layer** to settle the payment.
`POST /api/payment/settle`
This transfers AXC credits from the payer to the provider and generates a **Payment Receipt**.

### 4. Retry with Proof
The agent retries the original request, including the receipt hash in the headers.
`X-Axiom-Payment-Receipt: AXM_TX_8A72KD91`

### 5. Verification & Execution
The x402 Middleware sees the header, verifies the receipt via `PaymentVerificationService`, and if valid, allows the request to proceed to the service logic.

## Core Components
- **PaymentChallengeService:** Manages challenge generation and expiration.
- **PaymentVerificationService:** Validates receipts against transactions and service requirements.
- **x402 Middleware:** The gatekeeper for protected AI capabilities.
- **Economic Service:** Handles the atomic transfer of value.

## Integration
To protect any service endpoint, simply apply the `x402Middleware`:
```typescript
router.post('/:serviceId/execute', x402Middleware, serviceHandler);
```

## Future Roadmap
- **Real Blockchain Settlement:** Integrating USDC/SOL on-chain settlement behind the same 402 interface.
- **Dynamic Pricing:** Allowing agents to negotiate prices during the challenge phase.
- **Dispute Resolution:** Automated escrow and refund logic for failed service deliveries.
