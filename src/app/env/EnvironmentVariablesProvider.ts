import { merge } from '@dews/dews-mobile-core';
import { GlobalEnvironmentVariables } from './GlobalEnvironmentVariables.js';
import { PageEnvironmentVariables } from './PageEnvironmentVariables.js';

/**
 * 시스템의 환경 변수를 제공합니다.
 */
export abstract class EnvironmentVariablesProvider {
  /** 전역 환경 변수를 가져옵니다. */
  abstract get global(): GlobalEnvironmentVariables;

  /**
   * 지정한 페이지 전용 환경 변수를 가져옵니다.
   * @param pageId 페이지 아이디
   */
  abstract page(pageId: string): PageEnvironmentVariables;

  /** 환경 변수 제공을 위한 초기화 구성을 수행합니다. */
  abstract configure(): Promise<void>;

  /**
   * 여러가지 환경 변수를 병합니다.
   * @param base 기준이 되는 기본 환경 변수
   * @param envs 적용할 환경 변수의 서브셋
   * @protected
   */
  protected merge<T extends GlobalEnvironmentVariables>(base: T, ...envs: Partial<T>[]): T {
    return merge(base, ...envs) as T;
  }
}
