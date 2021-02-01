export interface MobileAppBridgeInterface {
  func_goHome?: () => void;
  func_showSlideMenu?: () => void;
  func_hideSlideMenu?: () => void;
  func_setNaviBarColor?: (color: string) => void;
  func_getHeaderAccessToken?: () => string;
  func_getHeaderDetailToken?: () => string;
  func_getUserInfo?: () => string;
}
