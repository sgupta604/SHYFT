/**
 * SectionHeader — uppercase subtle label with an optional accent action link.
 * Ports .c-section from commons.css.
 */
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '@/lib/theme/colors';
import { fonts } from '@/lib/theme/type';

export type SectionHeaderProps = {
  title: string;
  action?: string;
  onAction?: () => void;
};

export function SectionHeader({ title, action, onAction }: SectionHeaderProps) {
  return (
    <View style={styles.row}>
      <Text style={styles.title}>{title.toUpperCase()}</Text>
      {action ? (
        <Pressable onPress={onAction} accessibilityRole="button">
          <Text style={styles.action}>{action}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 2,
    marginTop: 4,
  },
  title: {
    fontFamily: fonts.inter600,
    fontSize: 13,
    letterSpacing: 0.26,
    color: colors.textSubtle,
  },
  action: { fontFamily: fonts.inter500, fontSize: 12.5, color: colors.accent },
});

export default SectionHeader;
