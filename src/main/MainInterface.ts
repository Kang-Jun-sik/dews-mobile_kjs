export interface MainInterface {
  onPageLoaded;
  onPageLoading;
  onFocusChanging;
  onFocusChanged;
  start(): Promise<void>;
  onHistoryBack;
  onPageUpdateComplete;
  onMainLoadComplete;
  loadPage(modules: string, menuId: string, options?: object);
}
