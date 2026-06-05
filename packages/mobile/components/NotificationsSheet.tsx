/**
 * NotificationsSheet — chrome-level notifications bottom sheet. Ports
 * NotificationsSheet from Sheets.jsx: four static items, each an icon tile +
 * title + sub line. Self-contained (its own static data) so any tab's header
 * bell can open it. Bell wiring lands in Stream 8 — this component does not
 * touch AppHeader.
 */
import { StyleSheet, Text, View } from 'react-native';
import { IconTile } from './IconTile';
import { Sheet } from './Sheet';
import { scale, type Tone } from '@/lib/theme/colors';
import { colors } from '@/lib/theme/colors';
import { space } from '@/lib/theme/spacing';
import { fonts } from '@/lib/theme/type';

type NotificationItem = { icon: string; tone: Tone; title: string; sub: string };

const ITEMS: NotificationItem[] = [
  { icon: 'party-popper', tone: 'green', title: 'Priya gave you kudos', sub: 'Customer obsession · 1h ago' },
  { icon: 'calendar-check', tone: 'blue', title: 'Rooftop happy hour is Friday', sub: "You RSVP'd going · 2h ago" },
  { icon: 'megaphone', tone: 'orange', title: 'New announcement from IT', sub: 'VPN maintenance Thu 8–10pm · 2h ago' },
  { icon: 'gift', tone: 'purple', title: 'Referral update: interview scheduled', sub: 'Your referral for Payments · Yesterday' },
];

export type NotificationsSheetProps = {
  onClose: () => void;
};

export function NotificationsSheet({ onClose }: NotificationsSheetProps) {
  return (
    <Sheet title="Notifications" onClose={onClose}>
      {ITEMS.map((n) => {
        const key = n.tone === 'neutral' ? 'charcoal' : n.tone;
        return (
          <View key={n.title} style={styles.row}>
            <IconTile icon={n.icon} bg={scale[key][300]} fg={scale[key][700]} size={38} />
            <View style={styles.body}>
              <Text style={styles.title}>{n.title}</Text>
              <Text style={styles.sub}>{n.sub}</Text>
            </View>
          </View>
        );
      })}
    </Sheet>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'flex-start', gap: space[3] },
  body: { flex: 1 },
  title: { fontFamily: fonts.inter500, fontSize: 13.5, lineHeight: 18, color: colors.text },
  sub: { fontFamily: fonts.inter400, fontSize: 12.5, lineHeight: 16, color: colors.textSubtle, marginTop: 2 },
});

export default NotificationsSheet;
