    # CLAUDE.md

    ## Project
    Personal Finance Tracker — React Native Mobile App
    React Native + Expo + TypeScript

    ## Connects To
    Spring Boot API: http://localhost:8080 (dev)
    Production API: https://your-aws-url.com (prod)

    ## Architecture
    Routing is **Expo Router** (file-based). Expo Router is built on React
    Navigation, so Stack/Tabs concepts still apply — they're configured via files
    and `_layout.tsx` instead of imperative navigators.

    - app/ — routing layer ONLY. Route files are thin re-exports of src/screens.
    - app/_layout.tsx — AuthProvider + auth gate (Stack.Protected)
    - app/index.tsx — '/' entry, redirects to /dashboard or /login
    - app/(auth)/ — logged-out stack: login, register
    - app/(app)/ — logged-in Bottom Tabs: dashboard, transactions, budgets, alerts, profile
    - src/screens/ — one file per screen (actual UI)
    - src/components/ — reusable UI components
    - src/services/ — API calls (axios) — the ONLY place that talks to the network
    - src/hooks/ — custom React hooks (e.g. useAuth)
    - src/context/ — global state (AuthContext)
    - src/navigation/ — shared route path constants (structural nav config lives in app/_layout files)
    - src/utils/ — helpers
    - src/types/ — shared TypeScript interfaces

    Path alias: `@/*` maps to the project root, so import as `@/src/...`.

    ## Rules
    - TypeScript everywhere — no any types
    - JWT stored in AsyncStorage
    - All API calls go through services/ layer
    - Never call axios directly from screens
    - Handle loading and error states on every screen
    - New screens: add the UI in src/screens, then a thin re-export route file in app/
    - Auth is state-driven — change auth state via useAuth(), don't manually
    navigate between the auth and app stacks

    ## Current Status
    - Navigation, auth gate, and placeholder screens are in place.
    - Data layer is a MOCK: src/services/authService.ts returns fake data; axios and
    AsyncStorage are NOT installed yet. src/services/api.ts has the real client
    code ready to drop in. Service function signatures are final, so swapping the
    mock for real API calls won't require changes in screens or context.

    ## API Base URL
    Dev: http://localhost:8080
    Prod: set in .env file