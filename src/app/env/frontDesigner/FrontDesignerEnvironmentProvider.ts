import 'reflect-metadata';
import { container, singleton } from '../../../core/di/exports.js';
import { AuthenticationManagerInterface } from '../../auth/exports.js';
import { SystemEnvironmentsProviderBase } from '../SystemEnvironmentsProviderBase.js';
import { FrontDesignerAuthenticationManager } from './FrontDesignerAuthenticationManager.js';

@singleton()
export class FrontDesignerEnvironmentProvider extends SystemEnvironmentsProviderBase {
  constructor() {
    super();
  }

  async configure(): Promise<void> {
    this._auth = container.resolve<AuthenticationManagerInterface>(FrontDesignerAuthenticationManager);
  }
}
