import { StyleSheet, Text, View, type ViewProps } from 'react-native';

import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';

// Reusable surface for each dashboard section: padded, rounded, subtle shadow,
// optional title. Theme-aware.
type CardProps = ViewProps & {
  title?: string;
};

export default function Card({ title, children, style, ...rest }: CardProps) {
  const scheme = useColorScheme();
  const colors = Colors[scheme];
  const surface = scheme === 'dark' ? '#1c1c1e' : '#ffffff';

  return (
    <View style={[styles.card, { backgroundColor: surface }, style]} {...rest}>
      {title ? <Text style={[styles.title, { color: colors.text }]}>{title}</Text> : null}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 14,
    padding: 16,
    gap: 10,
    // iOS shadow
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    // Android shadow
    elevation: 2,
  },
  title: {
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    opacity: 0.6,
  },
});
