/**
 * Onboarding full-screen push route — thin placeholder (Stream 2 lock).
 * Stream 5.2 replaces the body with <OnboardingScreen />.
 */
import { Text, View } from 'react-native';
import { colors } from '@/lib/theme/colors';
import { space } from '@/lib/theme/spacing';
import { type } from '@/lib/theme/type';

export default function OnboardingRoute() {
  return (
    <View style={{ flex: 1, backgroundColor: colors.bg, padding: space[5] }}>
      <Text style={type.title22}>Onboarding</Text>
    </View>
  );
}
