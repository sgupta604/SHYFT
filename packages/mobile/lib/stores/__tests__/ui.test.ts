import { useUiStore } from '../ui';

const reset = () => useUiStore.setState({ notificationsOpen: false });

describe('useUiStore (chrome notifications)', () => {
  beforeEach(reset);

  it('starts closed', () => {
    expect(useUiStore.getState().notificationsOpen).toBe(false);
  });

  it('openNotifications flips the flag on, closeNotifications flips it off', () => {
    useUiStore.getState().openNotifications();
    expect(useUiStore.getState().notificationsOpen).toBe(true);
    useUiStore.getState().closeNotifications();
    expect(useUiStore.getState().notificationsOpen).toBe(false);
  });
});
