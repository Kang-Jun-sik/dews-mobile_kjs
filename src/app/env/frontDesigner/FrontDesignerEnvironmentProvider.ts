import { container, singleton } from '@dews/dews-mobile-core';
import { AuthenticationManagerInterface } from '../../auth/exports.js';
import { SystemEnvironmentsProvider } from '../SystemEnvironmentsProvider.js';
import { FrontDesignerAuthenticationManager } from './FrontDesignerAuthenticationManager.js';

@singleton()
export class FrontDesignerEnvironmentProvider extends SystemEnvironmentsProvider {
  constructor() {
    super();
  }

  async configure(): Promise<void> {
    this._auth = container.resolve<AuthenticationManagerInterface>(FrontDesignerAuthenticationManager);
  }
}
