/**
 * IconTile — rounded category icon tile (radius 14). Defaults to the accent-soft
 * surface; feature cards pass tone-tinted bg/fg.
 */
import { StyleSheet, View } from 'react-native';
import { Icon } from './Icon';
import { colors } from '@/lib/theme/colors';
import { radii } from '@/lib/theme/spacing';

export type IconTileProps = {
  icon: string;
  bg?: string;
  fg?: string;
  size?: number;
  iconSize?: number;
};

export function IconTile({
  icon,
  bg = colors.accentSoft,
  fg = colors.accent,
  size = 44,
  iconSize,
}: IconTileProps) {
  return (
    <View style={[styles.tile, { width: size, height: size, backgroundColor: bg }]}>
      <Icon name={icon} size={iconSize ?? Math.round(size * 0.46)} color={fg} />
    </View>
  );
}

const styles = StyleSheet.create({
  tile: {
    borderRadius: radii.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default IconTile;
