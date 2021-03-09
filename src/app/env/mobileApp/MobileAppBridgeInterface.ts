export interface MobileAppBridgeInterface {
  func_goHome?: () => void;
  func_showSlideMenu?: () => void;
  func_hideSlideMenu?: () => void;
  func_setNaviBarColor?: (color: string) => void;
  func_getHeaderAccessToken?: () => string;
  func_getHeaderDetailToken?: () => string;
  func_getUserInfo?: () => string;
  // eslint-disable-next-line @typescript-eslint/camelcase
  dz_getHeaderAccessToken(token: string): void;
  // eslint-disable-next-line @typescript-eslint/camelcase
  dz_getHeaderDetailToken(token: string): void;
}
