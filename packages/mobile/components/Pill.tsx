/**
 * Pill — one piece of state. Tone triples [bg, fg, dot] ported from
 * Primitives.jsx PILL_TONES (CSS vars resolved to Clarity scale values).
 */
import type { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { scale, type Tone } from '@/lib/theme/colors';
import { fonts } from '@/lib/theme/type';

type Triple = [bg: string, fg: string, dot: string];

const PILL_TONES: Record<Tone, Triple> = {
  blue: [scale.blue[100], scale.blue[800], scale.blue[700]],
  green: [scale.green[300], scale.green[700], scale.green[700]],
  orange: [scale.orange[300], scale.orange[700], scale.orange[700]],
  pink: [scale.pink[300], scale.pink[700], scale.pink[700]],
  purple: [scale.purple[300], scale.purple[700], scale.purple[700]],
  neutral: [scale.charcoal[100], scale.charcoal[700], scale.charcoal[500]],
};

export type PillProps = {
  children: ReactNode;
  tone?: Tone;
  dot?: boolean;
};

export function Pill({ children, tone = 'neutral', dot = true }: PillProps) {
  const [bg, fg, d] = PILL_TONES[tone] ?? PILL_TONES.neutral;
  return (
    <View style={[styles.pill, { backgroundColor: bg }]}>
      {dot && <View style={[styles.dot, { backgroundColor: d }]} />}
      <Text style={[styles.label, { color: fg }]}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingVertical: 5,
    paddingHorizontal: 9,
    borderRadius: 9999,
    alignSelf: 'flex-start',
  },
  dot: { width: 6, height: 6, borderRadius: 3 },
  label: { fontFamily: fonts.inter600, fontSize: 11, lineHeight: 11 },
});

export default Pill;
