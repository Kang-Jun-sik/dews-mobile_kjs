import { singleton } from '@dews/dews-mobile-core';
import { AuthenticationManagerInterface } from '../../auth/AuthenticationManagerInterface.js';

@singleton()
export class MobileAppAuthenticationManager implements AuthenticationManagerInterface {
  get isAuthenticated(): boolean {
    return false;
  }
  get token(): string | undefined {
    return undefined;
  }

  async authenticate(): Promise<void> {
    return Promise.resolve();
  }
}
