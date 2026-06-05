/**
 * ChannelRow — one Slack channel in the discovery directory. Tone-tinted icon
 * tile, #name + sub · members, and an "Open in Slack" secondary button (no-op
 * per plan Non-Goals). Ports Cards.jsx ChannelRow.
 */
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '@/components/Button';
import { IconTile } from '@/components/IconTile';
import type { Channel } from '@/lib/data/types';
import { scale, colors } from '@/lib/theme/colors';
import { fonts, type } from '@/lib/theme/type';

export type ChannelRowProps = {
  channel: Channel;
  last?: boolean;
};

export function ChannelRow({ channel: c, last }: ChannelRowProps) {
  const tone = c.tone === 'neutral' ? 'charcoal' : c.tone;
  return (
    <View style={[styles.row, !last && styles.divider]}>
      <IconTile icon={c.icon} bg={scale[tone][300]} fg={scale[tone][700]} size={40} />
      <View style={styles.text}>
        <Text style={styles.name} numberOfLines={1}>
          #{c.name}
        </Text>
        <Text style={styles.sub} numberOfLines={1}>
          {c.sub} · {c.members} members
        </Text>
      </View>
      <Button variant="secondary" size="sm" icon="external-link" onPress={() => {}}>
        Open in Slack
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12 },
  divider: { borderBottomWidth: 1, borderBottomColor: colors.border },
  text: { flex: 1, minWidth: 0 },
  name: { fontFamily: fonts.inter600, fontSize: 13.5, lineHeight: 16, color: colors.text },
  sub: { ...type.caption11, fontSize: 12, lineHeight: 17, marginTop: 2 },
});

export default ChannelRow;
