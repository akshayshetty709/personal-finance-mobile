import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';

// Shown when a REAL request fails (network error / 5xx) — not for the AI
// endpoints' 200-with-fallback-text. `center` fills a screen; default is inline
// for use inside a card.
type ErrorStateProps = {
  message?: string;
  onRetry: () => void;
  center?: boolean;
};

export default function ErrorState({ message, onRetry, center }: ErrorStateProps) {
  const scheme = useColorScheme();
  const colors = Colors[scheme];

  return (
    <View style={[styles.container, center && styles.center]}>
      <Text style={[styles.message, { color: colors.text }]}>
        {message ?? 'Couldn’t load. Please try again.'}
      </Text>
      <Pressable onPress={onRetry} style={[styles.retryBtn, { borderColor: colors.tint }]}>
        <Ionicons name="refresh" size={16} color={colors.tint} />
        <Text style={{ color: colors.tint, fontWeight: '600' }}>Retry</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
    alignItems: 'flex-start',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  message: {
    fontSize: 14,
    opacity: 0.7,
    textAlign: 'center',
  },
  retryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 7,
  },
});
