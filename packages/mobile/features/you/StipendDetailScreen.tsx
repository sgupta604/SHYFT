/**
 * StipendDetailScreen — full-screen push for one stipend.
 * Back chevron · charcoal-900 balance hero (tone-300 bar) · Submit receipt
 * (no-op) · transaction history with status pills (Pending=orange /
 * Approved=blue / Reimbursed=green) and mono amounts · "No claims yet" empty
 * state · "What's eligible?" FAQ row · footer note. Ports StipendDetailScreen.jsx.
 */
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Icon } from '@/components/Icon';
import { IconTile } from '@/components/IconTile';
import { Pill } from '@/components/Pill';
import { SectionHeader } from '@/components/SectionHeader';
import { STIPENDS } from '@/lib/data/stipends';
import type { Tone } from '@/lib/theme/colors';
import type { TxStatus } from '@/lib/data/types';
import { scale, colors } from '@/lib/theme/colors';
import { radii, space } from '@/lib/theme/spacing';
import { fonts, type } from '@/lib/theme/type';
import { computeStipend } from '@/lib/utils/stipend';

const RECEIPT_TONE: Record<TxStatus, Tone> = {
  Pending: 'orange',
  Approved: 'blue',
  Reimbursed: 'green',
};

export type StipendDetailScreenProps = { id: string };

