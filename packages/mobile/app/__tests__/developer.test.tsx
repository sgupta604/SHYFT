/**
 * Route gate for /developer — verifies the `developer` store flag controls
 * whether the console renders or a Redirect to More is returned. Tested at the
 * route-component level (RNTL v14 async render; no full router boot).
 */
import { render, screen } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import DeveloperRoute from '../developer';
import { usePluginsStore } from '@/lib/stores/plugins';

const mockRedirect = jest.fn();
jest.mock('expo-router', () => ({
  useRouter: () => ({ back: jest.fn(), push: jest.fn() }),
  Redirect: ({ href }: { href: string }) => {
    mockRedirect(href);
    return null;
  },
}));

const insets = { top: 0, bottom: 0, left: 0, right: 0 };
const frame = { x: 0, y: 0, width: 390, height: 844 };

function renderRoute() {
  return render(
    <SafeAreaProvider initialMetrics={{ insets, frame }}>
      <DeveloperRoute />
    </SafeAreaProvider>
  );
}

describe('developer route gate', () => {
  beforeEach(() => {
    mockRedirect.mockClear();
  });

  afterAll(() => {
    usePluginsStore.setState({ developer: true });
  });

  it('renders the console when developer is true', async () => {
    usePluginsStore.setState({ developer: true });
    await renderRoute();
    expect(screen.getByText('Developer')).toBeTruthy();
    expect(mockRedirect).not.toHaveBeenCalled();
  });

  it('redirects to More when developer is false', async () => {
    usePluginsStore.setState({ developer: false });
    await renderRoute();
    expect(mockRedirect).toHaveBeenCalledWith('/(tabs)/more');
    expect(screen.queryByText('Developer')).toBeNull();
  });
});
