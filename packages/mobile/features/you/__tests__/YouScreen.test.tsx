import { render, fireEvent, screen } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { YouScreen } from '../YouScreen';
import { useEventsStore } from '@/lib/stores/events';
import { EVENTS } from '@/lib/data/events';

const mockPush = jest.fn();
jest.mock('expo-router', () => ({
  useRouter: () => ({ push: mockPush, back: jest.fn() }),
}));

const insets = { top: 0, bottom: 0, left: 0, right: 0 };
const frame = { x: 0, y: 0, width: 390, height: 844 };

function renderScreen() {
  return render(
    <SafeAreaProvider initialMetrics={{ insets, frame }}>
      <YouScreen />
    </SafeAreaProvider>
  );
}

describe('YouScreen', () => {
  beforeEach(() => {
    mockPush.mockClear();
    useEventsStore.setState({ events: EVENTS.map((e) => ({ ...e })) });
  });

  it('renders without throwing and shows the section headers', async () => {
    await renderScreen();
    expect(screen.getByText('STIPEND TRACKER')).toBeTruthy();
    expect(screen.getByText('PERKS & BENEFITS')).toBeTruthy();
    expect(screen.getByText('MY EVENTS')).toBeTruthy();
  });

  it('renders a stipend card per stipend with remaining balance', async () => {
    await renderScreen();
    expect(screen.getByText('Learning')).toBeTruthy();
    expect(screen.getByText('Wellness')).toBeTruthy();
    expect(screen.getByText('Home office')).toBeTruthy();
  });

  it('shows the low-balance use-it-or-lose-it note on the low stipend only', async () => {
    await renderScreen();
    // Wellness: remaining 90 <= 600*0.2=120 -> low
    expect(screen.getByText(/use it or lose it/)).toBeTruthy();
  });

  it('shows the PTO snapshot with remaining days', async () => {
    await renderScreen();
    expect(screen.getByText('14')).toBeTruthy();
    expect(screen.getByText('Request time off')).toBeTruthy();
  });

  it('navigates to the stipend detail route when a stipend card is tapped', async () => {
    await renderScreen();
    fireEvent.press(screen.getByText('Learning'));
    expect(mockPush).toHaveBeenCalledWith('/stipend/st1');
  });

  it('shows the empty My-events state when nothing is RSVP’d going', async () => {
    useEventsStore.setState({
      events: EVENTS.map((e) => ({ ...e, rsvp: null })),
    });
    await renderScreen();
    expect(screen.getByText(/No RSVPs yet/)).toBeTruthy();
  });

  it('lists RSVP’d events in My events when present', async () => {
    const going = EVENTS.find((e) => e.rsvp === 'going')!;
    await renderScreen();
    expect(screen.getByText(going.title)).toBeTruthy();
  });
});
