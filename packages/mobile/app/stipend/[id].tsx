/**
 * StipendDetail full-screen push route — thin. Renders the feature screen from
 * features/you/ with the route's [id] param. Routing only, no business logic.
 */
import { useLocalSearchParams } from 'expo-router';
import { StipendDetailScreen } from '@/features/you/StipendDetailScreen';

export default function StipendDetailRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <StipendDetailScreen id={id} />;
}
