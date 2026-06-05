/**
 * Button — primary / secondary / ghost, block + sm, optional leading icon.
 * Ports .c-btn from commons.css. Pressed state nudges the background per variant.
 */
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Icon } from './Icon';
import { colors } from '@/lib/theme/colors';
import { radii } from '@/lib/theme/spacing';
import { fonts } from '@/lib/theme/type';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';

export type ButtonProps = {
  children: string;
  variant?: ButtonVariant;
  size?: 'sm' | 'md';
  block?: boolean;
  icon?: string;
  onPress?: () => void;
};

const FG: Record<ButtonVariant, string> = {
  primary: colors.white,
  secondary: colors.text,
  ghost: colors.accent,
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  block,
  icon,
  onPress,
}: ButtonProps) {
  const sm = size === 'sm';
  const fg = FG[variant];
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        sm ? styles.sm : styles.md,
        variant === 'primary' && { backgroundColor: pressed ? colors.accentHover : colors.accent },
        variant === 'secondary' && {
          backgroundColor: pressed ? colors.bgSubtle : colors.bgElev,
          borderColor: colors.borderStrong,
          borderWidth: 1,
        },
        variant === 'ghost' && { backgroundColor: 'transparent' },
        block && styles.block,
      ]}
    >
      <View style={styles.inner}>
        {icon ? <Icon name={icon} size={sm ? 15 : 17} color={fg} /> : null}
        <Text style={[styles.label, sm ? styles.labelSm : null, { color: fg }]}>{children}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
  inner: { flexDirection: 'row', alignItems: 'center', gap: 7 },
  md: { height: 40, paddingHorizontal: 16 },
  sm: { height: 32, paddingHorizontal: 12 },
  block: { alignSelf: 'stretch', width: '100%' },
  label: { fontFamily: fonts.inter600, fontSize: 14 },
  labelSm: { fontSize: 12.5 },
});

export default Button;
