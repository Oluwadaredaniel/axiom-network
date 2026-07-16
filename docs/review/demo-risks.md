# Demo Risk Assessment

## 1. Risk: "The Empty Marketplace"
**Scenario:** Database is empty, Conductor finds no providers.
**Mitigation:** `npm run demo` includes a `seed` step that guarantees 4 high-quality providers (BrandForge, CopyMaster, etc.) are always present.

## 2. Risk: "Wallet Depletion"
**Scenario:** The demo user has 0 AXC and fails the first x402 challenge.
**Mitigation:** The seed script pre-loads the "Demo Controller Agent" with **5000 AXC**, more than enough for hundreds of demo runs.

## 3. Risk: "LLM Hallucination"
**Scenario:** The Conductor plans steps that don't match any registered capability.
**Mitigation:** The Conductor uses a **Capability Manifest** mapping. It only plans for capabilities that are known to exist in the registry.

## 4. Risk: "UI Lag"
**Scenario:** Slow network causes the demo recording to look "stuttery."
**Mitigation:** Playwright recording is performed locally. The `run-demo.ts` script includes explicit `waitForTimeout` and `waitForSelector` calls to ensure smooth transitions.

## 5. Risk: "Database Desync"
**Scenario:** Old demo data interferes with a new run.
**Mitigation:** The first step of the demo runner is a `deleteMany()` on all critical tables, ensuring a **total environment reset**.
