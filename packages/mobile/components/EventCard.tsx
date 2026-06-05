/**
 * EventCard — shared event card (Events list + Today "Coming up").
 * Ports EventCard from Cards.jsx: category tile + pill + title (tappable to open),
 * meta rows (date/time/where), live going count + "spots left", a 5px sunken
 * capacity bar (accent fill, pct = round(going/capacity*100)), and an RSVP/Going
 * toggle button. All state flows from the events store via props.
 */
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Button } from './Button';
import { Card } from './Card';
import { Icon } from './Icon';
import { IconTile } from './IconTile';
import { Pill } from './Pill';
import { colors, scale } from '@/lib/theme/colors';
import { space } from '@/lib/theme/spacing';
import { fonts, type } from '@/lib/theme/type';
import type { EventItem } from '@/lib/data/types';

export type EventCardProps = {
  event: EventItem;
  onRsvp: (id: string) => void;
  onOpen?: (event: EventItem) => void;
};

export function EventCard({ event, onRsvp, onOpen }: EventCardProps) {
  const pct = Math.round((event.going / event.capacity) * 100);
  const spotsLeft = event.capacity - event.going;
  const going = event.rsvp === 'going';

  const meta: [string, string][] = [
    ['calendar', event.date],
    ['clock', event.time],
    ['map-pin', event.where],
  ];

  const tileBg = scale[event.catTone === 'neutral' ? 'charcoal' : event.catTone][300];
  const tileFg = scale[event.catTone === 'neutral' ? 'charcoal' : event.catTone][700];

  return (
    <Card pad>
      <Pressable
        onPress={onOpen ? () => onOpen(event) : undefined}
        disabled={!onOpen}
        style={({ pressed }) => [styles.header, pressed && onOpen ? styles.headerPressed : null]}
      >
        <IconTile icon={event.icon} bg={tileBg} fg={tileFg} size={46} />
        <View style={styles.headerText}>
          <Pill tone="neutral" dot={false}>
            {event.cat}
          </Pill>
          <Text style={[type.heading17, styles.title]}>{event.title}</Text>
        </View>
      </Pressable>

      <View style={styles.metaList}>
        {meta.map(([icon, text]) => (
          <View key={icon} style={styles.metaRow}>
            <Icon name={icon} size={15} color={colors.textSubtle} />
            <Text style={[type.label12, styles.metaText]}>{text}</Text>
          </View>
        ))}
      </View>

      <View style={styles.footer}>
        <View style={styles.progressCol}>
          <View style={styles.countRow}>
            <Text style={styles.count}>{event.going}</Text>
            <Text style={[type.label12, styles.countLabel]}>
              going · {spotsLeft} spots left
            </Text>
          </View>
          <View style={styles.track}>
            <View style={[styles.fill, { width: `${pct}%` }]} />
          </View>
        </View>
        <Button
          variant={going ? 'secondary' : 'primary'}
          size="sm"
          icon={going ? 'check' : undefined}
          onPress={() => onRsvp(event.id)}
        >
          {going ? 'Going' : 'RSVP'}
        </Button>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', gap: space[3], alignItems: 'flex-start' },
  headerPressed: { opacity: 0.6 },
  headerText: { flex: 1, minWidth: 0, gap: 7 },
  title: { letterSpacing: -0.15 },
  metaList: { gap: space[2] - 2, marginVertical: space[3] },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: space[2] },
  metaText: { color: colors.textMuted },
  footer: { flexDirection: 'row', alignItems: 'center', gap: space[3] },
  progressCol: { flex: 1 },
  countRow: { flexDirection: 'row', alignItems: 'center', gap: space[2] - 2, marginBottom: 6 },
  count: {
    fontFamily: fonts.mono500,
    fontSize: 12.5,
    color: colors.text,
    fontVariant: ['tabular-nums'],
  },
  countLabel: { color: colors.textSubtle },
  track: { height: 5, backgroundColor: colors.bgSunken, borderRadius: 99, overflow: 'hidden' },
  fill: { height: '100%', backgroundColor: colors.accent, borderRadius: 99 },
});

export default EventCard;
