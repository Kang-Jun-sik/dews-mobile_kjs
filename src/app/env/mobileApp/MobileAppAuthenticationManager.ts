import { singleton } from '@dews/dews-mobile-core';
import { AuthenticationManagerInterface } from '../../auth/AuthenticationManagerInterface.js';

@singleton()
export class MobileAppAuthenticationManager implements AuthenticationManagerInterface {
  private _isAuthenticated = false;

  get isAuthenticated(): boolean {
    return this._isAuthenticated;
  }
  get token(): string | undefined {
    return undefined;
  }

  async authenticate(): Promise<void> {
    this._isAuthenticated = true;
    return Promise.resolve();
  }
}
