import { render, fireEvent, screen, act, waitFor } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppsScreen } from '../AppsScreen';
import { usePluginsStore } from '@/lib/stores/plugins';
import { PLUGINS } from '@/lib/data/plugins';

const mockBack = jest.fn();
const mockPush = jest.fn();
jest.mock('expo-router', () => ({
  useRouter: () => ({ push: mockPush, back: mockBack }),
}));

const insets = { top: 0, bottom: 0, left: 0, right: 0 };
const frame = { x: 0, y: 0, width: 390, height: 844 };

function renderScreen() {
  return render(
    <SafeAreaProvider initialMetrics={{ insets, frame }}>
      <AppsScreen />
    </SafeAreaProvider>
  );
}

describe('AppsScreen', () => {
  beforeEach(() => {
    mockBack.mockClear();
    mockPush.mockClear();
    usePluginsStore.setState({
      plugins: PLUGINS.map((p) => ({ ...p })),
      installed: PLUGINS.filter((p) => p.installed).map((p) => p.id),
      developer: true,
      showWidgets: true,
    });
  });

  it('renders the directory with the title and installed counter', async () => {
    await renderScreen();
    expect(screen.getByText('Apps')).toBeTruthy();
    expect(screen.getByText('4 installed')).toBeTruthy();
  });

  it('lists every plugin under the All category', async () => {
    await renderScreen();
    expect(screen.getByText('Shuttle Tracker')).toBeTruthy();
    expect(screen.getByText('Parking Reservations')).toBeTruthy();
    expect(screen.getByText('Commute Carbon')).toBeTruthy();
  });

  it('filters the list when a category chip is selected', async () => {
    await renderScreen();
    await act(async () => {
      fireEvent.press(screen.getByText('Finance'));
    });
    expect(screen.getByText('401(k) Snapshot')).toBeTruthy();
    expect(screen.queryByText('Shuttle Tracker')).toBeNull();
  });

  it('toggles install via the store when Add is pressed (label flips)', async () => {
    await renderScreen();
    // Wellness has a single uninstalled plugin (Gym Class Booking) -> one "Add"
    await act(async () => {
      fireEvent.press(screen.getByText('Wellness'));
    });
    expect(screen.getByText('Add')).toBeTruthy();
    await act(async () => {
      fireEvent.press(screen.getByText('Add'));
    });
    await waitFor(() => {
      expect(usePluginsStore.getState().installed).toContain('pl-gym');
      expect(screen.getByText('Added')).toBeTruthy();
    });
  });

  it('opens the plugin sheet when a row is tapped', async () => {
    await renderScreen();
    await act(async () => {
      fireEvent.press(screen.getByText('Parking Reservations'));
    });
    await waitFor(() => {
      expect(screen.getByText('App details')).toBeTruthy();
      expect(screen.getByText('Add to my Commons')).toBeTruthy();
    });
  });
});
