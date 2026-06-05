/**
 * EventsScreen — placeholder shell (Stream 2 contract lock).
 * Content lands in Stream 4 behind this same export; the manifest never changes.
 */
import { Text, View } from 'react-native';
import { colors } from '@/lib/theme/colors';
import { space } from '@/lib/theme/spacing';
import { type } from '@/lib/theme/type';

export function EventsScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: colors.bg, padding: space[5] }}>
      <Text style={type.display28}>Events</Text>
    </View>
  );
}

export default EventsScreen;
