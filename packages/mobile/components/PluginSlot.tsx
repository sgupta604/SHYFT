/**
 * PluginSlot — drops all installed plugins for a named slot into a screen.
 * Lives in components/ (shared) so Today/You can render it without importing
 * features/plugins/ (ADR-0001: no cross-feature imports).
 *
 * Reads the plugins store directly: renders NOTHING (null) when showWidgets is
 * off or nothing is installed for the slot, so screens stay uncluttered.
 * Manage / per-widget options both route to the Apps directory.
 */
import { Fragment, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { PluginWidget } from './PluginWidget';
import { SectionHeader } from './SectionHeader';
import { usePluginsStore } from '@/lib/stores/plugins';
import type { PluginSlotId } from '@/lib/data/types';

export type PluginSlotProps = {
  slot: PluginSlotId;
};

export function PluginSlot({ slot }: PluginSlotProps) {
  const router = useRouter();
  const showWidgets = usePluginsStore((s) => s.showWidgets);
  // Subscribe to the stable source fields, then derive the slot list locally so
  // the selector never returns a fresh array (avoids the concurrent re-render loop).
  const plugins = usePluginsStore((s) => s.plugins);
  const installed = usePluginsStore((s) => s.installed);
  const mine = useMemo(
    () => plugins.filter((p) => p.slot === slot && installed.includes(p.id)),
    [plugins, installed, slot]
  );

  if (!showWidgets || mine.length === 0) return null;

  // '/apps' is registered by Stream 3; cast until typed routes know it
  // (same controlled pattern as TodayScreen's cross-tab pushes).
  const openApps = () => router.push('/apps' as never);

  return (
    <Fragment>
      <SectionHeader title="Your apps" action="Manage" onAction={openApps} />
      <View style={styles.list}>
        {mine.map((plugin) => (
          <PluginWidget key={plugin.id} plugin={plugin} onOpen={openApps} />
        ))}
      </View>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  list: { flexDirection: 'column', gap: 10 },
});

export default PluginSlot;
