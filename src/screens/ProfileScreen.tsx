import { Button, StyleSheet, Text, View } from 'react-native';

import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { useAuth } from '@/src/hooks/useAuth';

export default function ProfileScreen() {
  const scheme = useColorScheme();
  const colors = Colors[scheme];
  const { user, logout } = useAuth();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Profile</Text>
      <Text style={[styles.email, { color: colors.text }]}>{user?.email}</Text>

      {/* Logging out flips auth state -> the root layout swaps the App tabs
          for the Auth stack automatically. Try it. */}
      <View style={styles.button}>
        <Button title="Log out" color="#d9534f" onPress={logout} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
  },
  email: {
    fontSize: 15,
    marginTop: 8,
    marginBottom: 24,
    opacity: 0.6,
  },
  button: {
    width: '60%',
  },
});
