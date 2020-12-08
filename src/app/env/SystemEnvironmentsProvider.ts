import { AuthenticationManagerInterface } from '../auth/exports.js';
import { EnvironmentVariablesProvider } from './EnvironmentVariablesProvider.js';

/**
 * 현재 실행되고 있는 실행 환경에 따라 어플리케이션 실행에 필요한 정보를 제공합니다.
 */
export abstract class SystemEnvironmentsProvider {
  protected _auth!: AuthenticationManagerInterface;
  protected _variables!: EnvironmentVariablesProvider;

  /** 인증 정보 및 사용자 인증과 관련된 기능을 제공하는 제공자 객체를 가져옵니다. */
  get auth(): AuthenticationManagerInterface {
    return this._auth;
  }

  /** 환경 변수 제공자를 가져옵니다. */
  get env(): EnvironmentVariablesProvider {
    return this._variables;
  }

  /** 시스템 정보를 제공하기 위해 초기화 및 내부 구성을 수행합니다. */
  abstract configure(): Promise<void>;
}
