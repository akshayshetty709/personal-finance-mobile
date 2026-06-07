import { Redirect } from 'expo-router';

import { useAuth } from '@/src/hooks/useAuth';

// Entry route for '/'. It owns no UI — it just points the user at the right
// place. The Stack.Protected gate in _layout.tsx still enforces access; this
// is here so launching the app lands on a concrete screen.
export default function Index() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  return <Redirect href={user ? '/dashboard' : '/login'} />;
}
