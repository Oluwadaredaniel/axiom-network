# Neon PostgreSQL Setup Guide

Axiom uses **Neon PostgreSQL** as its primary cloud database provider for the AI economic ledger. This guide explains how to set up and maintain the database.

## 1. Prerequisites
- A Neon account (neon.tech)
- Node.js and npm installed
- Prisma CLI installed (`npm install -g prisma`)

## 2. Configuration
The database connection is managed via the `DATABASE_URL` environment variable.

### `.env` File Locations:
- `apps/api/.env`
- `packages/database/.env`

### URL Format:
```env
DATABASE_URL="postgresql://[user]:[password]@[host]/[database]?sslmode=require"
```

## 3. Initialization
Axiom uses a shared database package for schema management.

1. **Navigate to the database package:**
   ```bash
   cd packages/database
   ```

2. **Push the schema to Neon:**
   This command synchronizes your `schema.prisma` with the Neon cloud instance.
   ```bash
   npx prisma db push
   ```

3. **Generate the Client:**
   ```bash
   npx prisma generate
   ```

## 4. Troubleshooting
- **P1001 (Can't reach database):** Ensure your network allows outbound connections on port 5432. If using a pooler URL, ensure it is formatted correctly.
- **P1000 (Authentication failed):** Double-check the password in your `DATABASE_URL`. Note that Neon passwords often contain special characters that must be URL-encoded.
- **SSL Issues:** Always append `?sslmode=require` to your connection string.

## 5. Development Workflow
When making changes to the data model:
1. Update `packages/database/prisma/schema.prisma`.
2. Run `npx prisma db push` to update the cloud DB.
3. Run `npx prisma generate` to update types.
