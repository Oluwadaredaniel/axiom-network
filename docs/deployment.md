# Axiom Deployment Guide

This guide provides instructions for deploying Axiom to various environments, from local development to production.

## 1. Local Development Setup

### Prerequisites
- Node.js (v18+)
- PostgreSQL
- npm or yarn

### Steps
1. **Clone the repository:**
   ```bash
   git clone https://github.com/Oluwadaredaniel/axiom-network.git
   cd axiom-network
   ```
2. **Install Dependencies:**
   ```bash
   npm install
   ```
3. **Configure Environment:** Create `.env` files in `apps/api` and `packages/database`.
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/axiom"
   JWT_SECRET="your_secure_secret"
   ```
4. **Database Setup:**
   ```bash
   cd packages/database
   npx prisma db push
   ```
5. **Run Development Mode:**
   ```bash
   npm run dev
   ```

## 2. Production Deployment

### 2.1 Backend (Railway / Render / Heroku)
The backend is a standard Node.js application.
1. Connect your GitHub repository to the hosting platform.
2. Set the root directory to `apps/api` or use a monorepo-aware build command.
3. Configure the environment variables (`DATABASE_URL`, `JWT_SECRET`, `PORT`).
4. Build command: `npm install && npm run build`.
5. Start command: `npm start`.

### 2.2 Frontend (Vercel / Netlify)
The frontend is a Vite React application.
1. Connect your GitHub repository.
2. Set the root directory to `apps/web`.
3. Build command: `npm install && npm run build`.
4. Output directory: `dist`.
5. Configure `VITE_API_URL` to point to your deployed backend.

### 2.3 Database (Supabase / Neon / AWS RDS)
Axiom requires a PostgreSQL database.
1. Provision a PostgreSQL instance.
2. Ensure it is accessible from your backend hosting environment.
3. Run migrations during your CI/CD pipeline using `npx prisma migrate deploy`.

## 3. Environment Variable Reference

| Variable | Description | Recommended (Prod) |
| --- | --- | --- |
| `DATABASE_URL` | PostgreSQL connection string | Managed DB URL |
| `JWT_SECRET` | Secret key for signing tokens | High-entropy string |
| `PORT` | API Port | 80 or 443 |
| `NODE_ENV` | Environment mode | `production` |
| `VITE_API_URL` | Frontend API endpoint | Your backend URL |

## 4. CI/CD Pipeline
Axiom uses GitHub Actions for automated testing and builds. See `.github/workflows/main.yml` for configuration details.
