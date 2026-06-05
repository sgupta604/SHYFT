/** Events tab route — thin; renders the feature screen from the registry. */
import { getManifest } from '@/lib/registry';

export default function EventsRoute() {
  const { Screen } = getManifest('events');
  return <Screen />;
}
