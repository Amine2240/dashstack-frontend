# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at http://localhost:3000
npm run build    # Production build (TS and ESLint errors are suppressed — see next.config.mjs)
npm run lint     # Run ESLint
npm run start    # Start production server
```

No test suite is configured.

## Environment Variables

Create a `.env.local` file with:

```
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=
```

The backend base URL defaults to `http://localhost:4000` when `NEXT_PUBLIC_API_URL` is unset. Always import `API_URL` from `lib/api.ts` for all `axios` calls — never hardcode the base URL.

## Architecture

**Next.js 14 App Router** project for a manufacturing analytics dashboard.

### Auth flow

- `app/context/auth.js` — `AuthProvider` / `useAuth` hook. Auth state is stored in `localStorage` under the key `"user"` and loaded into React context on mount. No token refresh or expiry is handled client-side.
- `app/layout.tsx` — wraps the entire app in `AuthProvider`, renders `Sidebar` + `Navbar`, and registers the FCM push token on mount via `firebase.js`.
- Unauthenticated users are redirected to `app/auth/login/`.

### Layout shell

`app/layout.tsx` owns the collapsible sidebar state (`isSidebarOpen`). It passes `toggleSidebar` down to both `components/sidebar.tsx` and `components/navbar.tsx`. Page content sits next to the sidebar — no separate layout per route segment.

### API layer

All HTTP calls use `axios` with `API_URL` from `lib/api.ts`. There is no centralised request/response interceptor or auth header injection — each component calls axios directly and passes credentials as needed.

### Notifications (Firebase Cloud Messaging)

`firebase.js` initialises the Firebase app and exports `messaging` (only in browser environments with Notification support). `app/layout.tsx` calls `getAndSendFCMToken()` on mount to register the device token with the backend (`POST /notifications/save-token`). The service worker is at `public/firebase-messaging-sw.js`.

### Key pages and their primary components

| Route | Main component |
|---|---|
| `/dashboard` | `components/dashboard.tsx` — KPI cards + AI energy summary |
| `/machines` | `app/machines/page.tsx` — MUI DataGrid of all machines |
| `/machines/<type>logs` | Per-machine log pages (agvslogs, cncmachineslogs, etc.) |
| `/datavisualization` | `components/visualization.tsx` + `components/chartvisualization/` |
| `/anomalies` | `components/anomaly.tsx` |
| `/reports` | `app/reports/` |
| `/schedule` | `components/scheduelcalender.tsx` |
| `/settings` | `app/settings/page.tsx` |

### Chart components

- `components/charts/` — per-machine chart wrappers (used on machine log pages)
- `components/chartvisualization/` — topic-scoped charts (energy, production, quality, etc.) used on the data visualization page
- All charts use `react-chartjs-2` / `chart.js`

### Styling conventions

- Tailwind CSS with CSS custom properties for theming (see `app/globals.css` for `--background`, `--primary`, etc.)
- Reusable utility classes `surface` and `content-shell` are defined in `globals.css` — use them for card/page containers instead of one-off Tailwind strings.
- MUI (`@mui/material`, `@mui/x-data-grid`) is used specifically for the machines table. Avoid introducing MUI elsewhere; use Tailwind for everything else.
