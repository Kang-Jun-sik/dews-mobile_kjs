import { singleton } from '@dews/dews-mobile-core';
import { AuthenticationManagerInterface } from '../../auth/AuthenticationManagerInterface.js';
import { AuthenticateService } from '../../common/AuthenticateService.js';

@singleton()
export class FrontDesignerAuthenticationManager implements AuthenticationManagerInterface {
  private _token: string | undefined;
  private _authenticated = false;

  get isAuthenticated(): boolean {
    return this._authenticated;
  }

  get token(): string | undefined {
    return this._token;
  }

  async authenticate(): Promise<void> {
    return new Promise((resolve, reject) => {
      const params = new URLSearchParams(location.search);
      if (params.has('token')) {
        AuthenticateService.authenticateForIDE(params.get('token')!)
          .then((authToken: string) => {
            // 사용자 인증 성공
            console.log('## 인증 토큰 ##', authToken);
            this._token = authToken;
            this._authenticated = true;
            resolve();
          })
          .catch(e => {
            // 사용자 인증 실패
            reject(e);
          });
      }
    });
  }
}
