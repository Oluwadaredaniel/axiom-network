# Payment System Review: Axiom x402

## 1. Why Autonomous Payments?
Agents cannot navigate "Checkouts." They need a "Handshake." x402 allows an agent to encounter a cost, decide if it's within budget, and settle it instantly to unlock a capability.

## 2. Verification Mechanism
- **The Receipt:** Every transaction generates a `PaymentReceipt` record.
- **Header Injection:** The Conductor injects `X-Axiom-Payment-Receipt` into the service call.
- **Middleware:** The `x402Middleware` on the provider side looks up the receipt and verifies the `serviceId` and `amount` match the current request.

## 3. Fraud Prevention
- **Atomic Settlement:** Payer is debited and Provider is credited in a single ACID transaction.
- **Expiration:** Payment challenges have a `expiresAt` field to prevent "stale" payment requests.
- **Receipt Locking:** A receipt is tied to a specific `serviceId`, preventing "Replay Attacks" on other services.

## 4. Scaling Settlement
The current centralized ledger can handle thousands of transactions per second. For millions, the system should move to an off-chain "Payment Channel" or "Rollup" model similar to the Lightning Network.

## 5. Failure Handling
- **Insufficient Funds:** The Conductor catches the 402 error, checks the wallet, and aborts with a "Low Balance" error if it cannot pay.
- **Service Failure:** If a service is paid for but fails to execute, Axiom provides a **Refund Protocol** (currently in roadmap) to protect the payer.
