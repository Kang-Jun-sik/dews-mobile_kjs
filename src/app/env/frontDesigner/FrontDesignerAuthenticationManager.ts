import 'reflect-metadata';
import { injectable } from '../../../core/di/exports.js';
import { AuthenticationManagerInterface } from '../../auth/AuthenticationManagerInterface.js';

@injectable()
export class FrontDesignerAuthenticationManager implements AuthenticationManagerInterface {
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
