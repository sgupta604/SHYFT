import { fireEvent, render, screen } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { OnboardingScreen } from '../OnboardingScreen';
import { useOnboardingStore } from '@/lib/stores/onboarding';
import { ONBOARDING } from '@/lib/data/onboarding';

const mockBack = jest.fn();
jest.mock('expo-router', () => ({
  useRouter: () => ({ push: jest.fn(), back: mockBack }),
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
      <OnboardingScreen />
    </SafeAreaProvider>
  );

describe('OnboardingScreen', () => {
  beforeEach(() => {
    mockBack.mockClear();
    reset();
  });

  it('renders without throwing and shows the countdown hero + sections', async () => {
    await renderScreen();
    expect(screen.getByText('Welcome to Shyft')).toBeTruthy();
    expect(screen.getByText('6')).toBeTruthy();
    expect(screen.getByText('BEFORE YOU START')).toBeTruthy();
    expect(screen.getByText("WHO YOU'LL MEET")).toBeTruthy();
    expect(screen.getByText('DAY-ONE DETAILS')).toBeTruthy();
  });

  it('shows the live done counter from the store (2/5 seeded)', async () => {
    await renderScreen();
    expect(screen.getByText('2/5 done')).toBeTruthy();
  });

  it('lists the checklist items and who-you-will-meet rows', async () => {
    await renderScreen();
    expect(screen.getByText('Pick your laptop & gear')).toBeTruthy();
    expect(screen.getByText('Priya Anand')).toBeTruthy();
  });

  it('toggling a checklist item flips it in the store and updates the counter', async () => {
    await renderScreen();
    await fireEvent.press(screen.getByText('Pick your laptop & gear'));

    const item = useOnboardingStore.getState().checklist.find((c) => c.id === 'o3')!;
    expect(item.done).toBe(true);
    expect(screen.getByText('3/5 done')).toBeTruthy();
  });

  it('un-toggling an already-done item decrements the counter', async () => {
    await renderScreen();
    await fireEvent.press(screen.getByText('Sign your offer letter')); // o1 seeded done
    const item = useOnboardingStore.getState().checklist.find((c) => c.id === 'o1')!;
    expect(item.done).toBe(false);
    expect(screen.getByText('1/5 done')).toBeTruthy();
  });

  it('calls router.back from the header back button', async () => {
    await renderScreen();
    await fireEvent.press(screen.getByLabelText('Back'));
    expect(mockBack).toHaveBeenCalled();
  });
});
