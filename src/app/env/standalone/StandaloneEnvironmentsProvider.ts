import { inject, singleton } from '@dews/dews-mobile-core';
import { SystemEnvironmentsProvider } from '../SystemEnvironmentsProvider.js';
import { StandaloneAuthenticationManager } from './StandaloneAuthenticationManager.js';
import { StandaloneEnvironmentVariableProvider } from './StandaloneEnvironmentVariableProvider.js';

/**
 * 단독 실행 모드에서의 시스템 환경 제공자입니다.
 */
@singleton()
export class StandaloneEnvironmentsProvider extends SystemEnvironmentsProvider {
  constructor(
    @inject(StandaloneAuthenticationManager) auth: StandaloneAuthenticationManager,
    @inject(StandaloneEnvironmentVariableProvider) variableProvider: StandaloneEnvironmentVariableProvider
  ) {
    super();
    this._auth = auth;
    this._variables = variableProvider;
  }

  async configure(): Promise<void> {
    await this._variables.configure();
  }
}
