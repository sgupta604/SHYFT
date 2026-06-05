/**
 * PerkTile — one perk in the 2-col benefits grid. Tone-tinted icon tile, label,
 * sub. Pressable no-op (per plan Non-Goals). Ports Cards.jsx PerkTile.
 */
import { StyleSheet, Text, View } from 'react-native';
import { Card } from '@/components/Card';
import { Icon } from '@/components/Icon';
import { IconTile } from '@/components/IconTile';
import type { Perk } from '@/lib/data/types';
import { scale, colors } from '@/lib/theme/colors';
import { fonts, type } from '@/lib/theme/type';

export type PerkTileProps = {
  perk: Perk;
  onPress?: () => void;
};

export function PerkTile({ perk: p, onPress }: PerkTileProps) {
  const tone = p.tone === 'neutral' ? 'charcoal' : p.tone;
  return (
    <Card onPress={onPress} style={styles.card}>
      <View style={styles.top}>
        <IconTile icon={p.icon} bg={scale[tone][300]} fg={scale[tone][700]} size={38} />
        <Icon name="chevron-right" size={17} color={colors.textSubtle} />
      </View>
      <View>
        <Text style={styles.label}>{p.label}</Text>
        <Text style={styles.sub}>{p.sub}</Text>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { flex: 1, padding: 14, gap: 10 },
  top: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  label: { fontFamily: fonts.inter600, fontSize: 13, lineHeight: 16, color: colors.text },
  sub: { ...type.caption11, fontSize: 12, lineHeight: 17, marginTop: 3 },
});

export default PerkTile;
