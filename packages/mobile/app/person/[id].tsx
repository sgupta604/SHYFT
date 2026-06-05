/**
 * Profile full-screen push route — thin placeholder (Stream 2 lock).
 * Stream 7.2 replaces the body with <ProfileScreen id={id} />.
 */
import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';
import { colors } from '@/lib/theme/colors';
import { space } from '@/lib/theme/spacing';
import { type } from '@/lib/theme/type';

export default function ProfileRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return (
    <View style={{ flex: 1, backgroundColor: colors.bg, padding: space[5] }}>
      <Text style={type.title22}>Profile</Text>
      <Text style={type.body14}>{id}</Text>
    </View>
  );
}
