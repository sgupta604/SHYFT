/**
 * KudosCard — a kudos card. Ports KudosCard from Cards.jsx:
 *   from-avatar + "X gave kudos to Y" line, a value pill (tone by value),
 *   the message, then a footer with the time and a cheer chip.
 * The cheer chip toggles through useKudosStore (passed in as onCheer) so the
 * count stays in sync between the Today card and the all-kudos sheet.
 */
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Avatar } from '@/components/Avatar';
import { Card } from '@/components/Card';
import { Icon } from '@/components/Icon';
import { Pill } from '@/components/Pill';
import { colors, type Tone } from '@/lib/theme/colors';
import { radii } from '@/lib/theme/spacing';
import { fonts, type } from '@/lib/theme/type';
import type { Kudo } from '@/lib/data/types';

const VALUE_TONE: Record<string, Tone> = {
  'Customer obsession': 'blue',
  Ownership: 'green',
  Craft: 'purple',
  Team: 'orange',
};

export type KudosCardProps = {
  kudo: Kudo;
  onCheer: (id: string) => void;
};

export function KudosCard({ kudo, onCheer }: KudosCardProps) {
  const k = kudo;
  return (
    <Card pad>
      <View style={styles.head}>
        <Avatar name={k.from} size={34} />
        <Text style={styles.line}>
          <Text style={styles.strong}>{k.from}</Text>
          <Text style={styles.muted}> gave kudos to </Text>
          <Text style={styles.strong}>{k.to}</Text>
        </Text>
      </View>

      <View style={styles.pillRow}>
        <Pill tone={VALUE_TONE[k.value] ?? 'blue'} dot>
          {k.value}
        </Pill>
      </View>

      <Text style={[type.body14, styles.text]}>{k.text}</Text>

      <View style={styles.footer}>
        <Text style={[type.label12, styles.time]}>{k.time}</Text>
        <Pressable
          onPress={() => onCheer(k.id)}
          accessibilityRole="button"
          style={[styles.cheer, k.cheered ? styles.cheerOn : styles.cheerOff]}
        >
          <Icon
            name="party-popper"
            size={15}
            color={k.cheered ? colors.accent : colors.textMuted}
          />
          <Text style={[styles.cheerCount, { color: k.cheered ? colors.accent : colors.textMuted }]}>
            {k.cheers}
          </Text>
        </Pressable>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  head: { flexDirection: 'row', alignItems: 'center', gap: 9 },
  line: { flex: 1 },
  strong: { fontFamily: fonts.inter600, fontSize: 13.5, lineHeight: 18, color: colors.text },
  muted: { fontFamily: fonts.inter400, fontSize: 13.5, lineHeight: 18, color: colors.textSubtle },
  pillRow: { marginTop: 10, flexDirection: 'row' },
  text: { color: colors.text, marginTop: 10 },
  footer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 },
  time: { color: colors.textSubtle },
  cheer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderRadius: radii.full,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  cheerOn: { borderColor: colors.accent, backgroundColor: colors.accentSoft },
  cheerOff: { borderColor: colors.borderStrong, backgroundColor: colors.bgElev },
  cheerCount: { fontFamily: fonts.mono600, fontSize: 12.5, fontVariant: ['tabular-nums'] },
});

export default KudosCard;
