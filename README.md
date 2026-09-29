# Find It Back

QR tags for your belongings. Frontend-only app (React 19 + Vite 8 + Tailwind 4), no backend needed.

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build -> dist/
npm run preview    # test the production build
```

Requires Node 20.19+ (Node 22 recommended, see `.nvmrc`).

## Deploy on Vercel

1. Push this folder to GitHub (node_modules and dist are git-ignored).
2. Vercel -> Add New Project -> import the repo.
3. Settings are auto-detected from `vercel.json` (Framework: Vite, Build: `npm run build`, Output: `dist`).
4. Deploy. No environment variables required.

Or with the CLI: `npx vercel --prod`

`vercel.json` rewrites every route to `index.html`, so deep links like `/i/ABC123` and `/manage/...` work when scanned or refreshed.
