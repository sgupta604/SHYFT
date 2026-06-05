import type { FeatureManifest } from '@/lib/registry';
import { YouScreen } from './YouScreen';

export const manifest: FeatureManifest = {
  id: 'you',
  title: 'You',
  icon: 'circle-user',
  Screen: YouScreen,
};
