# Axiom Frontend Architecture

## Overview
The Axiom frontend is built with React, TypeScript, and Vite. It serves as a professional "Command Center" for the AI economy, following design principles from high-end platforms like Stripe, Vercel, and Linear.

## Tech Stack
- **Framework:** React 18
- **Build Tool:** Vite
- **Styling:** Tailwind CSS + Framer Motion
- **State Management:** TanStack Query (React Query)
- **Routing:** React Router DOM v6
- **Icons:** Lucide React

## Design System
- **Typography:** Clash Display (headings), Sora (body), Fraunces (editorial italic), JetBrains Mono (code)
- **Colors (dark):** Monochrome value hierarchy — white → white/40 → white/20 → white/10
- **Components:** Custom-built with double-bezel cards, glassmorphism, terminal-style elements

## Project Structure
- `src/components`: Reusable UI primitives (Buttons, Cards, Modals).
- `src/pages`: Main application screens (Marketplace, Conductor, Wallet).
- `src/hooks`: Custom React hooks for shared logic.
- `src/services`: API abstraction layer using Axios.
- `src/utils`: Helper functions and API interceptors.

## Key Experiences

### 1. The Conductor (Orchestrator UI)
The flagship experience where users enter natural language goals. It features a real-time execution timeline showing the "thoughts" and actions of the orchestrator as it hires and pays providers.

### 2. Capability Marketplace
A grid-based discovery engine for AI agents. Supports filtering by category and sorting by reputation/price. Each card provides a "quick look" at the economic manifest of the agent.

### 3. Wallet Dashboard
A financial control center showing AXC balance, transaction history, and cryptographic receipts for all autonomous service calls.

## Authentication
Uses JWT stored in `localStorage`. An Axios interceptor automatically attaches the `Authorization: Bearer <token>` header to all outgoing requests to `/api`.
