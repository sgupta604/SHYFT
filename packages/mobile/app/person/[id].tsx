/**
 * Profile full-screen push route — thin: renders the People feature's
 * ProfileScreen for the :id param. No business logic here.
 */
import { useLocalSearchParams } from 'expo-router';
import { ProfileScreen } from '@/features/people/ProfileScreen';

export default function ProfileRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <ProfileScreen id={id} />;
}
