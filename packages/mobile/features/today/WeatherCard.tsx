/**
 * WeatherCard — Today weather snapshot. Ports WeatherCard from Cards.jsx:
 *   left: city, accent icon + big temp (Sora), condition · H/L line.
 *   right: first 4 hourly cells (time, muted icon, mono temp).
 */
import { StyleSheet, Text, View } from 'react-native';
import { Card } from '@/components/Card';
import { Icon } from '@/components/Icon';
import { colors } from '@/lib/theme/colors';
import { space } from '@/lib/theme/spacing';
import { fonts, type } from '@/lib/theme/type';
import type { Weather } from '@/lib/data/types';

export type WeatherCardProps = {
  weather: Weather;
};

export function WeatherCard({ weather }: WeatherCardProps) {
  return (
    <Card>
      <View style={styles.row}>
        <View>
          <Text style={[type.label12, styles.city]}>{weather.city}</Text>
          <View style={styles.tempRow}>
            <Icon name={weather.icon} size={30} color={colors.accent} />
            <Text style={styles.temp}>{weather.tempF}°</Text>
          </View>
          <Text style={[type.label12, styles.cond]}>
            {weather.cond} · H {weather.hi}° L {weather.lo}°
          </Text>
        </View>
        <View style={styles.hours}>
          {weather.hours.slice(0, 4).map((h) => (
            <View key={h.t} style={styles.hourCell}>
              <Text style={styles.hourTime}>{h.t}</Text>
              <Icon name={h.icon} size={18} color={colors.textMuted} />
              <Text style={styles.hourTemp}>{h.f}°</Text>
            </View>
          ))}
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', padding: space[4] },
  city: { color: colors.textMuted },
  tempRow: { flexDirection: 'row', alignItems: 'center', gap: space[2], marginTop: 6 },
  temp: { fontFamily: fonts.sora600, fontSize: 34, letterSpacing: -0.68, color: colors.text },
  cond: { color: colors.textMuted, marginTop: 6 },
  hours: { flexDirection: 'row', gap: space[3] + 2 },
  hourCell: { alignItems: 'center', gap: 6 },
  hourTime: { fontFamily: fonts.inter400, fontSize: 11, color: colors.textSubtle },
  hourTemp: { fontFamily: fonts.mono500, fontSize: 12, color: colors.text, fontVariant: ['tabular-nums'] },
});

export default WeatherCard;
