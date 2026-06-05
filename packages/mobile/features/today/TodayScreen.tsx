/**
 * TodayScreen — the app's backbone home screen. Ports TodayScreen.jsx:
 *   office-status banner · weather card · announcements (tap → AnnouncementSheet;
 *   the Q3 stipend announcement deep-links to the You tab) · who's-out rows ·
 *   "Coming up" next event via the shared EventCard (live RSVP state) ·
 *   "Recent kudos" latest KudosCard with a cheer chip + "See all" → AllKudosSheet.
 *
 * Cross-feature navigation is by ROUTE PATH ONLY (router.push('/(tabs)/you')) —
 * Today never imports from another feature module.
 */
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AllKudosSheet } from './AllKudosSheet';
import { AnnouncementCard } from './AnnouncementCard';
import { AnnouncementSheet } from './AnnouncementSheet';
import { KudosCard } from './KudosCard';
import { OutRow } from './OutRow';
import { WeatherCard } from './WeatherCard';
import { Card } from '@/components/Card';
import { EventCard } from '@/components/EventCard';
import { SectionHeader } from '@/components/SectionHeader';
import { StatusBanner } from '@/components/StatusBanner';
import { useEventsStore } from '@/lib/stores/events';
import { useKudosStore } from '@/lib/stores/kudos';
import { ANNOUNCEMENTS } from '@/lib/data/announcements';
import { OFFICE_STATUS, OUT_TODAY, WEATHER } from '@/lib/data/misc';
import { colors } from '@/lib/theme/colors';
import { space } from '@/lib/theme/spacing';
import type { Announcement } from '@/lib/data/types';

const TAB_ROUTES: Record<string, string> = {
  today: '/(tabs)',
  events: '/(tabs)/events',
  you: '/(tabs)/you',
  people: '/(tabs)/people',
  more: '/(tabs)/more',
};

export function TodayScreen() {
  const insets = useSafeAreaInsets();
  const events = useEventsStore((s) => s.events);
  const toggleRsvp = useEventsStore((s) => s.toggleRsvp);
  const kudos = useKudosStore((s) => s.kudos);
  const toggleCheer = useKudosStore((s) => s.toggleCheer);

  const [openAnnouncementId, setOpenAnnouncementId] = useState<string | null>(null);
  const [kudosOpen, setKudosOpen] = useState(false);

  const nextEvent = events[0];
  const latestKudo = kudos[0];
  const openAnnouncement = openAnnouncementId
    ? ANNOUNCEMENTS.find((a) => a.id === openAnnouncementId) ?? null
    : null;

  const goTab = (tab: string) => {
    const path = TAB_ROUTES[tab] ?? '/(tabs)';
    router.push(path as never);
  };
  const onDeepLink = (link: NonNullable<Announcement['link']>) => {
    setOpenAnnouncementId(null);
    goTab(link.tab);
  };

  return (
    <View style={styles.root}>
      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: space[8] + insets.bottom }]}
        showsVerticalScrollIndicator={false}
      >
        <StatusBanner
          tone={OFFICE_STATUS.tone}
          icon={OFFICE_STATUS.icon}
          title={OFFICE_STATUS.title}
          text={OFFICE_STATUS.text}
        />

        <WeatherCard weather={WEATHER} />

        <SectionHeader title="Announcements" action="See all" onAction={() => goTab('today')} />
        {ANNOUNCEMENTS.map((a) => (
          <AnnouncementCard
            key={a.id}
            announcement={a}
            onOpen={() => setOpenAnnouncementId(a.id)}
            onDeepLink={onDeepLink}
          />
        ))}

        <SectionHeader title="Out today" action="Calendar" onAction={() => goTab('people')} />
        <Card pad style={styles.outCard}>
          {OUT_TODAY.map((o, i) => (
            <OutRow key={o.name} person={o} last={i === OUT_TODAY.length - 1} />
          ))}
        </Card>

        <SectionHeader title="Coming up" action="All events" onAction={() => goTab('events')} />
        {nextEvent ? (
          <EventCard event={nextEvent} onRsvp={toggleRsvp} onOpen={() => goTab('events')} />
        ) : null}

        <SectionHeader title="Recent kudos" action="See all" onAction={() => setKudosOpen(true)} />
        {latestKudo ? <KudosCard kudo={latestKudo} onCheer={toggleCheer} /> : null}
      </ScrollView>

      {openAnnouncement ? (
        <AnnouncementSheet
          announcement={openAnnouncement}
          onClose={() => setOpenAnnouncementId(null)}
          onDeepLink={onDeepLink}
        />
      ) : null}

      {kudosOpen ? <AllKudosSheet onClose={() => setKudosOpen(false)} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  content: { padding: space[5], gap: space[3] },
  outCard: { paddingTop: 4, paddingBottom: 4 },
});

export default TodayScreen;
