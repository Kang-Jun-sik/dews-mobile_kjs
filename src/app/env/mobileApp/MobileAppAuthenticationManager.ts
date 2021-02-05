import { singleton } from '@dews/dews-mobile-core';
import { AuthenticationManagerInterface } from '../../auth/AuthenticationManagerInterface.js';

const AUTH_TOKEN_KEY = 'erp10:mobile:auth:token';
const AUTH_TOKEN_DETAIL_KEY = 'erp10:mobile:auth:token:detail';

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
    // nativeApp에서 토큰을 받아오는 API호출
    this._accessToken = window.DzMobileBridge.func_getHeaderAccessToken!();
    this._detailToken = window.DzMobileBridge.func_getHeaderDetailToken!();

    // 세션에 불러온 토큰값 저장
    sessionStorage.setItem(AUTH_TOKEN_KEY, this._accessToken);
    sessionStorage.setItem(AUTH_TOKEN_DETAIL_KEY, this._detailToken);

    // 토큰이 있으면 인증완료
    this._isAuthenticated = true;

    alert(this._accessToken);

    return Promise.resolve();
  }
}
