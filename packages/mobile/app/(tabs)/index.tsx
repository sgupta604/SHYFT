/** Today tab route — thin; renders the feature screen from the registry. */
import { getManifest } from '@/lib/registry';

export default function TodayRoute() {
  const { Screen } = getManifest('today');
  return <Screen />;
}
