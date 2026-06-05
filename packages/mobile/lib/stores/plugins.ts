/**
 * Plugins store — single source of truth for the install list and the two
 * app-shell flags (developer console gate + widget slot visibility).
 *
 * `installed[]` is seeded from the static `installed:true` flags in lib/data
 * but is thereafter the ONLY gate: directory rows, the sheet, and the Today/You
 * slots all read this list, so install/remove reflects instantly everywhere.
 * Both flags default `true` so the demo shows the console and populated slots.
 * App-shell flags (modeled on lib/stores/ui.ts), not domain state.
 */
import { create } from 'zustand';
import { PLUGINS } from '@/lib/data/plugins';
import type { Plugin, PluginSlotId } from '@/lib/data/types';

interface PluginsState {
  plugins: Plugin[];
  installed: string[];
  developer: boolean;
  showWidgets: boolean;
  toggleInstall: (id: string) => void;
  setDeveloper: (v: boolean) => void;
  setShowWidgets: (v: boolean) => void;
}

export const usePluginsStore = create<PluginsState>((set) => ({
  plugins: PLUGINS.map((p) => ({ ...p })),
  installed: PLUGINS.filter((p) => p.installed).map((p) => p.id),
  developer: true,
  showWidgets: true,
  toggleInstall: (id) =>
    set((s) => ({
      installed: s.installed.includes(id)
        ? s.installed.filter((x) => x !== id)
        : [...s.installed, id],
    })),
  setDeveloper: (v) => set({ developer: v }),
  setShowWidgets: (v) => set({ showWidgets: v }),
}));

export const selectInstalledCount = (s: PluginsState): number => s.installed.length;

export const selectSlot =
  (slot: PluginSlotId) =>
  (s: PluginsState): Plugin[] =>
    s.plugins.filter((p) => p.slot === slot && s.installed.includes(p.id));
