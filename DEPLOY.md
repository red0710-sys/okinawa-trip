# Deploy checklist

- Host: Vercel
- Repo: GitHub
- Framework preset: Other
- Build command: none
- Root directory: repository root
- Preferred AI auth: automatic Vercel OIDC → AI Gateway
- Optional fallback secrets: `AI_GATEWAY_API_KEY` or `OPENAI_API_KEY`

After deployment verify:
1. `/api/health` returns `{ ok: true }`.
2. Home page loads `app.js` and `app.css`.
3. Explore online search returns cited web results.
4. AI PLAN returns a complete Day 1-N itinerary.
