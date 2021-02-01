import { inject, singleton } from '@dews/dews-mobile-core';
import { SystemEnvironmentsProvider } from '../SystemEnvironmentsProvider.js';
import { FrontDesignerAuthenticationManager } from './FrontDesignerAuthenticationManager.js';
import { FrontDesignerEnvironmentVariablesProvider } from './FrontDesignerEnvironmentVariablesProvider.js';

/**
 * DEWS Front-Designer 미리보기 실행 모드에서의 시스템 환경 제공자입니다.
 */
@singleton()
export class FrontDesignerEnvironmentProvider extends SystemEnvironmentsProvider {
  constructor(
    @inject(FrontDesignerAuthenticationManager) auth: FrontDesignerAuthenticationManager,
    @inject(FrontDesignerEnvironmentVariablesProvider) variables: FrontDesignerEnvironmentVariablesProvider
  ) {
    super();
    this._auth = auth;
    this._variables = variables;
  }

  async configure(): Promise<void> {
    await this._variables.configure();
  }
}
