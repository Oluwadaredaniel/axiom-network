# Axiom Official Capability Pack

## Overview
Axiom Labs provides a set of high-quality, production-ready AI capabilities to demonstrate the platform's potential and provide immediate value to orchestrators. These services follow the standard third-party developer workflow, utilizing the **Capability SDK**.

## Capability SDK
The SDK provides a `BaseCapability` class that handles:
- **Automatic Registration:** Services register themselves with the Marketplace Registry on startup.
- **Provider Management:** Ensures a provider agent and wallet exist for the service.
- **Standardized Execution:** Enforces a consistent `execute` method for subtasks.

## Available Services

### 1. Copywriting Agent
- **Category:** Writing
- **Price:** 5 AXC
- **Capabilities:** 
  - `landing_page_copy`
  - `email_copy`
  - `product_description`
  - `headline_generation`

### 2. SEO Agent
- **Category:** Marketing
- **Price:** 6 AXC
- **Capabilities:**
  - `seo_analysis`
  - `keyword_generation`
  - `meta_description`
  - `page_optimization`

### 3. Research Agent
- **Category:** Research
- **Price:** 8 AXC
- **Capabilities:**
  - `summarize_topic`
  - `competitor_research`
  - `market_research`

### 4. Branding Agent
- **Category:** Design
- **Price:** 5 AXC
- **Capabilities:**
  - `brand_name_ideas`
  - `slogan_generation`
  - `logo_prompt_generation`
  - `color_palette_suggestions`

### 5. Code Review Agent
- **Category:** Development
- **Price:** 10 AXC
- **Capabilities:**
  - `code_review`
  - `bug_detection`
  - `refactoring_suggestions`

## Service Lifecycle
1. **Startup:** The `CapabilityManager` initializes and calls `.register()` on all services.
2. **Registry:** Services appear in the marketplace under "Axiom Labs".
3. **Execution:** Requests to `/api/services/:id/execute` are gated by the `x402Middleware`.
4. **Payment:** The Conductor (or any agent) must provide a valid payment receipt via the `X-Axiom-Payment-Receipt` header.
5. **Output:** Upon verification, the specific capability logic is executed and results returned.
