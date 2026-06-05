/**
 * Avatar — initials on a deterministic per-name tone (8-tone palette).
 * Optional `ring` draws a 2px ring separated from the surface (overlap stacks).
 */
import { StyleSheet, Text, View } from 'react-native';
import { avatarTone, initials } from '@/lib/utils/avatar';
import { colors } from '@/lib/theme/colors';
import { fonts } from '@/lib/theme/type';

export type AvatarProps = {
  name?: string;
  size?: number;
  ring?: string;
};

export function Avatar({ name = '', size = 38, ring }: AvatarProps) {
  return (
    <View
      style={[
        styles.base,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: avatarTone(name),
        },
        ring ? { borderWidth: 2, borderColor: ring } : null,
      ]}
    >
      <Text style={[styles.txt, { fontSize: size * 0.4 }]}>{initials(name)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  txt: {
    fontFamily: fonts.inter600,
    color: colors.white,
  },
});

export default Avatar;
