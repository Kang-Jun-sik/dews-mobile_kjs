export interface MainInterface {
  onPageLoaded;
  onPageLoading;
  onFocusChanging;
  onFocusChanged;
  start(): Promise<void>;
  onHistoryBack;
  loadPage(modules: string, menuId: string, options?: object);
}
