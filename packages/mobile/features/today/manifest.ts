import type { FeatureManifest } from '@/lib/registry';
import { TodayScreen } from './TodayScreen';

export const manifest: FeatureManifest = {
  id: 'today',
  title: 'Today',
  icon: 'house',
  Screen: TodayScreen,
};
