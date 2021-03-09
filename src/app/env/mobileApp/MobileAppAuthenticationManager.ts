import { singleton } from '@dews/dews-mobile-core';
import { AuthenticationManagerInterface } from '../../auth/AuthenticationManagerInterface.js';
import { AuthenticateService } from '../../common/AuthenticateService.js';

@singleton()
export class MobileAppAuthenticationManager implements AuthenticationManagerInterface {
  private _isAuthenticated = false;
  private _accessToken: string | undefined;
  private _detailToken: string | undefined;

  get isAuthenticated(): boolean {
    return this._isAuthenticated;
  }
  get token(): string | undefined {
    return this._accessToken;
  }

  get detailToken(): string | undefined {
    return this._detailToken;
  }

  async authenticate(): Promise<void> {
    // func_getHeaderAccessToken함수를 호출하면, 네이티브에서 dz_getHeaderAccessToken함수 호출로 token 전달
    // eslint-disable-next-line @typescript-eslint/camelcase
    window.DzMobileBridge.dz_getHeaderAccessToken = (token: string) => {
      this._accessToken = token;
    };

    // func_getHeaderDetailToken 호출하면, 네이티브에서 dz_getHeaderDetailToken 호출로 token 전달
    // eslint-disable-next-line @typescript-eslint/camelcase
    window.DzMobileBridge.dz_getHeaderDetailToken = (token: string) => {
      this._detailToken = token;
    };
    // nativeApp에서 토큰을 받아오는 API호출
    window.DzMobileBridge.func_getHeaderAccessToken!();
    window.DzMobileBridge.func_getHeaderDetailToken!();

    // 세션에 불러온 토큰값 저장
    AuthenticateService.setAuthorizedToken(this._accessToken);
    AuthenticateService.setAuthorizedDetailToken(this._detailToken);

    // 토큰이 있으면 인증완료
    // this._isAuthenticated = !!this._accessToken;
    this._isAuthenticated = true;

    alert(this._accessToken);

    return Promise.resolve();
  }
}
