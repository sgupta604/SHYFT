import { fireEvent, render, screen } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MoreScreen } from '../MoreScreen';
import { useOnboardingStore } from '@/lib/stores/onboarding';
import { ONBOARDING } from '@/lib/data/onboarding';
import { usePluginsStore } from '@/lib/stores/plugins';
import { PLUGINS } from '@/lib/data/plugins';

const mockPush = jest.fn();
jest.mock('expo-router', () => ({
  useRouter: () => ({ push: mockPush, back: jest.fn() }),
}));

const reset = () => {
  useOnboardingStore.setState({ checklist: ONBOARDING.checklist.map((c) => ({ ...c })) });
  usePluginsStore.setState({
    installed: PLUGINS.filter((p) => p.installed).map((p) => p.id),
    developer: true,
    showWidgets: true,
  });
};

const renderScreen = () =>
  render(
    <SafeAreaProvider
      initialMetrics={{
        frame: { x: 0, y: 0, width: 390, height: 844 },
        insets: { top: 0, left: 0, right: 0, bottom: 0 },
      }}
    >
      <MoreScreen />
    </SafeAreaProvider>
  );

describe('MoreScreen', () => {
  beforeEach(() => {
    mockPush.mockClear();
    reset();
  });

  it('renders without throwing and shows the section headers', async () => {
    await renderScreen();
    expect(screen.getByText('Your first day')).toBeTruthy();
    expect(screen.getByText('SLACK CHANNELS')).toBeTruthy();
    expect(screen.getByText('FOR SALE')).toBeTruthy();
  });

  it('shows the Slack discovery subtitle and channel rows', async () => {
    await renderScreen();
    expect(screen.getByText(/Find your people/)).toBeTruthy();
    expect(screen.getByText('#lunch-crew')).toBeTruthy();
    expect(screen.getByText('#trail-runners')).toBeTruthy();
  });

  it('lists for-sale items with mono prices', async () => {
    await renderScreen();
    expect(screen.getByText('LG 27" 4K monitor')).toBeTruthy();
    expect(screen.getByText('$180')).toBeTruthy();
  });

  it('shows the shortcut rows', async () => {
    await renderScreen();
    expect(screen.getByText('Swag store')).toBeTruthy();
    expect(screen.getByText('Notification settings')).toBeTruthy();
    expect(screen.getByText('Help & FAQ')).toBeTruthy();
  });

  it('derives the onboarding step count from the store', async () => {
    await renderScreen();
    // seed has 2 done of 5
    expect(screen.getByText(/2 of 5 onboarding steps done/)).toBeTruthy();
  });

  it('reflects store changes in the hero footer count', async () => {
    useOnboardingStore.getState().toggle('o3'); // 3rd item -> done, now 3
    await renderScreen();
    expect(screen.getByText(/3 of 5 onboarding steps done/)).toBeTruthy();
  });

  it('pushes /onboarding when the Your-first-day card is tapped', async () => {
    await renderScreen();
    await fireEvent.press(screen.getByText('Your first day'));
    expect(mockPush).toHaveBeenCalledWith('/onboarding');
  });

  it('shows the Apps row with a live installed count and pushes /apps', async () => {
    await renderScreen();
    expect(screen.getByText('APPS & EXTENSIONS')).toBeTruthy();
    expect(screen.getByText('Apps')).toBeTruthy();
    // 4 plugins seed installed:true
    expect(screen.getByText('4 installed')).toBeTruthy();
    await fireEvent.press(screen.getByText('Apps'));
    expect(mockPush).toHaveBeenCalledWith('/apps');
  });

  it('updates the Apps installed count live from the store', async () => {
    usePluginsStore.getState().toggleInstall('pl-shuttle'); // remove one -> 3
    await renderScreen();
    expect(screen.getByText('3 installed')).toBeTruthy();
  });

  it('hides the Developer row when the developer flag is off', async () => {
    usePluginsStore.setState({ developer: false });
    await renderScreen();
    expect(screen.queryByText('Developer')).toBeNull();
  });

  it('shows the Developer row and pushes /developer when developer is on', async () => {
    usePluginsStore.setState({ developer: true });
    await renderScreen();
    expect(screen.getByText('Developer')).toBeTruthy();
    await fireEvent.press(screen.getByText('Developer'));
    expect(mockPush).toHaveBeenCalledWith('/developer');
  });

  it('toggles the developer flag via the Developer-mode switch', async () => {
    usePluginsStore.setState({ developer: true });
    await renderScreen();
    const sw = screen.getByTestId('developer-mode-switch');
    await fireEvent(sw, 'valueChange', false);
    expect(usePluginsStore.getState().developer).toBe(false);
  });
});
