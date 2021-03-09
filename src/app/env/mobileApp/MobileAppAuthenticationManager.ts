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
    return new Promise((resolve, reject) => {
      // func_getHeaderAccessToken함수를 호출하면, 네이티브에서 dz_getHeaderAccessToken함수 호출로 token 전달
      // eslint-disable-next-line @typescript-eslint/camelcase
      window.DzMobileBridge.dz_getHeaderAccessToken = (token: string) => {
        if (token) {
          const data = JSON.parse(token).data;

          this._accessToken = data.access_token;
          // 세션에 불러온 토큰값 저장
          AuthenticateService.setAuthorizedToken(data);

          resolve();
        } else {
          reject();
        }
      };

      // func_getHeaderDetailToken 호출하면, 네이티브에서 dz_getHeaderDetailToken 호출로 token 전달
      // eslint-disable-next-line @typescript-eslint/camelcase
      window.DzMobileBridge.dz_getHeaderDetailToken = (token: string) => {
        if (token) {
          this._detailToken = JSON.parse(token).data.access_token_details;

          // 세션에 불러온 토큰값 저장
          AuthenticateService.setAuthorizedDetailToken(this._detailToken);
        }
      };

      // nativeApp에서 토큰을 받아오는 API호출
      window.DzMobileBridge.func_getHeaderAccessToken!();
      window.DzMobileBridge.func_getHeaderDetailToken!();

      // 토큰이 있으면 인증완료
      // this._isAuthenticated = !!this._accessToken;
      this._isAuthenticated = true;
    });
  }
}
