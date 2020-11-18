/**
 * 사용자 인증 정보를 관리합니다.
 */
export interface AuthenticationManagerInterface {
  /**
   * 사용자 인증 정보를 획득합니다.
   */
  authenticate(): Promise<void>;

  /**
   * 사용자가 인증되어 있는지 여부를 가져옵니다.
   */
  isAuthenticated: boolean;

  /**
   * 사용자 인증 토큰을 가져옵니다.
   */
  token: string | undefined;
}
