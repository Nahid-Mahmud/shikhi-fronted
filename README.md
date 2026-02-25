# Shikhi — Frontend

Shikhi-frontend is a Next.js (App Router) React application that powers the web UI for the Shikhi platform. It pairs with the `shikhi-backend` API in this workspace to provide course browsing, enrollment, lessons, user auth, and dashboard features.

## Tech stack

- Next.js (App Router)
- React, TypeScript
- pnpm / npm / bun compatible
- Tailwind / CSS (project styles live in `src/app/globals.css`)

## Features

- Public course listings and search
- User authentication and profile
- Course enrollment and lesson playback
- Admin/dashboard pages (protected)

## Quick start

Requirements: Node.js 18+ and a package manager (pnpm, npm or bun).

1. Install dependencies:

```bash
cd shikhi-fronted
pnpm install
# or: npm install
```

2. Run the dev server:

```bash
pnpm dev
# or: npm run dev
```

3. Open http://localhost:3000

Build for production:

```bash
pnpm build
pnpm start
```

Run lint and tests (if available):

```bash
pnpm lint
pnpm test
```

## Environment

Common environment variables used by the frontend (add as needed in Vercel or `.env.local`):

- `NEXT_PUBLIC_API_URL` — URL of the backend API (e.g. `http://localhost:4000`)
- `NEXT_PUBLIC_CLOUDINARY_CLOUD` — cloud name for image uploads (if used)

Check `src/config` or `src/lib` for additional variables the app expects.

## Project structure (high-level)

- `src/app` — Next.js route/app components and global layout
- `src/components` — UI components
- `src/hooks` — React hooks and helpers
- `src/lib` / `src/service` — API clients and service utilities
- `public` — static assets

## Deploy

This app is ready for deployment on Vercel. The workspace contains a `vercel.json` config. For a quick deploy, connect the repository in Vercel and set required environment variables.

## Notes

- This frontend is developed to work with the `shikhi-backend` API in this workspace. Start the backend locally and set `NEXT_PUBLIC_API_URL` and `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` to point to it for full feature testing.

