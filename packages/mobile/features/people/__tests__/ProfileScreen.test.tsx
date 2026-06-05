import { render, screen } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ProfileScreen } from '../ProfileScreen';

jest.mock('expo-router', () => ({
  router: { back: jest.fn() },
}));

const renderProfile = (id: string) =>
  render(
    <SafeAreaProvider
      initialMetrics={{
        frame: { x: 0, y: 0, width: 390, height: 844 },
        insets: { top: 0, left: 0, right: 0, bottom: 0 },
      }}
    >
      <ProfileScreen id={id} />
    </SafeAreaProvider>
  );

describe('ProfileScreen', () => {
  it('renders identity, location and action buttons', async () => {
    await renderProfile('u1');
    expect(screen.getByText('Maya Patel')).toBeTruthy();
    expect(screen.getByText('Staff Engineer · Platform')).toBeTruthy();
    expect(screen.getByText('Omaha HQ · Hybrid')).toBeTruthy();
    expect(screen.getByText('Message')).toBeTruthy();
    expect(screen.getByText('Give kudos')).toBeTruthy();
  });

  it('renders the kudos-received cards with value tags', async () => {
    await renderProfile('u1');
    expect(screen.getByText('KUDOS RECEIVED')).toBeTruthy();
    // u1 has two kudos: Customer obsession + Craft
    expect(screen.getByText('Customer obsession')).toBeTruthy();
    expect(screen.getByText('Craft')).toBeTruthy();
  });

  it('shows the empty state for a teammate with no kudos', async () => {
    await renderProfile('u6'); // Riley Park, kudos: []
    expect(screen.getByText('Riley Park')).toBeTruthy();
    expect(screen.getByText(/No kudos yet/)).toBeTruthy();
  });

  it('renders nothing-crashing fallback for an unknown id', async () => {
    await renderProfile('nope');
    expect(screen.getByText(/couldn’t find/i)).toBeTruthy();
  });
});
