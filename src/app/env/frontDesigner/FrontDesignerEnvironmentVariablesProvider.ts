import { singleton } from '@dews/dews-mobile-core';
import { EnvironmentVariablesProvider } from '../EnvironmentVariablesProvider.js';
import { DefaultGlobalEnvironmentVariables, GlobalEnvironmentVariables } from '../GlobalEnvironmentVariables.js';
import { PageEnvironmentVariables } from '../PageEnvironmentVariables.js';

/**
 * DEWS Front-Designer 미리보기로 샐행되는 시스템에서 환경 변수를 제공합니다.
 */
@singleton()
export class FrontDesignerEnvironmentVariablesProvider extends EnvironmentVariablesProvider {
  private _global!: GlobalEnvironmentVariables;

  constructor() {
    super();
  }

  get global(): GlobalEnvironmentVariables {
    return this._global;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  page(pageId: string): PageEnvironmentVariables {
    return {};
  }

  async configure(): Promise<void> {
    // 임시코드: 서버로 부터 획득한 정보가 있으면 기본 값과 합쳐서 저장
    this._global = this.merge<GlobalEnvironmentVariables>(DefaultGlobalEnvironmentVariables, {});
  }
}
