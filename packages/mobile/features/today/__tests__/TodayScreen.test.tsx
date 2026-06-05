import { act, fireEvent, render, screen } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TodayScreen } from '../TodayScreen';
import { useEventsStore } from '@/lib/stores/events';
import { useKudosStore } from '@/lib/stores/kudos';
import { usePluginsStore } from '@/lib/stores/plugins';
import { EVENTS } from '@/lib/data/events';
import { KUDOS } from '@/lib/data/kudos';
import { PLUGINS } from '@/lib/data/plugins';

const mockPush = jest.fn();
jest.mock('expo-router', () => ({
  router: { push: (...args: unknown[]) => mockPush(...args) },
  useRouter: () => ({ push: (...args: unknown[]) => mockPush(...args), back: jest.fn() }),
}));

const reset = () => {
  useEventsStore.setState({ events: EVENTS.map((e) => ({ ...e })) });
  useKudosStore.setState({ kudos: KUDOS.map((k) => ({ ...k })) });
  usePluginsStore.setState({
    installed: PLUGINS.filter((p) => p.installed).map((p) => p.id),
    showWidgets: true,
  });
  mockPush.mockClear();
};

// RNTL 14 ships an async render/fireEvent — await both.
const renderScreen = () =>
  render(
    <SafeAreaProvider
      initialMetrics={{
        frame: { x: 0, y: 0, width: 390, height: 844 },
        insets: { top: 0, left: 0, right: 0, bottom: 0 },
      }}
    >
      <TodayScreen />
    </SafeAreaProvider>
  );

describe('TodayScreen', () => {
  beforeEach(reset);

  it('renders the office-status banner, weather, and announcements', async () => {
    await renderScreen();
    expect(screen.getByText('Omaha HQ is open')).toBeTruthy();
    // 78° appears as the hero temp and the "Now" hourly cell.
    expect(screen.getAllByText('78°').length).toBeGreaterThan(0);
    expect(screen.getByText('VPN maintenance window — Thu 8–10pm')).toBeTruthy();
  });

  it('renders the who\'s-out rows and the next event from the store', async () => {
    await renderScreen();
    expect(screen.getAllByText('Maya Patel').length).toBeGreaterThan(0);
    // nextEvent = events[0] = e1
    expect(screen.getByText(/Shipping with feature flags/)).toBeTruthy();
  });

  it('opens the announcement sheet when an announcement card is tapped', async () => {
    await renderScreen();
    // The Q3 card's inline CTA already renders one "Open Stipend Tracker".
    expect(screen.getAllByText('Open Stipend Tracker')).toHaveLength(1);
    await fireEvent.press(screen.getByText('Q3 stipend reset is April 1'));
    // Sheet now renders a second instance of the CTA.
    expect(screen.getAllByText('Open Stipend Tracker')).toHaveLength(2);
  });

  it('deep-links the Q3 stipend CTA to the You tab by route path', async () => {
    await renderScreen();
    await fireEvent.press(screen.getByText('Q3 stipend reset is April 1'));
    const ctas = screen.getAllByText('Open Stipend Tracker');
    await fireEvent.press(ctas[ctas.length - 1]);
    expect(mockPush).toHaveBeenCalledWith('/(tabs)/you');
  });

  it('cheers the latest kudos and increments the count via the store', async () => {
    await renderScreen();
    // k1 seeds cheers: 16, cheered: false
    expect(screen.getByText('16')).toBeTruthy();
    await fireEvent.press(screen.getByText('16'));

    const k1 = useKudosStore.getState().kudos.find((k) => k.id === 'k1')!;
    expect(k1.cheered).toBe(true);
    expect(k1.cheers).toBe(17);
    expect(screen.getByText('17')).toBeTruthy();
  });

  it('renders the installed today-slot plugin widget, and removes it on uninstall', async () => {
    await renderScreen();
    // Shuttle Tracker is a default-installed today-slot plugin.
    expect(screen.getByText('Shuttle Tracker')).toBeTruthy();
    expect(screen.getByText('YOUR APPS')).toBeTruthy();

    // Uninstall both today plugins -> the slot disappears.
    await act(async () => {
      usePluginsStore.setState({ installed: ['pl-401k', 'pl-volunteer'] });
    });
    expect(screen.queryByText('Shuttle Tracker')).toBeNull();
    expect(screen.queryByText('YOUR APPS')).toBeNull();
  });

  it('opens the all-kudos sheet from "See all"', async () => {
    await renderScreen();
    const seeAll = screen.getAllByText('See all');
    await fireEvent.press(seeAll[seeAll.length - 1]);
    // The sheet shows kudos beyond the first card (k2 -> Marcus Bell gave kudos)
    expect(screen.getByText('Ownership')).toBeTruthy();
  });
});
