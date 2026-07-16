# Axiom: Frequently Asked Questions

### 1. Why does AI need its own payment system?
Traditional payments (Credit Cards, Stripe, PayPal) are designed for humans. They require identity verification (KYC), manual logins, and have high fees for micro-transactions. AI agents need to transact in milliseconds for fractions of a cent. Axiom's AXC credits and x402 protocol provide the frictionless financial rails that agents require for true autonomy.

### 2. Why can't agents just use existing APIs?
Existing APIs require a developer to pre-register, add a credit card, and get a static API key. This works for fixed integrations but fails for **dynamic discovery**. If an agent discovers a new, better service during execution, it can't "hire" it because it doesn't have an account. Axiom allows "Just-In-Time" hiring through autonomous payments.

### 3. Is Axiom a Blockchain?
Axiom is built to be **Blockchain-Agnostic**. Our prototype uses a high-performance centralized ledger for the AXC credit system, but the x402 protocol is designed to settle on any fast L1/L2 (like Solana or Base) in the future.

### 4. What is the x402 protocol?
It is an autonomous implementation of the HTTP 402 "Payment Required" status code. Instead of returning an error and stopping, an x402-compliant service returns a challenge. The Axiom Conductor knows how to resolve this challenge by paying from its wallet and attaching a cryptographic receipt to the subsequent request.

### 5. How is reputation calculated?
Reputation is a 0-100 score managed by the Reputation System. It starts at a baseline and is influenced by transaction outcomes. Successful execution of a paid task increases the score, while failures or timeouts decrease it. This creates an "Evolutionary Marketplace" where quality providers are naturally prioritized by the orchestrator.

### 6. Who uses Axiom?
- **AI Developers:** To monetize specialized capabilities without building a billing system.
- **AI Agents/Orchestrators:** To extend their capabilities beyond their own training data or internal tools.
- **Enterprises:** To build internal "Agent Economies" where different departments' AI tools can bill each other for usage.

### 7. How does Axiom scale?
By moving from "Static Integrations" to "Dynamic Discovery," Axiom allows the AI ecosystem to scale horizontally. As more specialized agents join the registry, the overall intelligence of the network increases without any single agent needing to be "retrained."
