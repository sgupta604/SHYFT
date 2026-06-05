import type { FeatureManifest } from '@/lib/registry';
import { EventsScreen } from './EventsScreen';

export const manifest: FeatureManifest = {
  id: 'events',
  title: 'Events',
  icon: 'calendar-days',
  Screen: EventsScreen,
};
