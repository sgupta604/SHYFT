/**
 * TodayScreen — placeholder shell (Stream 2 contract lock).
 * Content lands in Stream 6 behind this same export; the manifest never changes.
 */
import { Text, View } from 'react-native';
import { colors } from '@/lib/theme/colors';
import { space } from '@/lib/theme/spacing';
import { type } from '@/lib/theme/type';

export function TodayScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: colors.bg, padding: space[5] }}>
      <Text style={type.display28}>Today</Text>
    </View>
  );
}

export default TodayScreen;