export function StipendDetailScreen({ id }: StipendDetailScreenProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const s = STIPENDS.find((x) => x.id === id);

  if (!s) {
    return (
      <View style={[styles.root, { paddingTop: insets.top + 56 }]}>
        <Text style={type.title22}>Stipend not found</Text>
      </View>
    );
  }

  const { remaining, pct } = computeStipend(s);
  const barTone = scale[s.tone === 'neutral' ? 'charcoal' : s.tone][300];

  return (
    <View style={styles.root}>
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <Pressable
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel="Back"
          hitSlop={8}
          style={({ pressed }) => [styles.iconBtn, pressed && styles.iconBtnPressed]}
        >
          <Icon name="chevron-left" size={20} color={colors.text} />
        </Pressable>
        <Text style={styles.headerTitle}>{s.label} stipend</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content, { paddingBottom: space[16] + insets.bottom }]}
        showsVerticalScrollIndicator={false}
      >
        {/* balance hero */}
        <View style={styles.hero}>
          <View style={styles.heroTop}>
            <IconTile icon={s.icon} bg="rgba(255,255,255,0.12)" fg={colors.white} size={40} />
            <View>
              <Text style={styles.heroLabel}>REMAINING</Text>
              <View style={styles.heroBalance}>
                <Text style={styles.heroAmount}>${remaining.toLocaleString()}</Text>
                <Text style={styles.heroOf}>of ${s.total.toLocaleString()}</Text>
              </View>
            </View>
          </View>
          <View style={styles.heroTrack}>
            <View style={[styles.heroFill, { width: `${pct}%`, backgroundColor: barTone }]} />
          </View>
          <View style={styles.heroFootRow}>
            <Text style={styles.heroUsed}>${s.used.toLocaleString()} used</Text>
            <Text style={styles.heroReset}>Resets in {s.resetsInDays} days</Text>
          </View>
        </View>

        <Button variant="primary" block icon="receipt" onPress={() => {}}>
          Submit receipt
        </Button>

        {/* transaction history */}
        <SectionHeader title="Transaction history" />
        {s.tx.length === 0 ? (
          <Card style={styles.emptyCard}>
            <Icon name="receipt-text" size={26} color={scale.charcoal[300]} />
            <Text style={styles.emptyTitle}>No claims yet</Text>
            <Text style={[styles.meta, styles.emptySub]}>
              Submit a receipt and it'll show up here with its status.
            </Text>
          </Card>
        ) : (
          <Card style={styles.txCard}>
            {s.tx.map((t, i) => (
              <View key={t.id} style={[styles.txRow, i !== s.tx.length - 1 && styles.txDivider]}>
                <View style={styles.txText}>
                  <Text style={styles.txTitle}>{t.title}</Text>
                  <View style={styles.txMetaRow}>
                    <Pill tone={RECEIPT_TONE[t.status]} dot>
                      {t.status}
                    </Pill>
                    <Text style={styles.meta}>{t.date}</Text>
                  </View>
                </View>
                <Text style={styles.txAmount}>${t.amount}</Text>
              </View>
            ))}
          </Card>
        )}

        {/* eligibility FAQ */}
        <Card onPress={() => {}} style={styles.faqCard}>
          <IconTile icon="circle-help" bg={colors.bgSubtle} fg={colors.textMuted} size={38} />
          <View style={styles.faqText}>
            <Text style={styles.faqTitle}>What's eligible?</Text>
            <Text style={[styles.meta, { marginTop: 2 }]}>{s.blurb}</Text>
          </View>
          <Icon name="chevron-right" size={18} color={colors.textSubtle} />
        </Card>

        <Text style={styles.footer}>
          Reimbursements land in your next paycheck. Questions? Ask in #people-ops.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: space[4],
    paddingBottom: 12,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: radii.md,
    backgroundColor: colors.bgSubtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBtnPressed: { backgroundColor: colors.bgSunken },
  headerTitle: { fontFamily: fonts.sora600, fontSize: 21, lineHeight: 23, letterSpacing: -0.21, color: colors.text },

  scroll: { flex: 1 },
  content: { padding: space[4], gap: space[4] },
  meta: { ...type.caption11, fontSize: 12, lineHeight: 17 },

  // hero
  hero: { backgroundColor: scale.charcoal[900], borderRadius: radii.xl, paddingVertical: 22, paddingHorizontal: 20 },
  heroTop: { flexDirection: 'row', alignItems: 'center', gap: 11 },
  heroLabel: {
    fontFamily: fonts.inter500,
    fontSize: 12,
    lineHeight: 12,
    color: scale.charcoal[400],
    textTransform: 'uppercase',
    letterSpacing: 0.72,
  },
  heroBalance: { flexDirection: 'row', alignItems: 'baseline', gap: 7, marginTop: 5 },
  heroAmount: {
    fontFamily: fonts.sora600,
    fontSize: 30,
    lineHeight: 37,
    letterSpacing: -0.6,
    color: colors.white,
    fontVariant: ['tabular-nums'],
  },
  heroOf: { fontFamily: fonts.mono400, fontSize: 13, lineHeight: 13, color: scale.charcoal[400] },
  heroTrack: {
    height: 7,
    backgroundColor: 'rgba(255,255,255,0.14)',
    borderRadius: 99,
    overflow: 'hidden',
    marginTop: 16,
    marginBottom: 9,
  },
  heroFill: { height: '100%', borderRadius: 99 },
  heroFootRow: { flexDirection: 'row', justifyContent: 'space-between' },
  heroUsed: { fontFamily: fonts.mono400, fontSize: 12, lineHeight: 16, color: scale.charcoal[300], fontVariant: ['tabular-nums'] },
  heroReset: { ...type.caption11, fontSize: 12, lineHeight: 16, color: scale.charcoal[300] },

  // empty state
  emptyCard: { alignItems: 'center', paddingVertical: 30, paddingHorizontal: 24 },
  emptyTitle: { fontFamily: fonts.sora600, fontSize: 14, lineHeight: 18, color: colors.text, marginTop: 10 },
  emptySub: { textAlign: 'center', marginTop: 4 },

  // transactions
  txCard: { paddingHorizontal: space[5], paddingVertical: 2 },
  txRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 13 },
  txDivider: { borderBottomWidth: 1, borderBottomColor: colors.border },
  txText: { flex: 1, minWidth: 0 },
  txTitle: { fontFamily: fonts.inter500, fontSize: 13.5, lineHeight: 17, color: colors.text },
  txMetaRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 4 },
  txAmount: { fontFamily: fonts.mono600, fontSize: 14, lineHeight: 18, color: colors.text, fontVariant: ['tabular-nums'] },

  // FAQ
  faqCard: { flexDirection: 'row', alignItems: 'center', gap: 13, padding: 15 },
  faqText: { flex: 1 },
  faqTitle: { fontFamily: fonts.inter600, fontSize: 13.5, lineHeight: 16, color: colors.text },

  footer: { ...type.caption11, fontSize: 12, lineHeight: 17, color: colors.textSubtle, textAlign: 'center', paddingHorizontal: 20, paddingTop: 2 },
});

export default StipendDetailScreen;
