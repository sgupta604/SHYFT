import type { FeatureManifest } from '@/lib/registry';
import { MoreScreen } from './MoreScreen';

export const manifest: FeatureManifest = {
  id: 'more',
  title: 'More',
  icon: 'layout-grid',
  Screen: MoreScreen,
};
