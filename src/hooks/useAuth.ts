import { useContext } from 'react';

import { AuthContext, type AuthContextValue } from '@/src/context/AuthContext';

// Custom hook so screens write `const { user, login } = useAuth()` instead of
// importing useContext + AuthContext everywhere. It also guarantees the
// provider is present, turning a confusing runtime bug into a clear error.
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an <AuthProvider>');
  }
  return ctx;
}
