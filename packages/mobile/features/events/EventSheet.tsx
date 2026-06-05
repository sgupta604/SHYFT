/**
 * EventSheet — event detail bottom sheet. Ports EventSheet from Sheets.jsx:
 *   icon tile + title, a meta card (date / time / where / hosted-by), the
 *   description, a going count with an overlapping avatar stack (+N overflow
 *   chip), and a block RSVP toggle button.
 * RSVP toggles through the same events store as the card, so the sheet and the
 * card behind it (and You's "My events") stay in sync.
 */
import { StyleSheet, Text, View } from 'react-native';
import { Avatar } from '@/components/Avatar';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { IconTile } from '@/components/IconTile';
import { Sheet } from '@/components/Sheet';
import { colors, scale } from '@/lib/theme/colors';
import { radii, space } from '@/lib/theme/spacing';
import { fonts, type } from '@/lib/theme/type';
import type { EventItem } from '@/lib/data/types';

const ATTENDEES = ['Maya Patel', 'Jordan Chen', 'Sam Okafor', 'Dana Whitfield', 'Marcus Bell', 'Riley Park'];

export type EventSheetProps = {
  event: EventItem;
  onRsvp: (id: string) => void;
  onClose: () => void;
};

export function EventSheet({ event, onRsvp, onClose }: EventSheetProps) {
  const going = event.rsvp === 'going';
  const spotsLeft = event.capacity - event.going;
  const overflow = event.going - ATTENDEES.length;

  const tileBg = scale[event.catTone === 'neutral' ? 'charcoal' : event.catTone][300];
  const tileFg = scale[event.catTone === 'neutral' ? 'charcoal' : event.catTone][700];

  const meta: [string, string][] = [
    ['calendar', event.date],
    ['clock', event.time],
    ['map-pin', event.where],
    ['user', `Hosted by ${event.host}`],
  ];

  return (
    <Sheet title={event.cat} onClose={onClose}>
      <View style={styles.titleRow}>
        <IconTile icon={event.icon} bg={tileBg} fg={tileFg} size={50} />
        <Text style={[type.title22, styles.title]}>{event.title}</Text>
      </View>

      <View style={styles.metaCard}>
        {meta.map(([icon, text]) => (
          <View key={icon} style={styles.metaRow}>
            <Icon name={icon} size={16} color={colors.accent} />
            <Text style={[type.body14, styles.metaText]}>{text}</Text>
          </View>
        ))}
      </View>

      <Text style={[type.body14, styles.desc]}>{event.desc}</Text>

      <View>
        <View style={styles.countRow}>
          <View style={styles.countGroup}>
            <Text style={styles.count}>{event.going}</Text>
            <Text style={[type.label12, styles.muted]}>going</Text>
          </View>
          <Text style={[type.label12, styles.muted]}>
            {spotsLeft} of {event.capacity} spots left
          </Text>
        </View>
        <View style={styles.stack}>
          {ATTENDEES.map((name, i) => (
            <View key={name} style={i === 0 ? undefined : styles.overlap}>
              <Avatar name={name} size={30} ring={colors.bg} />
            </View>
          ))}
          {overflow > 0 ? (
            <View style={[styles.overlap, styles.overflowChip]}>
              <Text style={styles.overflowText}>+{overflow}</Text>
            </View>
          ) : null}
        </View>
      </View>

      <Button
        block
        variant={going ? 'secondary' : 'primary'}
        icon={going ? 'check' : 'calendar-plus'}
        onPress={() => onRsvp(event.id)}
      >
        {going ? "You're going" : 'RSVP — count me in'}
      </Button>
    </Sheet>
  );
}

const styles = StyleSheet.create({
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: space[3] },
  title: { flex: 1 },
  metaCard: {
    backgroundColor: colors.bgElev,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.lg,
    padding: space[4] - 2,
    gap: space[2] + 2,
  },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: space[2] + 2 },
  metaText: { color: colors.text },
  desc: { color: colors.textMuted },
  countRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: space[2],
  },
  countGroup: { flexDirection: 'row', alignItems: 'center', gap: space[2] - 2 },
  count: {
    fontFamily: fonts.mono600,
    fontSize: 13,
    color: colors.text,
    fontVariant: ['tabular-nums'],
  },
  muted: { color: colors.textSubtle },
  stack: { flexDirection: 'row' },
  overlap: { marginLeft: -8 },
  overflowChip: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.bgSubtle,
    borderWidth: 2,
    borderColor: colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  overflowText: {
    fontFamily: fonts.mono600,
    fontSize: 10,
    color: colors.textMuted,
    fontVariant: ['tabular-nums'],
  },
});

export default EventSheet;
