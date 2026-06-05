/**
 * AppHeader chrome wiring — mirrors the (tabs) layout: the header bell opens a
 * single NotificationsSheet via the chrome-level UI store, and the sheet's X
 * closes it. This is the load-bearing Stream 8 behavior ("bell opens
 * notifications sheet"), exercised without booting the expo-router Tabs tree.
 */
import { fireEvent, render, screen } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppHeader } from '../AppHeader';
import { NotificationsSheet } from '../NotificationsSheet';
import { useUiStore } from '@/lib/stores/ui';

/** The exact bell -> store -> sheet wiring the (tabs) layout uses. */
function Chrome() {
  const open = useUiStore((s) => s.openNotifications);
  const close = useUiStore((s) => s.closeNotifications);
  const isOpen = useUiStore((s) => s.notificationsOpen);
  return (
    <>
      <AppHeader title="Good morning, Alex" subtitle="Tuesday · March 25" mark onBell={open} />
      {isOpen ? <NotificationsSheet onClose={close} /> : null}
    </>
  );
}

const renderChrome = () =>
  render(
    <SafeAreaProvider
      initialMetrics={{
        frame: { x: 0, y: 0, width: 390, height: 844 },
        insets: { top: 0, left: 0, right: 0, bottom: 0 },
      }}
    >
      <Chrome />
    </SafeAreaProvider>
  );

describe('AppHeader notifications wiring', () => {
  beforeEach(() => useUiStore.setState({ notificationsOpen: false }));

  it('renders the per-tab title and subtitle', async () => {
    await renderChrome();
    expect(screen.getByText('Good morning, Alex')).toBeTruthy();
    expect(screen.getByText('Tuesday · March 25')).toBeTruthy();
  });

  it('opens the notifications sheet when the bell is pressed', async () => {
    await renderChrome();
    expect(screen.queryByText('Notifications')).toBeNull();
    await fireEvent.press(screen.getByLabelText('Notifications'));
    expect(screen.getByText('Notifications')).toBeTruthy();
    expect(screen.getByText('Priya gave you kudos')).toBeTruthy();
  });

  it('closes the sheet from the X', async () => {
    await renderChrome();
    await fireEvent.press(screen.getByLabelText('Notifications'));
    const closeBtn = screen
      .getAllByLabelText('Close')
      .find((n) => n.props.accessibilityRole === 'button');
    await fireEvent.press(closeBtn!);
    expect(screen.queryByText('Notifications')).toBeNull();
  });
});
