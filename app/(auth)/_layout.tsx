import { Stack } from 'expo-router';

// AuthStack — shown only when logged out (gated in app/_layout.tsx).
// A plain stack navigator: Login is first, Register pushes on top.
export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
    </Stack>
  );
}
