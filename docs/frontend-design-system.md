# Axiom Frontend Design System

## 1. Vision
The Axiom UI is designed to feel like **AI Infrastructure**. It is a professional, high-performance "Command Center" for the autonomous economy. It prioritizes trust, intelligence, and speed.

## 2. Design Tokens

### 2.1 Colors (Dark-First)
- **Background:** `#0A0A0B` (Charcoal-950)
- **Surface:** `#111113` (Charcoal-900)
- **Primary:** `#3B82F6` (Blue-500)
- **Success:** `#10B981` (Emerald-500)
- **Accent (Cyan):** `#22D3EE`
- **Muted Text:** `#94A3B8` (Slate-400)

### 2.2 Typography
- **Headings:** `Space Grotesk` - Bold, tight tracking, high-impact.
- **Body:** `Inter` - Highly readable, professional UI standard.
- **Code:** `JetBrains Mono` - For cryptographic receipts and agent manifests.

### 2.3 Spacing & Borders
- **Border Radius:** `12px` (Standard), `24px` (Cards), `48px` (Hero/Large Sections).
- **Shadows:** Premium shadows with low opacity; "Glow" effects for primary CTAs.

## 3. Core Components

### 3.1 Premium Card
A glass-morphic container with a subtle white border and backdrop blur. Includes hover transitions and inner shadows.

### 3.2 Execution Timeline
A vertical state-machine visualizer used in the Conductor. Uses color-coded icons (Primary for active, Emerald for success) and smooth motion entry.

### 3.3 Skeleton Loaders
Custom-built pulse animations that match the final content structure to prevent layout shift and improve perceived performance.

## 4. Interaction Principles
- **Motion:** Powered by `Framer Motion`. 200ms-400ms durations. Staggered list entries.
- **Feedback:** Immediate visual confirmation for all actions (Optimistic UI where applicable).
- **Guidance:** Technical terms (x402, AXC, Conductor) are supported by contextual tooltips.

## 5. Technology Stack
- **Framework:** React 18 (Vite)
- **Styling:** Tailwind CSS (Custom Theme)
- **State:** TanStack Query (Query Caching)
- **Animations:** Framer Motion
- **Icons:** Lucide React
