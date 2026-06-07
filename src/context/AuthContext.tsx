import { createContext, useEffect, useMemo, useState, type ReactNode } from 'react';

import { authService } from '@/src/services/authService';
import type { User } from '@/src/types';

// The shape of everything the rest of the app can read/do regarding auth.
export interface AuthContextValue {
  user: User | null;
  token: string | null;
  isLoading: boolean; // true while we restore a saved session on startup
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

// Created with `undefined` so that consuming it outside the provider throws a
// clear error (handled in hooks/useAuth.ts) instead of silently returning null.
export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore any saved session once, on app startup.
  useEffect(() => {
    // TODO (next turn): read the JWT from AsyncStorage, validate it, and if
    // valid set user/token here so the user stays logged in across restarts.
    // For now we simply finish "checking" and start logged-out.
    setIsLoading(false);
  }, []);

  async function login(email: string, password: string): Promise<void> {
    const res = await authService.login({ email, password });
    // TODO: await AsyncStorage.setItem('token', res.token);
    setToken(res.token);
    setUser(res.user);
  }

  async function register(name: string, email: string, password: string): Promise<void> {
    const res = await authService.register({ name, email, password });
    // TODO: await AsyncStorage.setItem('token', res.token);
    setToken(res.token);
    setUser(res.user);
  }

  async function logout(): Promise<void> {
    // TODO: await AsyncStorage.removeItem('token');
    setToken(null);
    setUser(null);
  }

  // useMemo keeps the context value stable between renders so consumers don't
  // re-render unless something actually changed.
  const value = useMemo<AuthContextValue>(
    () => ({ user, token, isLoading, login, register, logout }),
    [user, token, isLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
