/**
 * Segmented — full-width tab selector on a sunken track; active segment lifts
 * onto a white surface. Ports .c-seg from commons.css.
 */
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '@/lib/theme/colors';
import { radii } from '@/lib/theme/spacing';
import { fonts } from '@/lib/theme/type';

export type SegmentedProps = {
  options: string[];
  value: string;
  onChange: (value: string) => void;
};

export function Segmented({ options, value, onChange }: SegmentedProps) {
  return (
    <View style={styles.track}>
      {options.map((o) => {
        const on = o === value;
        return (
          <Pressable
            key={o}
            accessibilityRole="button"
            accessibilityState={{ selected: on }}
            onPress={() => onChange(o)}
            style={[styles.seg, on && styles.segOn]}
          >
            <Text style={[styles.label, on && styles.labelOn]}>{o}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    flexDirection: 'row',
    backgroundColor: colors.bgSubtle,
    borderRadius: radii.md,
    padding: 3,
    gap: 2,
  },
  seg: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segOn: { backgroundColor: colors.bgElev },
  label: { fontFamily: fonts.inter500, fontSize: 12.5, color: colors.textMuted },
  labelOn: { color: colors.text },
});

export default Segmented;
