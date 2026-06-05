/** More tab route — thin; renders the feature screen from the registry. */
import { getManifest } from '@/lib/registry';

export default function MoreRoute() {
  const { Screen } = getManifest('more');
  return <Screen />;
}
