/**
 * PluginSheet — app-detail bottom sheet wrapping the shared Sheet shell.
 * Header (IconTile 54 + name + "by {dev}") · stat strip (Rating / Installs /
 * Category, hairline-divided) · blurb · permissions list (shield-check rows) ·
 * block Add/Remove button bound to the plugins store. Reads installed.includes
 * live for the button state. Ports Plugins.jsx PluginSheet.
 */
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { IconTile } from '@/components/IconTile';
import { Sheet } from '@/components/Sheet';
import { usePluginsStore } from '@/lib/stores/plugins';
import { colors, scale, type Tone } from '@/lib/theme/colors';
import { fonts } from '@/lib/theme/type';
import type { Plugin } from '@/lib/data/types';

const TILE_TONES: Record<Tone, [bg: string, fg: string]> = {
  blue: [scale.blue[300], scale.blue[700]],
  green: [scale.green[300], scale.green[700]],
  orange: [scale.orange[300], scale.orange[700]],
  pink: [scale.pink[300], scale.pink[700]],
  purple: [scale.purple[300], scale.purple[700]],
  neutral: [scale.charcoal[100], scale.charcoal[700]],
};

export type PluginSheetProps = {
  plugin: Plugin;
  onClose: () => void;
};

export function PluginSheet({ plugin, onClose }: PluginSheetProps) {
  const installed = usePluginsStore((s) => s.installed);
  const toggleInstall = usePluginsStore((s) => s.toggleInstall);
  const isInstalled = installed.includes(plugin.id);
  const [tileBg, tileFg] = TILE_TONES[plugin.tone] ?? TILE_TONES.neutral;

  const stats: [string, string][] = [
    ['Rating', plugin.rating ? plugin.rating.toFixed(1) : '—'],
    ['Installs', `${(plugin.installs / 1000).toFixed(1)}k`],
    ['Category', plugin.category],
  ];

  return (
    <Sheet title="App details" onClose={onClose}>
      <View style={styles.headerRow}>
        <IconTile icon={plugin.icon} bg={tileBg} fg={tileFg} size={54} />
        <View style={styles.headerText}>
          <Text style={styles.name} numberOfLines={1}>
            {plugin.name}
          </Text>
          <Text style={styles.by}>by {plugin.dev}</Text>
        </View>
      </View>

      <View style={styles.statStrip}>
        {stats.map(([k, v], i) => (
          <View key={k} style={[styles.stat, i > 0 && styles.statDivider]}>
            <Text style={styles.statValue}>{v}</Text>
            <Text style={styles.statLabel}>{k}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.blurb}>{plugin.blurb}</Text>

      <View>
        <Text style={styles.permTitle}>PERMISSIONS</Text>
        <View style={styles.permList}>
          {plugin.permissions.map((perm) => (
            <View key={perm} style={styles.permRow}>
              <Icon name="shield-check" size={15} color={colors.textMuted} />
              <Text style={styles.permText}>{perm}</Text>
            </View>
          ))}
        </View>
      </View>

      <Button
        variant={isInstalled ? 'secondary' : 'primary'}
        block
        icon={isInstalled ? 'trash-2' : 'download'}
        onPress={() => toggleInstall(plugin.id)}
      >
        {isInstalled ? 'Remove app' : 'Add to my Commons'}
      </Button>
    </Sheet>
  );
}

const styles = StyleSheet.create({
  headerRow: { flexDirection: 'row', alignItems: 'center', gap: 13 },
  headerText: { flex: 1, minWidth: 0 },
  name: {
    fontFamily: fonts.sora600,
    fontSize: 18,
    lineHeight: 22,
    letterSpacing: -0.18,
    color: colors.text,
  },
  by: { fontFamily: fonts.inter400, fontSize: 12, color: colors.textSubtle, marginTop: 3 },

  statStrip: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.border,
    paddingVertical: 12,
    paddingHorizontal: 4,
  },
  stat: { flex: 1, alignItems: 'center' },
  statDivider: { borderLeftWidth: 1, borderLeftColor: colors.border },
  statValue: { fontFamily: fonts.sora600, fontSize: 15, lineHeight: 15, color: colors.text },
  statLabel: { fontFamily: fonts.inter400, fontSize: 11, color: colors.textSubtle, marginTop: 3 },

  blurb: { fontFamily: fonts.inter400, fontSize: 14, lineHeight: 22, color: colors.textMuted },

  permTitle: {
    fontFamily: fonts.inter600,
    fontSize: 12,
    lineHeight: 12,
    letterSpacing: 0.72,
    color: colors.textSubtle,
    marginBottom: 10,
  },
  permList: { flexDirection: 'column', gap: 9 },
  permRow: { flexDirection: 'row', alignItems: 'center', gap: 9 },
  permText: { fontFamily: fonts.inter400, fontSize: 13, lineHeight: 17, color: colors.text },
});

export default PluginSheet;
