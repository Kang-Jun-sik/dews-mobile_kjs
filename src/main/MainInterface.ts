export interface MainInterface {
  onPageLoaded;
  onPageLoading;
  start();
  loadPage(modules: string, menuId: string, options?: object);
}
