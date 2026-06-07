import type { AuthResponse, LoginRequest, RegisterRequest } from '@/src/types';

// MOCK auth service.
//
// Right now this fakes the network so the navigation/auth flow is fully
// runnable without the backend. When the Spring Boot API is ready, replace the
// bodies with axios calls (see api.ts) — the function SIGNATURES stay identical,
// so nothing else in the app has to change.

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const authService = {
  async login(req: LoginRequest): Promise<AuthResponse> {
    await delay(600); // simulate latency so loading states are visible
    if (!req.email || !req.password) {
      throw new Error('Email and password are required');
    }
    // Real version: return (await api.post<AuthResponse>('/auth/login', req)).data;
    return {
      token: 'mock-jwt-token',
      user: { id: '1', email: req.email, name: 'Demo User' },
    };
  },

  async register(req: RegisterRequest): Promise<AuthResponse> {
    await delay(600);
    if (!req.email || !req.password || !req.name) {
      throw new Error('Name, email and password are required');
    }
    // Real version: return (await api.post<AuthResponse>('/auth/register', req)).data;
    return {
      token: 'mock-jwt-token',
      user: { id: '1', email: req.email, name: req.name },
    };
  },
};
