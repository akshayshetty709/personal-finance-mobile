// Shared TypeScript interfaces for the whole app.
// CLAUDE.md rule: "TypeScript everywhere — no any types".
// Every API request/response shape lives here so screens, services and the
// auth context all agree on the same contract.

export interface User {
  id: string;
  email: string;
  name: string;
}

/** What the Spring Boot API returns from /auth/login and /auth/register. */
export interface AuthResponse {
  token: string; // JWT — stored in AsyncStorage (see CLAUDE.md)
  user: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}
