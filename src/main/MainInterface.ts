export interface MainInterface {
  onPageLoaded;
  onPageLoading;
  onFocusChanging;
  onFocusChanged;
  onHistoryBack;
  onPageUpdateComplete;
  onMainLoadComplete;
  onAreaChanged;
  start(): Promise<void>;
  loadPage(modules: string, menuId: string, options?: object);
}
