/**
 * PluginWidget — the inline card one installed plugin renders into a slot.
 * Pure presentational; the body switches on the plugin's PluginWidgetSpec kind
 * (next | list | stat | progress). Ported 1:1 from Plugins.jsx PluginWidget.
 *
 * Tone map (prototype CSS vars -> Clarity tokens):
 *   var(--<tone>-700) -> scale[tone][700]   (accent: numbers, dots, bar)
 *   var(--<tone>-300) -> scale[tone][300]   (icon tile bg)
 *   var(--bg-sunken)  -> colors.bgSunken     (progress track)
 *   var(--success)    -> colors.success      (next note dot)
 */
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Icon } from './Icon';
import { IconTile } from './IconTile';
import { Pill } from './Pill';
import { colors, scale, type Tone } from '@/lib/theme/colors';
import { fonts } from '@/lib/theme/type';
import { radii, space } from '@/lib/theme/spacing';
import type { Plugin } from '@/lib/data/types';

/**
 * Tone -> [tile bg (300), accent (700)]. Mirrors the prototype's
 * var(--<tone>-300)/var(--<tone>-700); `neutral` has no bright ramp in the
 * scale so it falls back to charcoal (matches the Pill neutral convention).
 */
const TILE_TONES: Record<Tone, [bg: string, accent: string]> = {
  blue: [scale.blue[300], scale.blue[700]],
  green: [scale.green[300], scale.green[700]],
  orange: [scale.orange[300], scale.orange[700]],
  pink: [scale.pink[300], scale.pink[700]],
  purple: [scale.purple[300], scale.purple[700]],
  neutral: [scale.charcoal[100], scale.charcoal[700]],
};

export type PluginWidgetProps = {
  plugin: Plugin;
  onOpen?: () => void;
};

export function PluginWidget({ plugin, onOpen }: PluginWidgetProps) {
  const [tileBg, accent] = TILE_TONES[plugin.tone] ?? TILE_TONES.neutral;
  const w = plugin.widget;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <IconTile icon={plugin.icon} bg={tileBg} fg={accent} size={32} iconSize={17} />
        <View style={styles.headerText}>
          <Text style={styles.name} numberOfLines={1}>
            {plugin.name}
          </Text>
          <Text style={styles.via} numberOfLines={1}>
            via {plugin.dev}
          </Text>
        </View>
        <Pressable
          onPress={onOpen}
          accessibilityRole="button"
          accessibilityLabel="Plugin options"
          style={({ pressed }) => [styles.optionsBtn, pressed && styles.pressed]}
          hitSlop={6}
        >
          <Icon name="ellipsis" size={15} color={colors.textMuted} />
        </Pressable>
      </View>

      {w?.kind === 'next' && (
        <View style={styles.nextRow}>
          <Text style={[styles.nextValue, { color: accent }]}>{w.value}</Text>
          <Text style={styles.nextUnit}>{w.unit}</Text>
          <View style={styles.spacer} />
          <View style={styles.nextRight}>
            <Text style={styles.nextLabel}>{w.label}</Text>
            <View style={styles.noteRow}>
              <View style={[styles.noteDot, { backgroundColor: colors.success }]} />
              <Text style={styles.noteText}>{w.note}</Text>
            </View>
          </View>
        </View>
      )}

      {w?.kind === 'list' && (
        <View>
          <Text style={styles.listLabel}>{w.label}</Text>
          <View style={styles.listItems}>
            {w.items.map((it, i) => (
              <View key={i} style={styles.listItem}>
                <View style={[styles.listDot, { backgroundColor: accent }]} />
                <Text style={styles.listItemText}>{it}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {w?.kind === 'stat' && (
        <View style={styles.statRow}>
          <View>
            <Text style={styles.statValue}>{w.value}</Text>
            <Text style={styles.statLabel}>{w.label}</Text>
          </View>
          <Pill tone={w.deltaTone ?? 'green'} dot={false}>
            {w.delta}
          </Pill>
        </View>
      )}

      {w?.kind === 'progress' && (
        <View>
          <View style={styles.progressTop}>
            <View style={styles.progressUsedRow}>
              <Text style={styles.progressUsed}>{w.used}</Text>
              <Text style={styles.progressOf}>
                of {w.total} {w.unit}
              </Text>
            </View>
            <Text style={styles.progressLabel}>{w.label}</Text>
          </View>
          <View
            testID="plugin-progress-bar"
            style={[styles.progressTrack, { backgroundColor: colors.bgSunken }]}
          >
            <View
              style={[
                styles.progressFill,
                {
                  width: `${Math.round((w.used / w.total) * 100)}%`,
                  backgroundColor: accent,
                },
              ]}
            />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.bgElev,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.xl,
    padding: 14,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 11,
  },
  headerText: { flex: 1, minWidth: 0 },
  name: { fontFamily: fonts.inter600, fontSize: 13, lineHeight: 16, color: colors.text },
  via: { fontFamily: fonts.inter400, fontSize: 11, color: colors.textSubtle, marginTop: 1 },
  optionsBtn: {
    width: 28,
    height: 28,
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: { backgroundColor: colors.bgSubtle },

  // next
  nextRow: { flexDirection: 'row', alignItems: 'baseline', gap: space[2] },
  nextValue: { fontFamily: fonts.sora600, fontSize: 26, lineHeight: 26, letterSpacing: -0.52 },
  nextUnit: { fontFamily: fonts.inter400, fontSize: 12, color: colors.textSubtle },
  spacer: { flex: 1 },
  nextRight: { alignItems: 'flex-end' },
  nextLabel: { fontFamily: fonts.inter500, fontSize: 12, lineHeight: 16, color: colors.text },
  noteRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2 },
  noteDot: { width: 6, height: 6, borderRadius: 3 },
  noteText: { fontFamily: fonts.inter400, fontSize: 11, color: colors.textSubtle },

  // list
  listLabel: { fontFamily: fonts.inter400, fontSize: 11, color: colors.textSubtle, marginBottom: 7 },
  listItems: { flexDirection: 'column', gap: 5 },
  listItem: { flexDirection: 'row', alignItems: 'center', gap: space[2] },
  listDot: { width: 5, height: 5, borderRadius: 2.5 },
  listItemText: { fontFamily: fonts.inter400, fontSize: 12.5, lineHeight: 16, color: colors.text, flex: 1 },

  // stat
  statRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  statValue: { fontFamily: fonts.sora600, fontSize: 24, lineHeight: 24, letterSpacing: -0.48, color: colors.text },
  statLabel: { fontFamily: fonts.inter400, fontSize: 11, color: colors.textSubtle, marginTop: 3 },

  // progress
  progressTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 7 },
  progressUsedRow: { flexDirection: 'row', alignItems: 'baseline', gap: 5 },
  progressUsed: { fontFamily: fonts.sora600, fontSize: 20, lineHeight: 20, color: colors.text },
  progressOf: { fontFamily: fonts.inter400, fontSize: 11, color: colors.textSubtle },
  progressLabel: { fontFamily: fonts.inter400, fontSize: 11, color: colors.textSubtle },
  progressTrack: { height: 6, borderRadius: 9999, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 9999 },
});

export default PluginWidget;
