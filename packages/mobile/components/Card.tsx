/**
 * Card — white surface, 1px hairline, radius 20. Flat (no shadow) per Clarity:
 * color + border carry the surface, shadows are a last resort.
 * `pad` applies the standard 20px card padding; `onPress` makes it tappable.
 */
import type { ReactNode } from 'react';
import { Pressable, StyleSheet, View, type ViewStyle } from 'react-native';
import { colors } from '@/lib/theme/colors';
import { radii, space } from '@/lib/theme/spacing';

export type CardProps = {
  children: ReactNode;
  pad?: boolean;
  onPress?: () => void;
  style?: ViewStyle | ViewStyle[];
};

export function Card({ children, pad, onPress, style }: CardProps) {
  const base = [styles.card, pad && styles.pad, style];
  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [...base, pressed && styles.pressed]}
      >
        {children}
      </Pressable>
    );
  }
  return <View style={base}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.bgElev,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.xl,
  },
  pad: { padding: space[5] },
  pressed: { backgroundColor: colors.bgSubtle },
});

export default Card;
