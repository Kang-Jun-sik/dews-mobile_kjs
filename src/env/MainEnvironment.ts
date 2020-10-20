export interface MainEnvironment {
  initMenu?: PagePath;

  locale?: string;
}

export interface PagePath {
  modules: string;
  menuId: string;
  option?: object;
}
