// Centralized route paths.
//
// NOTE on architecture: with Expo Router the *structural* navigation config
// (which stacks/tabs exist, and the auth gate) lives in the app/ folder's
// `_layout.tsx` files — that is the equivalent of hand-written React Navigation
// navigators. This file just holds the string paths in one place so we don't
// sprinkle magic strings like '/dashboard' across the codebase.

export const ROUTES = {
  // Auth stack
  login: '/login',
  register: '/register',
  // App tabs
  dashboard: '/dashboard',
  transactions: '/transactions',
  budgets: '/budgets',
  alerts: '/alerts',
  profile: '/profile',
} as const;

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];
