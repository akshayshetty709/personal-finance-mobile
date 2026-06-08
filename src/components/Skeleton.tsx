import { useEffect, useRef } from 'react';
import { Animated, type DimensionValue, type StyleProp, type ViewStyle } from 'react-native';

import { useColorScheme } from '@/components/useColorScheme';

// A shimmering placeholder block. Unlike a spinner, it mimics the SHAPE of the
// content that's coming, so the layout doesn't jump when data arrives.
type SkeletonProps = {
  width?: DimensionValue;
  height?: number;
  style?: StyleProp<ViewStyle>;
};

export default function Skeleton({ width = '100%', height = 16, style }: SkeletonProps) {
  const opacity = useRef(new Animated.Value(0.3)).current;
  const scheme = useColorScheme();
  const background = scheme === 'dark' ? '#3a3a3c' : '#e1e1e6';

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 1, duration: 700, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.3, duration: 700, useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [opacity]);

  return (
    <Animated.View
      style={[{ width, height, borderRadius: 6, backgroundColor: background, opacity }, style]}
    />
  );
}
