export interface MainEnvironment {
  initMenu?: PagePath;

  locale?: string;
}

export interface PagePath {
  modules: string;
  pageId: string;
  option?: object;
}
