---
name: Sanity CORS Configuration
description: Sanity API requires domain allowlisting for browser fetch to work without CORS errors
---

## Rule
Add every domain (dev + prod) to Sanity project's CORS origins before data fetches work.

**Why:** Sanity's API (`api.sanity.io`) blocks browser requests from unlisted origins regardless of `useCdn` setting. The error is `No 'Access-Control-Allow-Origin' header present`. All components must have static fallback data so the site renders even before CORS is configured.

**How to apply:**
1. Go to sanity.io/manage → select project → Settings → API → CORS Origins
2. Add: `http://localhost:5000` (dev), `https://<your-replit-app>.replit.app` (production)
3. Allow credentials is NOT needed for public dataset reads

Project ID used: `1hjglvj8`, dataset: `production`
