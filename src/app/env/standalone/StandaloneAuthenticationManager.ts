import { singleton } from '@dews/dews-mobile-core';
import { AuthenticationManagerInterface } from '../../auth/AuthenticationManagerInterface.js';

@singleton()
export class StandaloneAuthenticationManager implements AuthenticationManagerInterface {
  get isAuthenticated(): boolean {
    return true;
  }

  get token(): string | undefined {
    return '';
  }

  async authenticate(): Promise<void> {
    return Promise.resolve();
  }
}
