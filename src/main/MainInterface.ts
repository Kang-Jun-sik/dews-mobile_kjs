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
  loadPage(pageId: string, options?: object);
}
