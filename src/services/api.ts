// Central API configuration.
//
// CLAUDE.md rules enforced here:
//   - "All API calls go through services/ layer"
//   - "Never call axios directly from screens"
// The service layer (this folder) is the ONLY place that talks to the network.
// Screens call hooks/context, which call services — never axios directly.

// __DEV__ is a React Native global: true in development, false in a release build.
export const API_BASE_URL = __DEV__
  ? 'http://localhost:8080' // Spring Boot dev server
  : 'https://your-aws-url.com'; // production (move to .env before shipping)

// ─────────────────────────────────────────────────────────────────────────
// NEXT STEP (not done yet, kept out of this turn to avoid a native rebuild):
// install axios + AsyncStorage, then create the shared, authenticated client:
//
//   import axios from 'axios';
//   import AsyncStorage from '@react-native-async-storage/async-storage';
//
//   export const api = axios.create({ baseURL: API_BASE_URL });
//
//   // Attach the JWT to every request automatically.
//   api.interceptors.request.use(async (config) => {
//     const token = await AsyncStorage.getItem('token');
//     if (token) config.headers.Authorization = `Bearer ${token}`;
//     return config;
//   });
//
// Because authService below already returns typed AuthResponse values, swapping
// the mock for real axios calls won't require any changes in screens or context.
// ─────────────────────────────────────────────────────────────────────────
