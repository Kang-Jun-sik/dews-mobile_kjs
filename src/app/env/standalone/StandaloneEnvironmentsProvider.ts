import 'reflect-metadata';
import { container, singleton } from '@dews/dews-mobile-core';
import { StandaloneAuthenticationManager } from './StandaloneAuthenticationManager.js';
import { SystemEnvironmentsProviderBase } from '../SystemEnvironmentsProviderBase.js';

@singleton()
export class StandaloneEnvironmentsProvider extends SystemEnvironmentsProviderBase {
  async configure(): Promise<void> {
    this._auth = container.resolve(StandaloneAuthenticationManager);
  }
}
