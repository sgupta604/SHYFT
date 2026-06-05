import {
  usePluginsStore,
  selectInstalledCount,
  selectSlot,
} from '@/lib/stores/plugins';
import { PLUGINS } from '@/lib/data/plugins';

const seededInstalled = PLUGINS.filter((p) => p.installed).map((p) => p.id);

const reset = () =>
  usePluginsStore.setState({
    plugins: PLUGINS.map((p) => ({ ...p })),
    installed: seededInstalled.slice(),
    developer: true,
    showWidgets: true,
  });

describe('plugins store', () => {
  beforeEach(reset);

  it('seeds installed[] from PLUGINS installed:true (4 ids)', () => {
    const { installed } = usePluginsStore.getState();
    expect(installed).toHaveLength(4);
    expect(installed.sort()).toEqual(seededInstalled.slice().sort());
  });

  it('defaults developer and showWidgets to true', () => {
    expect(usePluginsStore.getState().developer).toBe(true);
    expect(usePluginsStore.getState().showWidgets).toBe(true);
  });

  it('toggleInstall removes a present id', () => {
    usePluginsStore.getState().toggleInstall('pl-shuttle');
    expect(usePluginsStore.getState().installed).not.toContain('pl-shuttle');
  });

  it('toggleInstall adds an absent id', () => {
    usePluginsStore.getState().toggleInstall('pl-parking');
    expect(usePluginsStore.getState().installed).toContain('pl-parking');
  });

  it('round-trip toggle restores membership', () => {
    usePluginsStore.getState().toggleInstall('pl-shuttle');
    usePluginsStore.getState().toggleInstall('pl-shuttle');
    expect(usePluginsStore.getState().installed).toContain('pl-shuttle');
    expect(usePluginsStore.getState().installed).toHaveLength(4);
  });

  it('setDeveloper flips the gate', () => {
    usePluginsStore.getState().setDeveloper(false);
    expect(usePluginsStore.getState().developer).toBe(false);
  });

  it('setShowWidgets flips the flag', () => {
    usePluginsStore.getState().setShowWidgets(false);
    expect(usePluginsStore.getState().showWidgets).toBe(false);
  });
});

describe('plugins selectors', () => {
  beforeEach(reset);

  it('selectInstalledCount reflects the live list', () => {
    expect(selectInstalledCount(usePluginsStore.getState())).toBe(4);
    usePluginsStore.getState().toggleInstall('pl-shuttle');
    expect(selectInstalledCount(usePluginsStore.getState())).toBe(3);
  });

  it('selectSlot returns only installed plugins for that slot', () => {
    const today = selectSlot('today')(usePluginsStore.getState());
    expect(today.map((p) => p.id).sort()).toEqual(['pl-lunch', 'pl-shuttle']);
    const you = selectSlot('you')(usePluginsStore.getState());
    expect(you.map((p) => p.id).sort()).toEqual(['pl-401k', 'pl-volunteer']);
  });

  it('selectSlot drives off live installed[], not the static flag', () => {
    usePluginsStore.getState().toggleInstall('pl-shuttle');
    const today = selectSlot('today')(usePluginsStore.getState());
    expect(today.map((p) => p.id)).toEqual(['pl-lunch']);

    usePluginsStore.getState().toggleInstall('pl-room'); // installed:false in data
    const today2 = selectSlot('today')(usePluginsStore.getState());
    expect(today2.map((p) => p.id).sort()).toEqual(['pl-lunch', 'pl-room']);
  });
});
