/**
 * OnboardingScreen — the preboarding full-screen push: a countdown-to-day-one
 * hero, the CHECKABLE "Before you start" list (the single source of truth is
 * the onboarding store — toggling here updates More's hero footer too), the
 * culture-handbook CTA, who-you'll-meet, and day-one details. Ports
 * OnboardingScreen.jsx; pushed as its own route (not a tab).
 */
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Avatar } from '@/components/Avatar';
import { Card } from '@/components/Card';
import { Icon } from '@/components/Icon';
import { IconTile } from '@/components/IconTile';
import { SectionHeader } from '@/components/SectionHeader';
import { ONBOARDING } from '@/lib/data/onboarding';
import type { ChecklistItem, OnboardingFact, WhosWho } from '@/lib/data/types';
import { selectDoneCount, useOnboardingStore } from '@/lib/stores/onboarding';
import { scale, colors } from '@/lib/theme/colors';
import { radii, space } from '@/lib/theme/spacing';
import { fonts, type } from '@/lib/theme/type';

function ChecklistRow({
  item: c,
  last,
  onToggle,
}: {
  item: ChecklistItem;
  last: boolean;
  onToggle: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked: c.done }}
      onPress={onToggle}
      style={({ pressed }) => [
        styles.checkRow,
        !last && styles.divider,
        pressed && styles.pressed,
      ]}
    >
      <View style={[styles.box, c.done ? styles.boxDone : styles.boxOpen]}>
        {c.done ? <Icon name="check" size={14} color={colors.white} strokeWidth={3} /> : null}
      </View>
      <Text style={[styles.checkLabel, c.done && styles.checkLabelDone]}>{c.label}</Text>
      <Text style={styles.meta}>{c.meta}</Text>
    </Pressable>
  );
}

function MeetRow({ person: p, last }: { person: WhosWho; last: boolean }) {
  return (
    <View style={[styles.meetRow, !last && styles.divider]}>
      <Avatar name={p.name} size={40} />
      <View style={styles.meetText}>
        <Text style={styles.meetName}>{p.name}</Text>
        <Text style={[styles.meta, { marginTop: 2 }]}>
          {p.role} · {p.team}
        </Text>
      </View>
      <View style={styles.iconBtn}>
        <Icon name="message-circle" size={16} color={colors.textMuted} />
      </View>
    </View>
  );
}

function FactRow({ fact: f, last }: { fact: OnboardingFact; last: boolean }) {
  return (
    <View style={[styles.factRow, !last && styles.divider]}>
      <Icon name={f.icon} size={18} color={colors.accent} />
      <Text style={[styles.meta, styles.factKey]}>{f.k}</Text>
      <Text style={styles.factVal}>{f.v}</Text>
    </View>
  );
}

