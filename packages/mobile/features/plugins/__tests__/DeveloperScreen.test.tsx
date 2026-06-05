import { render, screen } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DeveloperScreen } from '../DeveloperScreen';
import { DEV_PLUGINS } from '@/lib/data/plugins';

const mockBack = jest.fn();
jest.mock('expo-router', () => ({
  useRouter: () => ({ back: mockBack, push: jest.fn() }),
}));

const insets = { top: 0, bottom: 0, left: 0, right: 0 };
const frame = { x: 0, y: 0, width: 390, height: 844 };

function renderScreen() {
  return render(
    <SafeAreaProvider initialMetrics={{ insets, frame }}>
      <DeveloperScreen />
    </SafeAreaProvider>
  );
}

describe('DeveloperScreen', () => {
  beforeEach(() => {
    mockBack.mockClear();
  });

  it('renders the console header', async () => {
    await renderScreen();
    expect(screen.getByText('Developer')).toBeTruthy();
  });

  it('shows total-installs metric as the sum of Published dev plugins', async () => {
    await renderScreen();
    const published = DEV_PLUGINS.filter((d) => d.status === 'Published');
    const total = published.reduce((s, d) => s + d.installs, 0);
    expect(screen.getByText(total.toLocaleString())).toBeTruthy();
    // live count = number of published plugins
    expect(screen.getByText(String(published.length))).toBeTruthy();
  });

  it('renders the New plugin CTA and resources rows', async () => {
    await renderScreen();
    expect(screen.getByText('New plugin')).toBeTruthy();
    expect(screen.getByText('Plugin SDK docs')).toBeTruthy();
    expect(screen.getByText('Sample plugins')).toBeTruthy();
    expect(screen.getByText('#plugin-developers')).toBeTruthy();
  });

  it('renders one row per dev plugin with its status pill', async () => {
    await renderScreen();
    for (const d of DEV_PLUGINS) {
      expect(screen.getByText(d.name)).toBeTruthy();
      expect(screen.getByText(d.version)).toBeTruthy();
    }
    expect(screen.getByText('Published')).toBeTruthy();
    expect(screen.getByText('In review')).toBeTruthy();
    expect(screen.getByText('Draft')).toBeTruthy();
  });
});
