import { inject, singleton } from '@dews/dews-mobile-core';
import { SystemEnvironmentsProvider } from '../SystemEnvironmentsProvider.js';
import { MobileAppAuthenticationManager } from './MobileAppAuthenticationManager.js';
import { MobileAppEnvironmentVariablesProvider } from './MobileAppEnvironmentVariablesProvider.js';

/**
 * 하이브리드 모바일 앱 모드에서의 시스템 환경 제공자입니다.
 */
@singleton()
export class MobileAppEnvironmentsProvider extends SystemEnvironmentsProvider {
  constructor(
    @inject(MobileAppAuthenticationManager) auth: MobileAppAuthenticationManager,
    @inject(MobileAppEnvironmentVariablesProvider) variables: MobileAppEnvironmentVariablesProvider
  ) {
    super();
    this._auth = auth;
    this._variables = variables;
  }

  async configure(): Promise<void> {
    await this._variables.configure();
  }
}
