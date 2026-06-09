import { memo } from 'react';
import { StyleSheet, View } from 'react-native';

import { useColorScheme } from '@/components/useColorScheme';

// A horizontal progress bar. `percent` may exceed 100 (over budget); we clamp
// the fill width but the caller colors it red to signal the overage.
// memo: it's a pure leaf with primitive props, rendered many times in lists.
type ProgressBarProps = {
  percent: number;
  color: string;
};

function ProgressBar({ percent, color }: ProgressBarProps) {
  const scheme = useColorScheme();
  const track = scheme === 'dark' ? '#3a3a3c' : '#e5e5ea';
  const clamped = Math.max(0, Math.min(100, percent));

  return (
    <View style={[styles.track, { backgroundColor: track }]}>
      <View style={[styles.fill, { width: `${clamped}%`, backgroundColor: color }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 4,
  },
});

export default memo(ProgressBar);
