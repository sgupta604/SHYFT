/**
 * AppsScreen — the Apps directory, a full-screen push from More.
 * Back header + "N installed" counter · horizontal category chips (local
 * `cat` state, default All) · plugin rows (IconTile 42, blurb, stars + installs,
 * Add/Added button bound to the store) · dashed "Build your own" footer that
 * bridges to the developer console. Tapping a row opens PluginSheet.
 * Ports Plugins.jsx AppsScreen + AppRow + Stars.
 */
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { IconTile } from '@/components/IconTile';
import { PluginSheet } from './PluginSheet';
import { usePluginsStore } from '@/lib/stores/plugins';
import { PLUGIN_CATEGORIES } from '@/lib/data/plugins';
import { colors, scale, type Tone } from '@/lib/theme/colors';
import { radii, space } from '@/lib/theme/spacing';
import { fonts } from '@/lib/theme/type';
import type { Plugin, PluginCategory } from '@/lib/data/types';

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

type AppRowProps = {
  plugin: Plugin;
  isInstalled: boolean;
  onOpen: () => void;
  onToggle: () => void;
  last: boolean;
};

function AppRow({ plugin, isInstalled, onOpen, onToggle, last }: AppRowProps) {
  const [tileBg, tileFg] = TILE_TONES[plugin.tone] ?? TILE_TONES.neutral;
  return (
    <View style={[styles.row, !last && styles.rowDivider]}>
      <Pressable
        onPress={onOpen}
        accessibilityRole="button"
        style={({ pressed }) => [styles.rowMain, pressed && styles.rowMainPressed]}
      >
        <IconTile icon={plugin.icon} bg={tileBg} fg={tileFg} size={42} />
        <View style={styles.rowText}>
          <Text style={styles.rowName} numberOfLines={1}>
            {plugin.name}
          </Text>
          <Text style={styles.rowBlurb} numberOfLines={1}>
            {plugin.blurb}
          </Text>
          <View style={styles.rowMeta}>
            <Stars value={plugin.rating} />
            <Text style={styles.rowMetaText} numberOfLines={1}>
              {(plugin.installs / 1000).toFixed(1)}k installs · {plugin.dev}
            </Text>
          </View>
        </View>
      </Pressable>
      <Button
        variant={isInstalled ? 'secondary' : 'primary'}
        size="sm"
        icon={isInstalled ? 'check' : 'plus'}
        onPress={onToggle}
      >
        {isInstalled ? 'Added' : 'Add'}
      </Button>
    </View>
  );
}

export function AppsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const plugins = usePluginsStore((s) => s.plugins);
  const installed = usePluginsStore((s) => s.installed);
  const developer = usePluginsStore((s) => s.developer);
  const toggleInstall = usePluginsStore((s) => s.toggleInstall);

  const [cat, setCat] = useState<PluginCategory>('All');
  const [openPlugin, setOpenPlugin] = useState<Plugin | null>(null);

  const list = useMemo(
    () => plugins.filter((p) => cat === 'All' || p.category === cat),
    [plugins, cat]
  );

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
        <Text style={styles.headerTitle}>Apps</Text>
        <View style={styles.spacer} />
        <Text style={styles.installedCount}>{installed.length} installed</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content, { paddingBottom: space[16] + insets.bottom }]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.intro}>
          Extensions built by teams across Shyft. Add one and it shows up right inside the app.
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipsRow}
          style={styles.chipsScroll}
        >
          {PLUGIN_CATEGORIES.map((c) => {
            const active = cat === c;
            return (
              <Pressable
                key={c}
                onPress={() => setCat(c)}
                accessibilityRole="button"
                style={[styles.chip, active ? styles.chipActive : styles.chipIdle]}
              >
                <Text style={active ? styles.chipLabelActive : styles.chipLabel}>{c}</Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <View style={styles.listCard}>
          {list.map((p, i) => (
            <AppRow
              key={p.id}
              plugin={p}
              isInstalled={installed.includes(p.id)}
              onOpen={() => setOpenPlugin(p)}
              onToggle={() => toggleInstall(p.id)}
              last={i === list.length - 1}
            />
          ))}
        </View>

        <Pressable
          onPress={() => router.push('/developer' as never)}
          accessibilityRole="button"
          style={({ pressed }) => [styles.byo, pressed && styles.byoPressed]}
        >
          <IconTile icon="code-xml" bg={colors.bgElev} fg={colors.textMuted} size={38} />
          <View style={styles.byoText}>
            <Text style={styles.byoTitle}>Build your own</Text>
            <Text style={styles.byoSub}>
              {developer
                ? 'Open the developer console'
                : 'See the docs and request developer access'}
            </Text>
          </View>
          <Icon name="arrow-up-right" size={18} color={colors.textSubtle} />
        </Pressable>
      </ScrollView>

      {openPlugin ? (
        <PluginSheet plugin={openPlugin} onClose={() => setOpenPlugin(null)} />
      ) : null}
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
  spacer: { flex: 1 },
  installedCount: {
    fontFamily: fonts.mono500,
    fontSize: 12,
    color: colors.textSubtle,
    fontVariant: ['tabular-nums'],
  },

  scroll: { flex: 1 },
  content: { paddingHorizontal: space[4], paddingTop: space[1], gap: space[3] },
  intro: { fontFamily: fonts.inter400, fontSize: 12, lineHeight: 17, color: colors.textMuted },

  chipsScroll: { marginHorizontal: -space[4] },
  chipsRow: { gap: 7, paddingHorizontal: space[4], paddingBottom: 2 },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 13,
    borderRadius: radii.full,
    borderWidth: 1,
  },
  chipActive: { backgroundColor: scale.charcoal[900], borderColor: 'transparent' },
  chipIdle: { backgroundColor: colors.bgElev, borderColor: colors.borderStrong },
  chipLabel: { fontFamily: fonts.inter600, fontSize: 12.5, color: colors.textMuted },
  chipLabelActive: { fontFamily: fonts.inter600, fontSize: 12.5, color: colors.white },

  listCard: {
    backgroundColor: colors.bgElev,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.xl,
    paddingHorizontal: space[4],
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 13 },
  rowDivider: { borderBottomWidth: 1, borderBottomColor: colors.border },
  rowMain: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1, minWidth: 0, borderRadius: radii.md },
  rowMainPressed: { opacity: 0.6 },
  rowText: { flex: 1, minWidth: 0 },
  rowName: { fontFamily: fonts.inter600, fontSize: 13.5, lineHeight: 16, color: colors.text },
  rowBlurb: { fontFamily: fonts.inter400, fontSize: 11.5, color: colors.textSubtle, marginTop: 2 },
  rowMeta: { flexDirection: 'row', alignItems: 'center', gap: 9, marginTop: 5 },
  rowMetaText: { fontFamily: fonts.inter400, fontSize: 11, color: colors.textSubtle, flex: 1 },

  stars: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  starsValue: {
    fontFamily: fonts.mono600,
    fontSize: 11.5,
    color: colors.textMuted,
    fontVariant: ['tabular-nums'],
  },

  byo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 13,
    padding: 15,
    borderRadius: radii.xl,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.borderStrong,
    backgroundColor: colors.bgSubtle,
  },
  byoPressed: { backgroundColor: colors.bgSunken },
  byoText: { flex: 1 },
  byoTitle: { fontFamily: fonts.inter600, fontSize: 13.5, lineHeight: 16, color: colors.text },
  byoSub: { fontFamily: fonts.inter400, fontSize: 11.5, color: colors.textSubtle, marginTop: 2 },
});

export default AppsScreen;