export function OnboardingScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const checklist = useOnboardingStore((s) => s.checklist);
  const toggle = useOnboardingStore((s) => s.toggle);
  const done = useOnboardingStore(selectDoneCount);

  return (
    <View style={styles.root}>
      <View style={[styles.header, { paddingTop: insets.top + 14 }]}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Back"
          onPress={() => router.back()}
          style={({ pressed }) => [styles.iconBtn, pressed && styles.pressed]}
        >
          <Icon name="chevron-left" size={20} color={colors.textMuted} />
        </Pressable>
        <Text style={styles.headerTitle}>Welcome to Shyft</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content, { paddingBottom: space[16] + insets.bottom }]}
        showsVerticalScrollIndicator={false}
      >
        <Card style={styles.countdownCard}>
          <Text style={styles.countdownKicker}>Your first day</Text>
          <View style={styles.countdownRow}>
            <Text style={styles.countdownNum}>{ONBOARDING.daysToStart}</Text>
            <Text style={styles.countdownUnit}>days</Text>
          </View>
          <Text style={styles.countdownDate}>{ONBOARDING.startDate}</Text>
        </Card>

        <View style={styles.sectionRow}>
          <SectionHeader title="Before you start" />
          <Text style={[styles.meta, styles.doneCount]}>
            {done}/{checklist.length} done
          </Text>
        </View>
        <Card style={styles.listCard}>
          {checklist.map((c, i) => (
            <ChecklistRow
              key={c.id}
              item={c}
              last={i === checklist.length - 1}
              onToggle={() => toggle(c.id)}
            />
          ))}
        </Card>

        <Card style={styles.handbookCard}>
          <IconTile icon="book-open" bg={scale.purple[300]} fg={scale.purple[700]} size={44} />
          <View style={styles.handbookText}>
            <Text style={styles.handbookTitle}>Culture handbook</Text>
            <Text style={[styles.meta, { marginTop: 2 }]}>
              How we work, what we value · 8 min read
            </Text>
          </View>
          <Icon name="chevron-right" size={19} color={colors.textSubtle} />
        </Card>

        <SectionHeader title="Who you'll meet" />
        <Card style={styles.padCard}>
          {ONBOARDING.whoswho.map((p, i) => (
            <MeetRow key={p.name} person={p} last={i === ONBOARDING.whoswho.length - 1} />
          ))}
        </Card>

        <SectionHeader title="Day-one details" />
        <Card style={styles.padCard}>
          {ONBOARDING.facts.map((f, i) => (
            <FactRow key={f.k} fact={f} last={i === ONBOARDING.facts.length - 1} />
          ))}
        </Card>

        <Text style={[styles.meta, styles.footer]}>
          Questions before you start? Message Priya, your onboarding buddy.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  meta: { ...type.caption11, fontSize: 12, lineHeight: 17 },
  divider: { borderBottomWidth: 1, borderBottomColor: colors.border },
  pressed: { opacity: 0.7 },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: radii.full,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.bgSubtle,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: space[5],
    paddingBottom: 12,
    backgroundColor: colors.bgElev,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: { fontFamily: fonts.sora600, fontSize: 21, lineHeight: 23, letterSpacing: -0.21, color: colors.text },

  scroll: { flex: 1 },
  content: { padding: space[4], gap: space[4] },

  // Countdown hero
  countdownCard: {
    backgroundColor: scale.charcoal[900],
    borderWidth: 0,
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 20,
  },
  countdownKicker: {
    fontFamily: fonts.inter500,
    fontSize: 12.5,
    lineHeight: 13,
    color: scale.charcoal[400],
    textTransform: 'uppercase',
    letterSpacing: 0.75,
  },
  countdownRow: { flexDirection: 'row', alignItems: 'baseline', gap: 8, marginTop: 12, marginBottom: 6 },
  countdownNum: {
    fontFamily: fonts.sora600,
    fontSize: 44,
    lineHeight: 55,
    letterSpacing: -0.88,
    color: colors.white,
    fontVariant: ['tabular-nums'],
  },
  countdownUnit: { fontFamily: fonts.sora600, fontSize: 20, lineHeight: 24, color: scale.blue[300] },
  countdownDate: { fontFamily: fonts.inter400, fontSize: 13, lineHeight: 13, color: scale.charcoal[300] },

  // Checklist
  sectionRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  doneCount: { fontFamily: fonts.mono500, fontVariant: ['tabular-nums'] },
  listCard: { overflow: 'hidden' },
  checkRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 13, paddingHorizontal: 16 },
  box: {
    width: 22,
    height: 22,
    borderRadius: radii.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxDone: { backgroundColor: colors.success },
  boxOpen: { borderWidth: 1.5, borderColor: colors.borderStrong },
  checkLabel: { flex: 1, fontFamily: fonts.inter500, fontSize: 14, lineHeight: 18, color: colors.text },
  checkLabelDone: { color: colors.textSubtle, textDecorationLine: 'line-through' },

  // Handbook CTA
  handbookCard: { flexDirection: 'row', alignItems: 'center', gap: 14, padding: 16 },
  handbookText: { flex: 1 },
  handbookTitle: { fontFamily: fonts.inter600, fontSize: 14, lineHeight: 17, color: colors.text },

  // Cards with standard padding
  padCard: { paddingHorizontal: space[5], paddingTop: 4, paddingBottom: 4 },

  // Who you'll meet
  meetRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12 },
  meetText: { flex: 1 },
  meetName: { fontFamily: fonts.inter600, fontSize: 13.5, lineHeight: 16, color: colors.text },

  // Day-one details
  factRow: { flexDirection: 'row', alignItems: 'center', gap: 13, paddingVertical: 12 },
  factKey: { width: 70 },
  factVal: { flex: 1, fontFamily: fonts.inter500, fontSize: 13.5, lineHeight: 18, color: colors.text },

  footer: { textAlign: 'center', paddingHorizontal: 20, paddingTop: 4, paddingBottom: 8 },
});

export default OnboardingScreen;
