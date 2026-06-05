/**
 * AnnouncementSheet — announcement detail bottom sheet. Ports AnnouncementSheet
 * from Sheets.jsx: category title row, Sora headline, author/role/time, the full
 * body, then reaction/comment chips + a share button.
 * For the Q3 stipend announcement (a.link), an accent-soft CTA row deep-links to
 * the You tab BY ROUTE PATH ONLY (router.push('/(tabs)/you')) — never a
 * cross-feature import — and closes the sheet first.
 */
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Avatar } from '@/components/Avatar';
import { Icon } from '@/components/Icon';
import { Sheet } from '@/components/Sheet';
import { colors } from '@/lib/theme/colors';
import { radii, space } from '@/lib/theme/spacing';
import { fonts, type } from '@/lib/theme/type';
import type { Announcement } from '@/lib/data/types';

export type AnnouncementSheetProps = {
  announcement: Announcement;
  onClose: () => void;
  onDeepLink?: (link: NonNullable<Announcement['link']>) => void;
};

export function AnnouncementSheet({ announcement, onClose, onDeepLink }: AnnouncementSheetProps) {
  const a = announcement;
  return (
    <Sheet title={a.cat} onClose={onClose}>
      <Text style={[type.title22, styles.title]}>{a.title}</Text>

      <View style={styles.authorRow}>
        <Avatar name={a.author} size={32} />
        <View>
          <Text style={styles.author}>{a.author}</Text>
          <Text style={[type.label12, styles.meta]}>
            {a.role} · {a.time}
          </Text>
        </View>
      </View>

      <Text style={[type.body14, styles.body]}>{a.body}</Text>

      <View style={styles.actions}>
        <View style={styles.chip}>
          <Icon name="heart" size={16} color={colors.textMuted} />
          <Text style={styles.chipText}>{a.reactions}</Text>
        </View>
        <View style={styles.chip}>
          <Icon name="message-circle" size={16} color={colors.textMuted} />
          <Text style={styles.chipText}>{a.comments}</Text>
        </View>
        <View style={styles.spacer} />
        <Pressable style={styles.iconBtn} accessibilityRole="button" accessibilityLabel="Share">
          <Icon name="share-2" size={17} color={colors.textMuted} />
        </Pressable>
      </View>

      {a.link ? (
        <Pressable
          style={styles.cta}
          accessibilityRole="button"
          onPress={() => onDeepLink?.(a.link!)}
        >
          <Icon name={a.link.icon || 'arrow-right'} size={16} color={colors.accent} />
          <Text style={styles.ctaLabel}>{a.link.label}</Text>
          <Icon name="chevron-right" size={16} color={colors.accent} style={styles.ctaChevron} />
        </Pressable>
      ) : null}
    </Sheet>
  );
}

const styles = StyleSheet.create({
  title: { letterSpacing: -0.21 },
  authorRow: { flexDirection: 'row', alignItems: 'center', gap: 9 },
  author: { fontFamily: fonts.inter500, fontSize: 13, color: colors.text },
  meta: { color: colors.textSubtle, marginTop: 2 },
  body: { color: colors.textMuted, lineHeight: 22 },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space[2] + 2,
    paddingTop: space[2] - 2,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    backgroundColor: colors.bgElev,
    borderRadius: radii.full,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  chipText: {
    fontFamily: fonts.mono500,
    fontSize: 12.5,
    color: colors.text,
    fontVariant: ['tabular-nums'],
  },
  spacer: { flex: 1 },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: radii.full,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.bgSubtle,
  },
  cta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space[2],
    paddingVertical: 13,
    paddingHorizontal: 14,
    borderRadius: radii.md,
    backgroundColor: colors.accentSoft,
  },
  ctaLabel: { fontFamily: fonts.inter600, fontSize: 13, color: colors.accent },
  ctaChevron: { marginLeft: 'auto' },
});

export default AnnouncementSheet;
