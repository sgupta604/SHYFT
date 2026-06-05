/**
 * MoreScreen — the catch-all tab: the "Your first day" preboarding entry, the
 * Slack channels discovery directory, the for-sale board, and shortcut rows
 * (swag · notification settings · help & FAQ). Ports MoreScreen.jsx.
 *
 * The hero footer's "N of 5 onboarding steps done" is DERIVED from the
 * onboarding store, so checking items in /onboarding updates it live.
 */
import { Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Card } from '@/components/Card';
import { Icon } from '@/components/Icon';
import { IconTile } from '@/components/IconTile';
import { Pill } from '@/components/Pill';
import { SectionHeader } from '@/components/SectionHeader';
import { CHANNELS } from '@/lib/data/channels';
import { FORSALE } from '@/lib/data/forsale';
import { ONBOARDING } from '@/lib/data/onboarding';
import type { ForSaleItem } from '@/lib/data/types';
import { selectDoneCount, useOnboardingStore } from '@/lib/stores/onboarding';
import { selectInstalledCount, usePluginsStore } from '@/lib/stores/plugins';
import { scale, colors, type Tone } from '@/lib/theme/colors';
import { radii, space } from '@/lib/theme/spacing';
import { fonts, type } from '@/lib/theme/type';
import { ChannelRow } from './ChannelRow';

function FirstDayCard({ done, onPress }: { done: number; onPress: () => void }) {
  return (
    <Card onPress={onPress} style={styles.heroCard}>
      <View style={styles.heroHead}>
        <View style={styles.heroTile}>
          <Icon name="rocket" size={22} color={scale.blue[300]} />
        </View>
        <View style={styles.heroText}>
          <Text style={styles.heroTitle}>Your first day</Text>
          <Text style={styles.heroSub}>
            {ONBOARDING.startDate} · {ONBOARDING.daysToStart} days to go
          </Text>
        </View>
        <Icon name="chevron-right" size={20} color={scale.charcoal[500]} />
      </View>
      <View style={styles.heroFoot}>
        <Icon name="circle-check" size={15} color={colors.success} />
        <Text style={styles.meta}>
          {done} of {ONBOARDING.checklist.length} onboarding steps done
        </Text>
      </View>
    </Card>
  );
}

function ForSaleRow({ item: f, last }: { item: ForSaleItem; last: boolean }) {
  return (
    <View style={[styles.saleRow, !last && styles.divider]}>
      <IconTile icon={f.icon} bg={colors.bgSubtle} fg={colors.textMuted} size={40} />
      <View style={styles.saleText}>
        <Text style={styles.saleTitle} numberOfLines={1}>
          {f.title}
        </Text>
        <Text style={styles.meta} numberOfLines={1}>
          {f.who} · {f.when} ago
        </Text>
      </View>
      <Text style={styles.price}>{f.price}</Text>
    </View>
  );
}

type ShortcutTone = Extract<Tone, 'purple' | 'blue' | 'green'>;

function ShortcutRow({
  icon,
  tone,
  title,
  sub,
  trailing,
  last,
}: {
  icon: string;
  tone: ShortcutTone;
  title: string;
  sub: string;
  trailing: string;
  last?: boolean;
}) {
  return (
    <View style={[styles.linkRow, !last && styles.divider]}>
      <IconTile icon={icon} bg={scale[tone][300]} fg={scale[tone][700]} size={38} />
      <View style={styles.linkText}>
        <Text style={styles.linkTitle}>{title}</Text>
        <Text style={[styles.meta, { marginTop: 2 }]}>{sub}</Text>
      </View>
      <Icon name={trailing} size={trailing === 'external-link' ? 17 : 18} color={colors.textSubtle} />
    </View>
  );
}

function AppRow({
  icon,
  tone,
  title,
  sub,
  onPress,
  pill,
  last,
}: {
  icon: string;
  tone: ShortcutTone;
  title: string;
  sub: string;
  onPress: () => void;
  pill?: boolean;
  last?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => [styles.linkRow, !last && styles.divider, pressed && styles.pressed]}
    >
      <IconTile icon={icon} bg={scale[tone][300]} fg={scale[tone][700]} size={38} />
      <View style={styles.linkText}>
        <Text style={styles.linkTitle}>{title}</Text>
        <Text style={[styles.meta, { marginTop: 2 }]}>{sub}</Text>
      </View>
      {pill ? (
        <View style={styles.trailing}>
          <Pill tone="neutral" dot={false}>
            Dev
          </Pill>
          <Icon name="chevron-right" size={18} color={colors.textSubtle} />
        </View>
      ) : (
        <Icon name="chevron-right" size={18} color={colors.textSubtle} />
      )}
    </Pressable>
  );
}

