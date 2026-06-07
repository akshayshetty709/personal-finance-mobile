import { Link } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { useAuth } from '@/src/hooks/useAuth';
import { isValidEmail } from '@/src/utils/validators';

export default function LoginScreen() {
  const scheme = useColorScheme();
  const colors = Colors[scheme];
  const { login } = useAuth();

  // Pre-filled with the demo credentials so you can log in with one tap.
  const [email, setEmail] = useState('demo@example.com');
  const [password, setPassword] = useState('password');

  // CLAUDE.md rule: "Handle loading and error states on every screen".
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin() {
    if (!isValidEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
      // No manual navigation needed: once `user` is set, the root layout
      // swaps the Auth stack for the App tabs automatically.
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Login failed.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Welcome back</Text>

      <TextInput
        style={[styles.input, { color: colors.text, borderColor: colors.tabIconDefault }]}
        placeholder="Email"
        placeholderTextColor={colors.tabIconDefault}
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={[styles.input, { color: colors.text, borderColor: colors.tabIconDefault }]}
        placeholder="Password"
        placeholderTextColor={colors.tabIconDefault}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      {loading ? (
        <ActivityIndicator style={styles.spinner} />
      ) : (
        <Button title="Log in" onPress={handleLogin} />
      )}

      <Link href="/register" style={styles.link}>
        <Text style={{ color: colors.tint }}>No account? Register</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    gap: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  error: {
    color: '#d9534f',
  },
  spinner: {
    paddingVertical: 8,
  },
  link: {
    marginTop: 16,
    alignSelf: 'center',
  },
});
