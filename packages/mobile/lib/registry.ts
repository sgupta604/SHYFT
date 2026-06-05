/**
 * Feature registry — the plugin seam (Phase 1: compile-time plugins).
 *
 * A feature module is one self-contained `features/<id>/` folder that exports a
 * manifest `{ id, title, icon, Screen }`. The tab layout builds the bottom bar
 * from REGISTRY in order. FROZEN after Stream 2 — parallel feature streams add
 * their screens behind the same manifest and never edit this file.
 */
import type { ComponentType } from 'react';

export interface FeatureManifest {
  /** Stable id; also the (tabs) route segment (today -> index). */
  id: 'today' | 'events' | 'you' | 'people' | 'more';
  /** Tab label. */
  title: string;
  /** Lucide icon name for the tab bar. */
  icon: string;
  /** The tab's root screen. */
  Screen: ComponentType;
}

import { manifest as todayManifest } from '@/features/today/manifest';
import { manifest as eventsManifest } from '@/features/events/manifest';
import { manifest as youManifest } from '@/features/you/manifest';
import { manifest as peopleManifest } from '@/features/people/manifest';
import { manifest as moreManifest } from '@/features/more/manifest';

export const REGISTRY: FeatureManifest[] = [
  todayManifest,
  eventsManifest,
  youManifest,
  peopleManifest,
  moreManifest,
];

export function getManifest(id: FeatureManifest['id']): FeatureManifest {
  const m = REGISTRY.find((f) => f.id === id);
  if (!m) throw new Error(`[registry] no feature manifest for id "${id}"`);
  return m;
}
