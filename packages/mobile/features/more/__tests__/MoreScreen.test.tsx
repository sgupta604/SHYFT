import { fireEvent, render, screen } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MoreScreen } from '../MoreScreen';
import { useOnboardingStore } from '@/lib/stores/onboarding';
import { ONBOARDING } from '@/lib/data/onboarding';

const mockPush = jest.fn();
jest.mock('expo-router', () => ({
  useRouter: () => ({ push: mockPush, back: jest.fn() }),
}));

const reset = () =>
  useOnboardingStore.setState({ checklist: ONBOARDING.checklist.map((c) => ({ ...c })) });

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
});
