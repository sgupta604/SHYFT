/**
 * Developer console full-screen push route — thin + role-gated. Renders the
 * feature screen from features/plugins/ only when the plugins store's
 * `developer` flag is set; otherwise redirects back to More (defense-in-depth —
 * the row that opens this is already gated). Routing only, no business logic.
 */
import { Redirect } from 'expo-router';
import { DeveloperScreen } from '@/features/plugins/DeveloperScreen';
import { usePluginsStore } from '@/lib/stores/plugins';

export default function DeveloperRoute() {
  const developer = usePluginsStore((s) => s.developer);
  if (!developer) {
    return <Redirect href="/(tabs)/more" />;
  }
  return <DeveloperScreen />;
}
