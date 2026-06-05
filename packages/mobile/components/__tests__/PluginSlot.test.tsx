import { act, render, screen } from '@testing-library/react-native';
import { PluginSlot } from '../PluginSlot';
import { usePluginsStore } from '@/lib/stores/plugins';
import { PLUGINS } from '@/lib/data/plugins';

const mockPush = jest.fn();
jest.mock('expo-router', () => ({
  useRouter: () => ({ push: mockPush, back: jest.fn() }),
}));

const defaultInstalled = PLUGINS.filter((p) => p.installed).map((p) => p.id);

function resetStore(overrides: Partial<Parameters<typeof usePluginsStore.setState>[0]> = {}) {
  usePluginsStore.setState({
    plugins: PLUGINS.map((p) => ({ ...p })),
    installed: [...defaultInstalled],
    developer: true,
    showWidgets: true,
    ...overrides,
  });
}

describe('PluginSlot', () => {
  beforeEach(() => {
    mockPush.mockClear();
    resetStore();
  });

  it('renders the "Your apps" header and a widget per installed plugin in the slot', async () => {
    await render(<PluginSlot slot="today" />);
    expect(screen.getByText('YOUR APPS')).toBeTruthy();
    // The two default today plugins.
    expect(screen.getByText('Shuttle Tracker')).toBeTruthy();
    expect(screen.getByText('Lunch Today')).toBeTruthy();
    // A you plugin must NOT appear in the today slot.
    expect(screen.queryByText('401(k) Snapshot')).toBeNull();
  });

  it('renders only the plugins targeting the given slot', async () => {
    await render(<PluginSlot slot="you" />);
    expect(screen.getByText('401(k) Snapshot')).toBeTruthy();
    expect(screen.getByText('Volunteer Hours')).toBeTruthy();
    expect(screen.queryByText('Shuttle Tracker')).toBeNull();
  });

  it('renders nothing when no plugins are installed for the slot', async () => {
    resetStore({ installed: [] });
    const { toJSON } = await render(<PluginSlot slot="today" />);
    expect(toJSON()).toBeNull();
    expect(screen.queryByText('YOUR APPS')).toBeNull();
  });

  it('renders nothing when showWidgets is false even with installs', async () => {
    resetStore({ showWidgets: false });
    const { toJSON } = await render(<PluginSlot slot="today" />);
    expect(toJSON()).toBeNull();
  });

  it('reacts to toggleInstall — removing the last slot plugin makes it disappear', async () => {
    resetStore({ installed: ['pl-shuttle'] });
    const { toJSON } = await render(<PluginSlot slot="today" />);
    expect(screen.getByText('Shuttle Tracker')).toBeTruthy();
    await act(async () => usePluginsStore.getState().toggleInstall('pl-shuttle'));
    expect(toJSON()).toBeNull();
  });
});
