import type { FeatureManifest } from '@/lib/registry';
import { PeopleScreen } from './PeopleScreen';

export const manifest: FeatureManifest = {
  id: 'people',
  title: 'People',
  icon: 'users',
  Screen: PeopleScreen,
};
