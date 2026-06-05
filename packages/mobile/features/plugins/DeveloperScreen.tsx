/**
 * DeveloperScreen — the role-gated publish console, a full-screen push reached
 * from More (and the Apps "Build your own" footer). Back header · dark metrics
 * card (total installs across Published apps, live count, static avg rating) ·
 * "New plugin" CTA (no-op) · "Your plugins" list with status Pills via
 * DEV_STATUS_TONE · "Resources" SDK link rows (no-op) · footer note.
 * Ports Plugins.jsx DeveloperScreen. The /developer route gates on the store's
 * `developer` flag; this screen is purely presentational over DEV_PLUGINS.
 */
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { IconTile } from '@/components/IconTile';
import { Pill } from '@/components/Pill';
import { SectionHeader } from '@/components/SectionHeader';
import { DEV_PLUGINS, DEV_STATUS_TONE } from '@/lib/data/plugins';
import { colors, scale, type Tone } from '@/lib/theme/colors';
import { radii, space } from '@/lib/theme/spacing';
import { fonts } from '@/lib/theme/type';
import type { DevPlugin } from '@/lib/data/types';

const TILE_TONES: Record<Tone, [bg: string, fg: string]> = {
  blue: [scale.blue[300], scale.blue[700]],
  green: [scale.green[300], scale.green[700]],
  orange: [scale.orange[300], scale.orange[700]],
  pink: [scale.pink[300], scale.pink[700]],
  purple: [scale.purple[300], scale.purple[700]],
  neutral: [scale.charcoal[100], scale.charcoal[700]],
};

function Stars({ value }: { value: number | null }) {
  if (value == null) return null;
  return (
    <View style={styles.stars}>
      <Icon name="star" size={12} color={scale.orange[700]} fill={scale.orange[700]} />
      <Text style={styles.starsValue}>{value.toFixed(1)}</Text>
    </View>
  );
}

function DevPluginRow({ plugin, last }: { plugin: DevPlugin; last: boolean }) {
  const [tileBg, tileFg] = TILE_TONES[plugin.tone] ?? TILE_TONES.neutral;
  return (
    <View style={[styles.devRow, !last && styles.devRowDivider]}>
      <IconTile icon={plugin.icon} bg={tileBg} fg={tileFg} size={40} />
      <View style={styles.devText}>
        <View style={styles.devNameRow}>
          <Text style={styles.devName} numberOfLines={1}>
            {plugin.name}
          </Text>
          <Text style={styles.devVersion}>{plugin.version}</Text>
        </View>
        <Text style={styles.devNote} numberOfLines={1}>
          {plugin.note}
        </Text>
        {plugin.status === 'Published' ? (
          <View style={styles.devStats}>
            <Text style={styles.devInstalls}>{plugin.installs.toLocaleString()} installs</Text>
            <Stars value={plugin.rating} />
          </View>
        ) : null}
      </View>
      <View style={styles.devTrailing}>
        <Pill tone={DEV_STATUS_TONE[plugin.status] ?? 'neutral'} dot={plugin.status === 'In review'}>
          {plugin.status}
        </Pill>
        <Icon name="chevron-right" size={17} color={colors.textSubtle} />
      </View>
    </View>
  );
}

type ResourceTone = Extract<Tone, 'blue' | 'purple' | 'green'>;

function ResourceRow({
  icon,
  tone,
  title,
  sub,
  trailing,
  last,
}: {
  icon: string;
  tone: ResourceTone;
  title: string;
  sub: string;
  trailing?: string;
  last?: boolean;
}) {
  return (
    <View style={[styles.linkRow, !last && styles.devRowDivider]}>
      <IconTile icon={icon} bg={scale[tone][300]} fg={scale[tone][700]} size={38} />
      <View style={styles.linkText}>
        <Text style={styles.linkTitle}>{title}</Text>
        <Text style={styles.linkSub}>{sub}</Text>
      </View>
      {trailing ? <Icon name={trailing} size={17} color={colors.textSubtle} /> : null}
    </View>
  );
}

