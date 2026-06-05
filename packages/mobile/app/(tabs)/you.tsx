/** You tab route — thin; renders the feature screen from the registry. */
import { getManifest } from '@/lib/registry';

export default function YouRoute() {
  const { Screen } = getManifest('you');
  return <Screen />;
}
