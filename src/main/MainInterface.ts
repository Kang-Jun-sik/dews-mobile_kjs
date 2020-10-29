export interface MainInterface {
  onPageLoaded;
  onPageLoading;
  onHistoryBack;
  dispatchEvent(event: Event): boolean;
  start();
  loadPage(modules: string, menuId: string, options?: object);
}