export function MoreScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const done = useOnboardingStore(selectDoneCount);
  const installedCount = usePluginsStore(selectInstalledCount);
  const developer = usePluginsStore((s) => s.developer);
  const setDeveloper = usePluginsStore((s) => s.setDeveloper);

  return (
    <View style={styles.root}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content, { paddingBottom: space[16] + insets.bottom }]}
        showsVerticalScrollIndicator={false}
      >
        <FirstDayCard done={done} onPress={() => router.push('/onboarding')} />

        <SectionHeader title="Apps & extensions" />
        <Card style={styles.listCard}>
          <AppRow
            icon="layout-grid"
            tone="blue"
            title="Apps"
            sub={`${installedCount} installed`}
            onPress={() => router.push('/apps')}
            last={!developer}
          />
          {developer ? (
            <AppRow
              icon="code-xml"
              tone="purple"
              title="Developer"
              sub="Build, publish & manage your plugins"
              onPress={() => router.push('/developer')}
              pill
              last
            />
          ) : null}
        </Card>

        <SectionHeader title="Slack channels" action="Browse all" />
        <Card style={styles.listCard}>
          <Text style={styles.channelsLead}>Find your people — chats happen in Slack.</Text>
          {CHANNELS.map((c, i) => (
            <ChannelRow key={c.id} channel={c} last={i === CHANNELS.length - 1} />
          ))}
        </Card>

        <SectionHeader title="For sale" action="Post item" />
        <Card style={styles.listCard}>
          {FORSALE.map((f, i) => (
            <ForSaleRow key={f.id} item={f} last={i === FORSALE.length - 1} />
          ))}
        </Card>

        <SectionHeader title="More" />
        <Card style={styles.listCard}>
          <ShortcutRow
            icon="shirt"
            tone="purple"
            title="Swag store"
            sub="Hoodies, stickers, the good water bottle"
            trailing="external-link"
          />
          <ShortcutRow
            icon="bell"
            tone="blue"
            title="Notification settings"
            sub="Push, email, what pings you"
            trailing="chevron-right"
          />
          <ShortcutRow
            icon="life-buoy"
            tone="green"
            title="Help & FAQ"
            sub="Get answers, contact People Ops"
            trailing="chevron-right"
          />
          <View style={styles.linkRow}>
            <IconTile
              icon="code-xml"
              bg={scale.purple[300]}
              fg={scale.purple[700]}
              size={38}
            />
            <View style={styles.linkText}>
              <Text style={styles.linkTitle}>Developer mode</Text>
              <Text style={[styles.meta, { marginTop: 2 }]}>Show the developer console</Text>
            </View>
            <Switch
              testID="developer-mode-switch"
              value={developer}
              onValueChange={setDeveloper}
              trackColor={{ true: colors.accent, false: scale.charcoal[300] }}
              thumbColor={colors.white}
            />
          </View>
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  scroll: { flex: 1 },
  content: { padding: space[4], gap: space[4] },
  meta: { ...type.caption11, fontSize: 12, lineHeight: 17 },
  divider: { borderBottomWidth: 1, borderBottomColor: colors.border },

  // Your first day hero
  heroCard: { padding: 0, overflow: 'hidden' },
  heroHead: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: scale.charcoal[900],
    paddingHorizontal: 18,
    paddingVertical: 16,
  },
  heroTile: {
    width: 44,
    height: 44,
    borderRadius: radii.lg,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(50, 154, 240, 0.18)',
  },
  heroText: { flex: 1, minWidth: 0 },
  heroTitle: { fontFamily: fonts.sora600, fontSize: 15, lineHeight: 18, color: colors.white },
  heroSub: { fontFamily: fonts.inter400, fontSize: 12.5, lineHeight: 16, color: scale.charcoal[400], marginTop: 2 },
  heroFoot: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 18, paddingVertical: 11 },

  // List cards (channels / for sale / shortcuts)
  listCard: { paddingHorizontal: space[5], paddingTop: 2, paddingBottom: 2 },
  channelsLead: {
    ...type.caption11,
    fontSize: 12,
    lineHeight: 17,
    paddingTop: 12,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  // For sale
  saleRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12 },
  saleText: { flex: 1, minWidth: 0 },
  saleTitle: { fontFamily: fonts.inter500, fontSize: 13.5, lineHeight: 16, color: colors.text },
  price: { ...type.mono13, fontFamily: fonts.mono600, fontSize: 14, color: colors.text },

  // Shortcut rows
  linkRow: { flexDirection: 'row', alignItems: 'center', gap: 13, paddingVertical: 13 },
  linkText: { flex: 1, minWidth: 0 },
  linkTitle: { fontFamily: fonts.inter600, fontSize: 13.5, lineHeight: 16, color: colors.text },
  trailing: { flexDirection: 'row', alignItems: 'center', gap: 7 },
  pressed: { opacity: 0.6 },
});

export default MoreScreen;
