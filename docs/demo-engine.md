# Axiom Demo Engine

## Overview
The Axiom Demo Engine is an automated system for reproducing the platform's core autonomous workflows and generating high-quality video demonstrations for hackathons and stakeholders.

## Setup
1. **Dependencies:** Ensure `ffmpeg` is installed and available in your system PATH.
2. **Installation:**
   ```bash
   cd demo-engine
   npm install
   ```

## Running the Demo
A single command orchestrates the entire process:
```bash
npm run demo
```

### What happens?
1. **Database Reset:** The engine wipes existing data and applies a fresh demo seed.
2. **Seeding:** Creates the "Axiom Demo User" and 4 specialized AI Providers (BrandForge, CopyMaster, SEO Genius, CodeGuardian).
3. **Browser Automation:** Playwright launches a Chromium instance and executes the scripted scenario.
4. **Recording:** Captures the browser session at 1080p.
5. **Post-processing:** FFmpeg converts the raw WebM recording into a production-ready MP4.

## Autonomous Scenario
The current scenario demonstrates:
- **Discovery:** Browsing the marketplace for providers.
- **Orchestration:** Using the Conductor to plan a complex goal ("Build a landing page for my AI startup").
- **Economic Layer:** Automatic x402 payment challenges and settlements.
- **Verification:** Auditing the wallet for transaction receipts.

## Troubleshooting
- **API Unreachable:** Ensure the backend is running at `localhost:5000` and frontend at `localhost:5173`.
- **FFmpeg Error:** The script will still save the raw WebM in `/recordings` if conversion fails.
- **Timeout:** If the orchestration takes longer than 60s, adjust the `timeout` in `scripts/run-demo.ts`.

## Output
- **Raw Recordings:** `demo-engine/recordings/*.webm`
- **Final Demo:** `demo-engine/output/axiom-demo.mp4`