export function DeveloperScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const published = DEV_PLUGINS.filter((d) => d.status === 'Published');
  const totalInstalls = published.reduce((sum, d) => sum + d.installs, 0);

  return (
    <View style={styles.root}>
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <Pressable
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel="Back"
          hitSlop={8}
          style={({ pressed }) => [styles.iconBtn, pressed && styles.iconBtnPressed]}
        >
          <Icon name="chevron-left" size={20} color={colors.text} />
        </Pressable>
        <Text style={styles.headerTitle}>Developer</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content, { paddingBottom: space[16] + insets.bottom }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.metricsCard}>
          <View style={styles.metricsHead}>
            <Icon name="code-xml" size={16} color={scale.blue[300]} />
            <Text style={styles.metricsLabel}>YOUR PUBLISHED APPS</Text>
          </View>
          <View style={styles.metricsRow}>
            <View>
              <Text style={styles.metricValue}>{totalInstalls.toLocaleString()}</Text>
              <Text style={styles.metricCaption}>total installs</Text>
            </View>
            <View>
              <Text style={styles.metricValue}>{published.length}</Text>
              <Text style={styles.metricCaption}>live</Text>
            </View>
            <View>
              <Text style={styles.metricValue}>4.8</Text>
              <Text style={styles.metricCaption}>avg rating</Text>
            </View>
          </View>
        </View>

        <Button variant="primary" block icon="plus" onPress={() => {}}>
          New plugin
        </Button>

        <SectionHeader title="Your plugins" />
        <View style={styles.listCard}>
          {DEV_PLUGINS.map((d, i) => (
            <DevPluginRow key={d.id} plugin={d} last={i === DEV_PLUGINS.length - 1} />
          ))}
        </View>

        <SectionHeader title="Resources" />
        <View style={styles.listCard}>
          <ResourceRow
            icon="book-open"
            tone="blue"
            title="Plugin SDK docs"
            sub="Slots, APIs, design guidelines"
            trailing="external-link"
          />
          <ResourceRow
            icon="git-branch"
            tone="purple"
            title="Sample plugins"
            sub="Starter repos on GitHub"
            trailing="external-link"
          />
          <ResourceRow
            icon="messages-square"
            tone="green"
            title="#plugin-developers"
            sub="Get help from the platform team"
            last
          />
        </View>

        <Text style={styles.footnote}>
          Submissions are reviewed by the platform team against the Clarity design and security
          guidelines.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: space[4],
    paddingBottom: 12,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: radii.md,
    backgroundColor: colors.bgSubtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBtnPressed: { backgroundColor: colors.bgSunken },
  headerTitle: {
    fontFamily: fonts.sora600,
    fontSize: 21,
    lineHeight: 23,
    letterSpacing: -0.21,
    color: colors.text,
  },

  scroll: { flex: 1 },
  content: { paddingHorizontal: space[4], paddingTop: space[1], gap: space[3] },

  // Dark metrics card
  metricsCard: {
    backgroundColor: scale.charcoal[900],
    borderRadius: radii.xl,
    paddingHorizontal: 20,
    paddingVertical: 18,
  },
  metricsHead: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  metricsLabel: {
    fontFamily: fonts.inter500,
    fontSize: 12,
    lineHeight: 12,
    letterSpacing: 0.72,
    color: scale.charcoal[400],
  },
  metricsRow: { flexDirection: 'row', gap: 24, marginTop: 14 },
  metricValue: {
    fontFamily: fonts.sora600,
    fontSize: 26,
    lineHeight: 26,
    letterSpacing: -0.52,
    color: colors.white,
    fontVariant: ['tabular-nums'],
  },
  metricCaption: {
    fontFamily: fonts.inter400,
    fontSize: 12,
    lineHeight: 14,
    color: scale.charcoal[400],
    marginTop: 4,
  },

  // Your plugins / Resources list cards
  listCard: {
    backgroundColor: colors.bgElev,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.xl,
    paddingHorizontal: space[4],
  },
  devRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 13 },
  devRowDivider: { borderBottomWidth: 1, borderBottomColor: colors.border },
  devText: { flex: 1, minWidth: 0 },
  devNameRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  devName: {
    fontFamily: fonts.inter600,
    fontSize: 13.5,
    lineHeight: 16,
    color: colors.text,
    flexShrink: 1,
  },
  devVersion: {
    fontFamily: fonts.mono600,
    fontSize: 11,
    color: colors.textSubtle,
    fontVariant: ['tabular-nums'],
  },
  devNote: { fontFamily: fonts.inter400, fontSize: 11.5, color: colors.textSubtle, marginTop: 3 },
  devStats: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 5 },
  devInstalls: { fontFamily: fonts.inter400, fontSize: 11, color: colors.textSubtle },
  devTrailing: { alignItems: 'flex-end', gap: 8 },

  stars: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  starsValue: {
    fontFamily: fonts.mono600,
    fontSize: 11.5,
    color: colors.textMuted,
    fontVariant: ['tabular-nums'],
  },

  linkRow: { flexDirection: 'row', alignItems: 'center', gap: 13, paddingVertical: 13 },
  linkText: { flex: 1, minWidth: 0 },
  linkTitle: { fontFamily: fonts.inter600, fontSize: 13.5, lineHeight: 16, color: colors.text },
  linkSub: { fontFamily: fonts.inter400, fontSize: 11.5, color: colors.textSubtle, marginTop: 2 },

  footnote: {
    fontFamily: fonts.inter400,
    fontSize: 12,
    lineHeight: 17,
    color: colors.textSubtle,
    textAlign: 'center',
    paddingHorizontal: 24,
    paddingTop: 2,
    paddingBottom: 8,
  },
});

export default DeveloperScreen;
