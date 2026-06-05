/**
 * StipendCard — flagship budget card for the You tab.
 * Icon tile · $total/period · $remaining left · $used used · tone-700 progress
 * bar · "Resets in N days" with an orange "· use it or lose it" warning when
 * the balance is low. Ports YouScreen.jsx StipendCard pixel-faithfully.
 */
import { StyleSheet, Text, View } from 'react-native';
import { Card } from '@/components/Card';
import { Icon } from '@/components/Icon';
import { IconTile } from '@/components/IconTile';
import type { Stipend } from '@/lib/data/types';
import { scale, colors } from '@/lib/theme/colors';
import { fonts, type } from '@/lib/theme/type';
import { computeStipend } from '@/lib/utils/stipend';

export type StipendCardProps = {
  stipend: Stipend;
  onPress: () => void;
};

export function StipendCard({ stipend: s, onPress }: StipendCardProps) {
  const { remaining, pct, low } = computeStipend(s);
  const toneFill = scale[s.tone === 'neutral' ? 'charcoal' : s.tone][700];
  const tileBg = scale[s.tone === 'neutral' ? 'charcoal' : s.tone][300];
  const resetColor = low ? scale.orange[700] : colors.textSubtle;

  return (
    <Card onPress={onPress} style={styles.card}>
      <View style={styles.headRow}>
        <IconTile icon={s.icon} bg={tileBg} fg={toneFill} size={42} />
        <View style={styles.headText}>
          <Text style={styles.label}>{s.label}</Text>
          <Text style={styles.meta}>
            <Text style={styles.num}>${s.total.toLocaleString()}</Text> / {s.period}
          </Text>
        </View>
        <Icon name="chevron-right" size={19} color={colors.textSubtle} />
      </View>

      <View style={styles.balanceRow}>
        <View style={styles.balanceLeft}>
          <Text style={styles.remaining}>${remaining.toLocaleString()}</Text>
          <Text style={styles.meta}>left</Text>
        </View>
        <Text style={[styles.meta, styles.num]}>${s.used.toLocaleString()} used</Text>
      </View>

      <View style={styles.track}>
        <View style={[styles.fill, { width: `${pct}%`, backgroundColor: toneFill }]} />
      </View>

      <View style={styles.resetRow}>
        <Icon name="rotate-ccw" size={13} color={resetColor} />
        <Text style={[styles.meta, { color: resetColor }]}>
          Resets in {s.resetsInDays} days{low ? ' · use it or lose it' : ''}
        </Text>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { padding: 16 },
  headRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  headText: { flex: 1, minWidth: 0 },
  label: { ...type.heading17, fontFamily: fonts.sora600, fontSize: 15, lineHeight: 18 },
  meta: { ...type.caption11, fontSize: 12, lineHeight: 17 },
  num: { fontFamily: fonts.mono500, fontVariant: ['tabular-nums'] },
  balanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginTop: 15,
    marginBottom: 7,
  },
  balanceLeft: { flexDirection: 'row', alignItems: 'baseline', gap: 5 },
  remaining: {
    fontFamily: fonts.sora600,
    fontSize: 19,
    lineHeight: 19,
    color: colors.text,
    fontVariant: ['tabular-nums'],
  },
  track: { height: 7, backgroundColor: colors.bgSunken, borderRadius: 99, overflow: 'hidden' },
  fill: { height: '100%', borderRadius: 99 },
  resetRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 10 },
});

export default StipendCard;
