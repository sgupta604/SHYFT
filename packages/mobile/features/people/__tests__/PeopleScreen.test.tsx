import { fireEvent, render, screen } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PeopleScreen } from '../PeopleScreen';
import { PEOPLE } from '@/lib/data/people';

const mockPush = jest.fn();
jest.mock('expo-router', () => ({
  router: { push: (...args: unknown[]) => mockPush(...args) },
}));

// RNTL 14 here ships an async render/fireEvent; await both.
const renderScreen = () =>
  render(
    <SafeAreaProvider
      initialMetrics={{
        frame: { x: 0, y: 0, width: 390, height: 844 },
        insets: { top: 0, left: 0, right: 0, bottom: 0 },
      }}
    >
      <PeopleScreen />
    </SafeAreaProvider>
  );

describe('PeopleScreen', () => {
  beforeEach(() => mockPush.mockClear());

  it('renders the directory with every teammate', async () => {
    await renderScreen();
    expect(screen.getByText(`${PEOPLE.length} TEAMMATES`)).toBeTruthy();
    expect(screen.getByText('Maya Patel')).toBeTruthy();
    expect(screen.getByText('Riley Park')).toBeTruthy();
  });

  it('filters the directory live as you type in the search field', async () => {
    await renderScreen();
    const input = screen.getByPlaceholderText('Search people, teams…');
    await fireEvent.changeText(input, 'maya');
    expect(screen.getByText('Maya Patel')).toBeTruthy();
    expect(screen.queryByText('Riley Park')).toBeNull();
    expect(screen.getByText('1 TEAMMATE')).toBeTruthy();
  });

  it('matches on team as well as name', async () => {
    await renderScreen();
    const input = screen.getByPlaceholderText('Search people, teams…');
    await fireEvent.changeText(input, 'platform');
    expect(screen.getByText('Maya Patel')).toBeTruthy();
    expect(screen.getByText('Marcus Bell')).toBeTruthy();
    expect(screen.queryByText('Sam Okafor')).toBeNull();
  });

  it('shows a no-results state when nothing matches', async () => {
    await renderScreen();
    const input = screen.getByPlaceholderText('Search people, teams…');
    await fireEvent.changeText(input, 'zzzzz');
    expect(screen.getByText('No teammates found')).toBeTruthy();
  });

  it('routes to the person profile when a teammate row is tapped', async () => {
    await renderScreen();
    await fireEvent.press(screen.getByText('Maya Patel'));
    expect(mockPush).toHaveBeenCalledWith('/person/u1');
  });

  it('shows the who-out section with the Workday note', async () => {
    await renderScreen();
    await fireEvent.press(screen.getByText('Out'));
    expect(screen.getByText('OUT TODAY')).toBeTruthy();
    expect(screen.getByText(/Request time off in Workday/)).toBeTruthy();
  });

  it('shows company holidays', async () => {
    await renderScreen();
    await fireEvent.press(screen.getByText('Holidays'));
    expect(screen.getByText('COMPANY HOLIDAYS')).toBeTruthy();
    expect(screen.getByText('Memorial Day')).toBeTruthy();
    expect(screen.getAllByText('Office closed').length).toBeGreaterThan(0);
  });
});
