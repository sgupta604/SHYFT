/**
 * EventsScreen — Events tab. Ports EventsScreen.jsx:
 *   Segmented Upcoming | Going | Past
 *     - 'Going' filters to rsvp === 'going'
 *     - 'Upcoming' / 'Past' show all events (faithful to the prototype)
 *   Empty state (calendar-x) when the Going filter has nothing.
 * RSVP state is the single source of truth in useEventsStore — toggling on a
 * card (or inside the EventSheet) updates the count + capacity bar live, and is
 * the same state You's "My events" reads. Tapping a card opens the EventSheet.
 */
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { EventSheet } from './EventSheet';
import { EventCard } from '@/components/EventCard';
import { Icon } from '@/components/Icon';
import { Segmented } from '@/components/Segmented';
import { useEventsStore } from '@/lib/stores/events';
import { colors, scale } from '@/lib/theme/colors';
import { space } from '@/lib/theme/spacing';
import { type } from '@/lib/theme/type';

const FILTERS = ['Upcoming', 'Going', 'Past'];

export function EventsScreen() {
  const insets = useSafeAreaInsets();
  const events = useEventsStore((s) => s.events);
  const toggleRsvp = useEventsStore((s) => s.toggleRsvp);

  const [filter, setFilter] = useState('Upcoming');
  const [openId, setOpenId] = useState<string | null>(null);

  const shown = filter === 'Going' ? events.filter((e) => e.rsvp === 'going') : events;
  const openEvent = openId ? events.find((e) => e.id === openId) ?? null : null;

  return (
    <View style={styles.root}>
      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: space[8] + insets.bottom }]}
        showsVerticalScrollIndicator={false}
      >
        <Segmented options={FILTERS} value={filter} onChange={setFilter} />

        {shown.length === 0 ? (
          <View style={styles.empty}>
            <Icon name="calendar-x" size={30} color={scale.charcoal[300]} />
            <Text style={[type.heading17, styles.emptyTitle]}>Nothing on your calendar</Text>
            <Text style={[type.label12, styles.emptySub]}>
              RSVP to an event and it&apos;ll show up here.
            </Text>
          </View>
        ) : (
          shown.map((e) => (
            <EventCard key={e.id} event={e} onRsvp={toggleRsvp} onOpen={() => setOpenId(e.id)} />
          ))
        )}
      </ScrollView>

      {openEvent ? (
        <EventSheet event={openEvent} onRsvp={toggleRsvp} onClose={() => setOpenId(null)} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  content: { padding: space[5], gap: space[3] },
  empty: { alignItems: 'center', paddingVertical: space[12], paddingHorizontal: space[6] },
  emptyTitle: { marginTop: space[3] },
  emptySub: { color: colors.textSubtle, marginTop: space[1], textAlign: 'center' },
});

export default EventsScreen;
