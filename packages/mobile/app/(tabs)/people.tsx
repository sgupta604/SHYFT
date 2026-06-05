/** People tab route — thin; renders the feature screen from the registry. */
import { getManifest } from '@/lib/registry';

export default function PeopleRoute() {
  const { Screen } = getManifest('people');
  return <Screen />;
}
