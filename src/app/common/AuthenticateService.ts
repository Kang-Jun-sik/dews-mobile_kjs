import JwtDecode from 'jwt-decode';

const AUTH_TOKEN_KEY = 'erp10:mobile:auth:token';
const AUTH_TOKEN_DETAIL_KEY = 'erp10:mobile:auth:token:detail';

/**
 * 인증된 사용자 정보
 */
export interface AuthorizedUser {
  /**
   * 사용자 이름
   */
  username: string;
  /**
   * 사용자 아이디
   */
  userid: string;
  /**
   * 회사 이름
   */
  companyName?: string;
  /**
   * 회사 코드
   */
  companyCode?: string;
  /**
   * 그룹 코드
   */
  groupCode?: string;
  /**
   * 그룹 이름
   */
  groupName?: string;

  /**
   * 직급 코드
   */
  dutyCode?: string;

  /**
   * 직급 이름
   */
  dutyName?: string;

  /**
   * 타임존 코드
   */
  timezone?: string;

  /**
   * 사용자 프로필 사진 경로
   */
  userpic?: string;

  /**
   * 사용자 설정 언어
   */
  language?: string;

  /**
   * 사번
   */
  empCode?: string;

  /**
   * 그룹 통합 사번
   */
  gEmpCode?: string;

  /**
   * 원그리드 관리자 여부
   */
  isOneGridSystemUser?: string;
}

export class AuthenticateService {
  /**
   * 현재 로그인한 사용자의 토큰을 반환합니다.
   * @returns {string} 로그인한 사용자 토큰 전문
   */
  static getAuthorizedUserToken(): string | null {
    return sessionStorage.getItem(AUTH_TOKEN_KEY);
  }

  /**
   * 사용자가 인증하였는지 여부를 가져옵니다.
   * @returns {boolean} 인증여부
   */
  static isAuthenticated(): boolean {
    return !!sessionStorage.getItem(AUTH_TOKEN_KEY);
  }

  // 인증 토큰을 세션 스토리지에 저장
  static setAuthorizedToken(data: unknown): void {
    sessionStorage.setItem(AUTH_TOKEN_KEY, JSON.stringify(data));
  }

  // 인증 토큰을 세션 스토리지에 저장
  static setAuthorizedDetailToken(data: unknown): void {
    sessionStorage.setItem(AUTH_TOKEN_DETAIL_KEY, JSON.stringify(data));
  }

  /**
   * 인증된 사용자의 정보를 가져옵니다.
   * @returns {AuthorizedUser} 인증된 사용자 정보
   */
  static getAuthorizedUser(): AuthorizedUser | null {
    const strAuth: string | null = sessionStorage.getItem(AUTH_TOKEN_DETAIL_KEY);
    if (strAuth) {
      return AuthenticateService.parseJwt(strAuth) as AuthorizedUser;
    }
    return null;
  }

  private static parseJwt(token: string): object {
    return JwtDecode<object>(token);
  }

  /**
   * 인증 토큰을 이용하여 사용자 정보를 저장합니다.
   * @returns {Promise<Object>}
   * @private
   */
  static saveAuthorizedUserData(): Promise<object> {
    return new Promise<object>(function (resolve, reject) {
      dews.api
        .get('/api/CM/AuthenticationAccountService/account')
        .then(result => {
          const tokenDetail = result.data['access_token_details'];

          // 세션 스토리지에 사용자 정보 저장
          AuthenticateService.setAuthorizedDetailToken(JSON.stringify(tokenDetail));

          resolve(tokenDetail);
        })
        .catch(() => {
          reject();
        });
    });
  }

  /**
   * 웹 개발도구에서의 사용자 인증을 수행합니다.
   * @param {string} token 인증을 위한 토큰
   * @return {Promise<void>}
   */
  static authenticateForIDE(token: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      if (token) {
        dews.api
          .get(`/api/CM/AccountService/login/keyModel/${token}`)
          .then(result => {
            // 인증 토큰 획득 성공
            AuthenticateService.setAuthorizedToken(result.data);

            // 사용자 정보를 세션 스토리지에 저장
            AuthenticateService.saveAuthorizedUserData()
              .then(() => resolve(result.data))
              .catch(() => reject());
          })
          .catch(() => {
            reject();
          });
      } else {
        reject();
      }
    });
  }
}
