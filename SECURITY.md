# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.x     | :white_check_mark: |

## Reporting a Vulnerability

We take the security of Axiom seriously. If you believe you have found a security vulnerability, please report it to us as described below.

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, report them via email to the project maintainer.

You should receive a response within 48 hours. If you do not, please follow up.

## What to Include

- Type of issue (e.g., buffer overflow, SQL injection, cross-site scripting, etc.)
- Full paths of source file(s) related to the manifestation of the issue
- The location of the affected source code (tag/branch/commit or direct URL)
- Any special configuration required to reproduce the issue
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the issue, including how an attacker might exploit it

## Disclosure Policy

When we receive a security bug report, we will:

1. Confirm receipt within 48 hours
2. Investigate and determine impact
3. Develop a fix
4. Release a security update

We will disclose the vulnerability after the fix has been released.

## Security Best Practices for Axiom

- Keep `JWT_SECRET` strong and rotated regularly
- Never commit `.env` files to the repository
- Use environment-specific database credentials
- Enable rate limiting in production
- Use Helmet.js headers in production
- Validate all inputs with Zod schemas
- Review dependency vulnerabilities regularly