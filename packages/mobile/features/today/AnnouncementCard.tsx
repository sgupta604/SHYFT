/**
 * AnnouncementCard — Today announcement card. Ports AnnouncementCard from
 * Cards.jsx: optional pin + muted category tag + time, Sora title, 2-line
 * clamped body, author avatar row with reaction/comment counts, and (for the
 * Q3 stipend announcement) an accent-soft deep-link CTA row.
 * The whole card is tappable to open the AnnouncementSheet; the CTA stops
 * propagation and fires its own handler (deep-link by route path only).
 */
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Avatar } from '@/components/Avatar';
import { Card } from '@/components/Card';
import { Icon } from '@/components/Icon';
import { colors } from '@/lib/theme/colors';
import { radii, space } from '@/lib/theme/spacing';
import { fonts, type } from '@/lib/theme/type';
import type { Announcement } from '@/lib/data/types';

export type AnnouncementCardProps = {
  announcement: Announcement;
  onOpen?: (announcement: Announcement) => void;
  onDeepLink?: (link: NonNullable<Announcement['link']>) => void;
};

export function AnnouncementCard({ announcement, onOpen, onDeepLink }: AnnouncementCardProps) {
  const a = announcement;
  return (
    <Card pad onPress={onOpen ? () => onOpen(a) : undefined}>
      <View style={styles.topRow}>
        {a.pinned ? <Icon name="pin" size={13} color={colors.textSubtle} /> : null}
        <View style={styles.catTag}>
          <Text style={styles.catText}>{a.cat}</Text>
        </View>
        <Text style={[type.label12, styles.time]}>{a.time}</Text>
      </View>

      <Text style={styles.title}>{a.title}</Text>
      <Text style={[type.body14, styles.body]} numberOfLines={2}>
        {a.body}
      </Text>

      <View style={styles.authorRow}>
        <Avatar name={a.author} size={26} />
        <Text style={styles.author}>{a.author}</Text>
        <Text style={[type.label12, styles.role]}> · {a.role}</Text>
        <View style={styles.counts}>
          <View style={styles.count}>
            <Icon name="heart" size={15} color={colors.textSubtle} />
            <Text style={styles.countText}>{a.reactions}</Text>
          </View>
          <View style={styles.count}>
            <Icon name="message-circle" size={15} color={colors.textSubtle} />
            <Text style={styles.countText}>{a.comments}</Text>
          </View>
        </View>
      </View>

      {a.link ? (
        <Pressable
          style={styles.cta}
          onPress={() => onDeepLink?.(a.link!)}
          accessibilityRole="button"
        >
          <Icon name={a.link.icon || 'arrow-right'} size={16} color={colors.accent} />
          <Text style={styles.ctaLabel}>{a.link.label}</Text>
          <Icon name="chevron-right" size={16} color={colors.accent} style={styles.ctaChevron} />
        </Pressable>
      ) : null}
    </Card>
  );
}

const styles = StyleSheet.create({
  topRow: { flexDirection: 'row', alignItems: 'center', gap: space[2], marginBottom: 10 },
  catTag: {
    backgroundColor: colors.bgSubtle,
    borderRadius: radii.full,
    paddingVertical: 5,
    paddingHorizontal: 9,
  },
  catText: { fontFamily: fonts.inter600, fontSize: 11, lineHeight: 11, color: colors.textMuted },
  time: { marginLeft: 'auto', color: colors.textSubtle },
  title: {
    fontFamily: fonts.sora600,
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: -0.16,
    color: colors.text,
    marginBottom: 6,
  },
  body: { color: colors.textMuted },
  authorRow: { flexDirection: 'row', alignItems: 'center', gap: 9, marginTop: 14 },
  author: { fontFamily: fonts.inter500, fontSize: 12.5, color: colors.text },
  role: { color: colors.textSubtle },
  counts: { flexDirection: 'row', gap: 14, marginLeft: 'auto' },
  count: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  countText: {
    fontFamily: fonts.mono500,
    fontSize: 12.5,
    color: colors.textSubtle,
    fontVariant: ['tabular-nums'],
  },
  cta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space[2],
    marginTop: 13,
    paddingVertical: 11,
    paddingHorizontal: 13,
    borderRadius: radii.md,
    backgroundColor: colors.accentSoft,
  },
  ctaLabel: { fontFamily: fonts.inter600, fontSize: 12.5, color: colors.accent },
  ctaChevron: { marginLeft: 'auto' },
});

export default AnnouncementCard;
