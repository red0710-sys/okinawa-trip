# Okinawa Trip V3.0.2 — Independent

Floot-free deployment: static mobile web app + Vercel Serverless Functions.

## Production architecture

GitHub → Vercel → Vercel AI Gateway → OpenAI

On a new Vercel deployment, AI requests prefer Vercel's short-lived OIDC identity (`VERCEL_OIDC_TOKEN`), so no OpenAI provider key is stored in the repo or browser. `AI_GATEWAY_API_KEY` and `OPENAI_API_KEY` remain optional fallbacks for local or non-Vercel hosting.

## Deploy

1. Push this folder to GitHub.
2. Import the repo in Vercel.
3. Framework preset: **Other**. No build command is required.
4. Deploy.
5. Verify `/api/health`, Explore web search, and AI PLAN.

All trip/user data remains browser-local via localStorage.
