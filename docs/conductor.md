# Axiom Conductor: The Orchestration Layer

## Overview
The Conductor is Axiom's flagship intelligent orchestration layer. It transforms high-level human goals into autonomous execution plans by coordinating multiple AI agents from the Capability Marketplace.

## Execution Lifecycle

### 1. Planning
The `PlanningService` analyzes the user's goal and decomposes it into a sequence of `SubTasks`. Each subtask identifies a required `Capability` (e.g., Writing, Design, SEO).

### 2. Discovery & Selection
For each planned task, the `SelectionService` queries the **Capability Registry**. It ranks available providers using an algorithm that balances **Reputation** and **Price**:
`Score = Reputation / (Price + 1)`

### 3. x402 Execution
The `ExecutorService` handles the technical invocation of the selected provider. It integrates with the **x402 Payment Engine** to handle the payment challenge and settlement automatically before calling the service endpoint.

### 4. Result Aggregation
As each capability returns a result, the Conductor collects and synthesizes them. The final output is a cohesive response that summarizes the entire orchestration job.

### 5. Failure Recovery
If a provider fails to deliver, the Conductor is designed to:
- Log the failure.
- Search for a fallback provider in the marketplace.
- Continue the workflow without terminating the entire job.

## API Usage
`POST /api/conductor/execute`
```json
{
  "goal": "Create a landing page for my startup"
}
```

## Data Tracking
Axiom tracks every orchestration job via:
- `Execution`: Stores the overall goal, status, total cost, and final result.
- `ExecutionStep`: Stores the details of each individual capability hire, including the provider used and the transaction ID.
