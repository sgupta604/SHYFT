/**
 * YouScreen — the home for everything tied to the individual: stipend tracker,
 * PTO snapshot, perks & benefits grid, and "My events" (live RSVP state).
 * Ports YouScreen.jsx. Cross-feature navigation is by route path only.
 */
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Icon } from '@/components/Icon';
import { Pill } from '@/components/Pill';
import { SectionHeader } from '@/components/SectionHeader';
import { PERKS } from '@/lib/data/perks';
import { PTO } from '@/lib/data/misc';
import { STIPENDS } from '@/lib/data/stipends';
import type { EventItem, Pto } from '@/lib/data/types';
import { useEventsStore } from '@/lib/stores/events';
import { colors } from '@/lib/theme/colors';
import { space } from '@/lib/theme/spacing';
import { fonts, type } from '@/lib/theme/type';
import { PerkTile } from './PerkTile';
import { RequestTimeOffSheet } from './RequestTimeOffSheet';
import { StipendCard } from './StipendCard';

function PtoSnapshot({ pto, onRequest }: { pto: Pto; onRequest: () => void }) {
  return (
    <Card style={styles.ptoCard}>
      <View style={styles.ptoTop}>
        <View style={styles.ptoLeft}>
          <View style={styles.ptoBalance}>
            <Text style={styles.ptoNum}>{pto.remaining}</Text>
            <Text style={styles.meta}>{pto.unit} remaining</Text>
          </View>
          <Text style={[styles.meta, styles.ptoSub]}>
            {pto.accrued} accrued this year · {pto.pendingRequests} pending
          </Text>
        </View>
        <Button variant="primary" size="sm" icon="plane" onPress={onRequest}>
          Request time off
        </Button>
      </View>
      <View style={styles.holidayRow}>
        <Icon name="calendar-heart" size={17} color={colors.accent} />
        <Text style={[styles.meta, { color: colors.textMuted }]}>Next company holiday</Text>
        <View style={styles.holidayRight}>
          <Text style={styles.holidayName}>{pto.nextHoliday.name}</Text>
          <Text style={[styles.meta, { marginTop: 1 }]}>{pto.nextHoliday.date}</Text>
        </View>
      </View>
    </Card>
  );
}

function MyEventRow({ e, last }: { e: EventItem; last: boolean }) {
  // "Apr 24" -> dd "24", mm "Apr"; date strings are "Mon, Apr 24" or "Apr 24".
  const parts = e.date.replace(',', '').split(' ');
  const dd = parts[parts.length - 1];
  const mm = parts[parts.length - 2];
  return (
    <View style={[styles.eventRow, !last && styles.eventDivider]}>
      <View style={styles.dateBlock}>
        <Text style={styles.dateDay}>{dd}</Text>
        <Text style={styles.dateMonth}>{mm}</Text>
      </View>
      <View style={styles.eventText}>
        <Text style={styles.eventTitle} numberOfLines={1}>
          {e.title}
        </Text>
        <Text style={[styles.meta, { marginTop: 2 }]}>
          {e.time} · {e.where}
        </Text>
      </View>
      <Pill tone="green" dot>
        Going
      </Pill>
    </View>
  );
}

export function YouScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const events = useEventsStore((s) => s.events);
  const [ptoOpen, setPtoOpen] = useState(false);
  const mine = events.filter((e) => e.rsvp === 'going');

  return (
    <View style={styles.root}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content, { paddingBottom: space[16] + insets.bottom }]}
        showsVerticalScrollIndicator={false}
      >
        <SectionHeader
          title="Stipend tracker"
          action="History"
          onAction={() => router.push(`/stipend/${STIPENDS[0].id}`)}
        />
        {STIPENDS.map((s) => (
          <StipendCard key={s.id} stipend={s} onPress={() => router.push(`/stipend/${s.id}`)} />
        ))}

        <SectionHeader title="Time off" action="Calendar" onAction={() => router.push('/people')} />
        <PtoSnapshot pto={PTO} onRequest={() => setPtoOpen(true)} />

        <SectionHeader title="Perks & benefits" />
        <View style={styles.perkGrid}>
          {PERKS.map((p) => (
            <View key={p.id} style={styles.perkCell}>
              <PerkTile perk={p} />
            </View>
          ))}
        </View>

        <SectionHeader title="My events" action="All events" onAction={() => router.push('/events')} />
        {mine.length === 0 ? (
          <Card pad style={styles.emptyCard}>
            <Icon name="calendar-plus" size={18} color={colors.textSubtle} />
            <Text style={styles.meta}>No RSVPs yet — find something on the Events tab.</Text>
          </Card>
        ) : (
          <Card style={styles.eventsCard}>
            {mine.map((e, i) => (
              <MyEventRow key={e.id} e={e} last={i === mine.length - 1} />
            ))}
          </Card>
        )}
      </ScrollView>

      <RequestTimeOffSheet visible={ptoOpen} onClose={() => setPtoOpen(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  scroll: { flex: 1 },
  content: { padding: space[4], gap: space[4] },
  meta: { ...type.caption11, fontSize: 12, lineHeight: 17 },

  // PTO
  ptoCard: { padding: 16 },
  ptoTop: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  ptoLeft: { flex: 1 },
  ptoBalance: { flexDirection: 'row', alignItems: 'baseline', gap: 6 },
  ptoNum: {
    fontFamily: fonts.sora600,
    fontSize: 30,
    lineHeight: 30,
    letterSpacing: -0.6,
    color: colors.text,
    fontVariant: ['tabular-nums'],
  },
  ptoSub: { marginTop: 4 },
  holidayRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 14,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  holidayRight: { marginLeft: 'auto', alignItems: 'flex-end' },
  holidayName: { fontFamily: fonts.inter500, fontSize: 13, lineHeight: 16, color: colors.text },

  // Perks
  perkGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  perkCell: { width: '47.5%', flexGrow: 1 },

  // My events
  emptyCard: { flexDirection: 'row', alignItems: 'center', gap: 11 },
  eventsCard: { paddingHorizontal: space[4], paddingVertical: 2 },
  eventRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12 },
  eventDivider: { borderBottomWidth: 1, borderBottomColor: colors.border },
  dateBlock: { width: 40, alignItems: 'center' },
  dateDay: { fontFamily: fonts.sora600, fontSize: 15, lineHeight: 15, color: colors.accent },
  dateMonth: {
    ...type.caption11,
    fontSize: 10.5,
    lineHeight: 14,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  eventText: { flex: 1, minWidth: 0 },
  eventTitle: { fontFamily: fonts.inter500, fontSize: 13.5, lineHeight: 17, color: colors.text },
});

export default YouScreen;
