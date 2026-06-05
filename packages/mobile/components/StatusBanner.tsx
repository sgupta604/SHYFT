/**
 * StatusBanner — office-status / advisory strip. Tone triples [border, fg, bg]
 * ported from Primitives.jsx BANNER_TONES.
 */
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Icon } from './Icon';
import { colors, scale, type Tone } from '@/lib/theme/colors';
import { radii } from '@/lib/theme/spacing';
import { fonts } from '@/lib/theme/type';

type BannerTone = 'green' | 'blue' | 'orange' | 'pink';
type Triple = [border: string, fg: string, bg: string];

const BANNER_TONES: Record<BannerTone, Triple> = {
  pink: [scale.pink[300], scale.pink[700], 'rgba(194,37,92,0.07)'],
  orange: [scale.orange[300], scale.orange[700], 'rgba(232,89,12,0.07)'],
  green: [scale.green[300], scale.green[700], 'rgba(47,158,68,0.07)'],
  blue: [scale.blue[200], scale.blue[700], scale.blue[50]],
};

export type StatusBannerProps = {
  tone?: Tone;
  icon?: string;
  title: string;
  text?: string;
  action?: string;
  onAction?: () => void;
};

export function StatusBanner({
  tone = 'green',
  icon = 'check-circle-2',
  title,
  text,
  action,
  onAction,
}: StatusBannerProps) {
  const key: BannerTone = (['green', 'blue', 'orange', 'pink'] as const).includes(
    tone as BannerTone
  )
    ? (tone as BannerTone)
    : 'green';
  const [border, fg, bg] = BANNER_TONES[key];
  return (
    <View style={[styles.banner, { borderColor: border, backgroundColor: bg }]}>
      <Icon name={icon} size={19} color={fg} style={{ marginTop: 1 }} />
      <View style={styles.body}>
        <Text style={[styles.title, { color: fg }]}>{title}</Text>
        {text ? <Text style={styles.text}>{text}</Text> : null}
      </View>
      {action ? (
        <Pressable onPress={onAction} accessibilityRole="button" style={styles.actionWrap}>
          <Text style={[styles.action, { color: fg }]}>{action}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 11,
    borderRadius: radii.lg,
    paddingVertical: 13,
    paddingHorizontal: 14,
    borderWidth: 1,
  },
  body: { flex: 1 },
  title: { fontFamily: fonts.inter600, fontSize: 13.5, lineHeight: 18 },
  text: { fontFamily: fonts.inter400, fontSize: 12.5, lineHeight: 18, color: colors.textMuted, marginTop: 2 },
  actionWrap: { alignSelf: 'center' },
  action: { fontFamily: fonts.inter600, fontSize: 12.5 },
});

export default StatusBanner;
