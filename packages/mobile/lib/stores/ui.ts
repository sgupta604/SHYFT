/**
 * UI store — chrome-level transient UI state that lives above any single tab.
 * Today this is only the notifications sheet: the AppHeader bell (rendered per
 * tab) opens it, and the (tabs) layout renders one NotificationsSheet driven by
 * this flag, so the same sheet works from every tab. Kept out of feature stores
 * on purpose — it is app shell state, not domain state.
 */
import { create } from 'zustand';

interface UiState {
  notificationsOpen: boolean;
  openNotifications: () => void;
  closeNotifications: () => void;
}

export const useUiStore = create<UiState>((set) => ({
  notificationsOpen: false,
  openNotifications: () => set({ notificationsOpen: true }),
  closeNotifications: () => set({ notificationsOpen: false }),
}));
