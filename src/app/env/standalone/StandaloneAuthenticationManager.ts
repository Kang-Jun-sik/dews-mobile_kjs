import 'reflect-metadata';
import { injectable } from '@dews/dews-mobile-core';
import { AuthenticationManagerInterface } from '../../auth/AuthenticationManagerInterface.js';

@injectable()
export class StandaloneAuthenticationManager implements AuthenticationManagerInterface {
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
