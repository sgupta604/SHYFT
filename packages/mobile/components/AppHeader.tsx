/**
 * AppHeader — per-tab chrome: title/subtitle, optional S2 mark, optional search
 * button, bell + unread dot. Sits below the safe-area top inset (replaces the
 * prototype's hardcoded 56px). Bell/search wiring is finalized in 6.3 / 8.1.
 */
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from './Icon';
import { colors } from '@/lib/theme/colors';
import { radii, space } from '@/lib/theme/spacing';
import { fonts } from '@/lib/theme/type';

const S2_MARK = require('@/assets/s2-mark.png');

export type AppHeaderProps = {
  title: string;
  subtitle?: string;
  mark?: boolean;
  unread?: boolean;
  onBell?: () => void;
  onSearch?: () => void;
};

export function AppHeader({
  title,
  subtitle,
  mark,
  unread = true,
  onBell,
  onSearch,
}: AppHeaderProps) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
      <View style={styles.left}>
        {mark ? <Image source={S2_MARK} style={styles.mark} resizeMode="contain" /> : null}
        <View style={styles.titles}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          {subtitle ? (
            <Text style={styles.subtitle} numberOfLines={1}>
              {subtitle}
            </Text>
          ) : null}
        </View>
      </View>
      <View style={styles.actions}>
        {onSearch ? (
          <Pressable
            style={({ pressed }) => [styles.iconBtn, pressed && styles.iconBtnPressed]}
            onPress={onSearch}
            accessibilityRole="button"
            accessibilityLabel="Search"
          >
            <Icon name="search" size={18} color={colors.textMuted} />
          </Pressable>
        ) : null}
        <Pressable
          style={({ pressed }) => [styles.iconBtn, pressed && styles.iconBtnPressed]}
          onPress={onBell}
          accessibilityRole="button"
          accessibilityLabel="Notifications"
        >
          <Icon name="bell" size={18} color={colors.textMuted} />
          {unread ? <View style={styles.dot} /> : null}
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: space[3],
    paddingHorizontal: space[5],
    paddingBottom: space[3],
    backgroundColor: colors.bgElev,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  left: { flexDirection: 'row', alignItems: 'center', gap: space[3], minWidth: 0, flexShrink: 1 },
  // 52px per user preference — exceeds Clarity's 22-44px chrome range deliberately
  mark: { width: 52, height: 52, marginRight: 2 },
  titles: { flexShrink: 1, minWidth: 0 },
  title: { fontFamily: fonts.sora600, fontSize: 21, letterSpacing: -0.21, color: colors.text },
  subtitle: { fontFamily: fonts.inter400, fontSize: 12, color: colors.textSubtle, marginTop: 3 },
  actions: { flexDirection: 'row', alignItems: 'center', gap: space[2] },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: radii.full,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.bgSubtle,
  },
  iconBtnPressed: { backgroundColor: colors.bgSunken },
  dot: {
    position: 'absolute',
    top: 7,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.danger,
    borderWidth: 2,
    borderColor: colors.bgElev,
  },
});

export default AppHeader;
