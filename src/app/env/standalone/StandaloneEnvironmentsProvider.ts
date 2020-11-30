import { container, inject, singleton } from '@dews/dews-mobile-core';
import { StandaloneAuthenticationManager } from './StandaloneAuthenticationManager.js';
import { SystemEnvironmentsProvider } from '../SystemEnvironmentsProvider.js';

@singleton()
export class StandaloneEnvironmentsProvider extends SystemEnvironmentsProvider {
  constructor(@inject(StandaloneAuthenticationManager) auth: StandaloneAuthenticationManager) {
    super();
    this._auth = auth;
  }

  async configure(): Promise<void> {
    this._auth = container.resolve(StandaloneAuthenticationManager);
  }
}
