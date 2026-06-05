/**
 * Sheet — bottom sheet shell. Transparent RN Modal + Animated (native driver).
 *   scrim: opacity 0->1 over 180ms
 *   panel: translateY(18->0) + opacity over 220ms, ease-out (no bounce)
 * Grab handle, title row + X, scrim tap-to-close, max-height 88%, radius 28 top.
 * No drag-to-dismiss (plan Non-Goal) — scrim/X only.
 */
import { type ReactNode, useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from './Icon';
import { colors, scale } from '@/lib/theme/colors';
import { radii, space } from '@/lib/theme/spacing';
import { type } from '@/lib/theme/type';

export type SheetProps = {
  visible?: boolean;
  title?: string;
  onClose: () => void;
  children: ReactNode;
};

export function Sheet({ visible = true, title, onClose, children }: SheetProps) {
  const insets = useSafeAreaInsets();
  const scrim = useRef(new Animated.Value(0)).current;
  const rise = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!visible) return;
    scrim.setValue(0);
    rise.setValue(0);
    Animated.parallel([
      Animated.timing(scrim, {
        toValue: 1,
        duration: 180,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(rise, {
        toValue: 1,
        duration: 220,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();
  }, [visible, scrim, rise]);

  const translateY = rise.interpolate({ inputRange: [0, 1], outputRange: [18, 0] });

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
      <View style={styles.root}>
        <Animated.View style={[styles.scrim, { opacity: scrim }]}>
          <Pressable style={StyleSheet.absoluteFill} onPress={onClose} accessibilityLabel="Close" />
        </Animated.View>
        <Animated.View style={[styles.panel, { opacity: rise, transform: [{ translateY }] }]}>
          <View style={styles.grab} />
          {title ? (
            <View style={styles.titleRow}>
              <Text style={styles.title}>{title}</Text>
              <Pressable onPress={onClose} accessibilityRole="button" accessibilityLabel="Close" hitSlop={8}>
                <Icon name="x" size={20} color={colors.textMuted} />
              </Pressable>
            </View>
          ) : null}
          <ScrollView
            contentContainerStyle={[styles.body, { paddingBottom: space[5] + insets.bottom }]}
            showsVerticalScrollIndicator={false}
          >
            {children}
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, justifyContent: 'flex-end' },
  scrim: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(33,37,41,0.36)' },
  panel: {
    backgroundColor: colors.bg,
    maxHeight: '88%',
    borderTopLeftRadius: radii['2xl'],
    borderTopRightRadius: radii['2xl'],
    overflow: 'hidden',
  },
  grab: {
    width: 38,
    height: 5,
    borderRadius: 99,
    backgroundColor: scale.charcoal[200],
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 4,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: space[5],
    paddingTop: 6,
    paddingBottom: 4,
  },
  title: { ...type.title22 },
  body: { paddingHorizontal: space[4], paddingTop: space[3], gap: space[3] },
});

export default Sheet;
