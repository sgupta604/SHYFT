/**
 * Tag — category / metadata chip on a subtle surface.
 * Ports .c-tag from commons.css.
 */
import type { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '@/lib/theme/colors';
import { fonts } from '@/lib/theme/type';

export type TagProps = { children: ReactNode };

export function Tag({ children }: TagProps) {
  return (
    <View style={styles.tag}>
      <Text style={styles.label}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: colors.bgSubtle,
    alignSelf: 'flex-start',
  },
  label: { fontFamily: fonts.inter500, fontSize: 12, color: colors.textMuted },
});

export default Tag;
