const AUTH_TOKEN_KEY = 'erp10:mobile:auth:token';
const AUTH_TOKEN_DETAIL_KEY = 'erp10:mobile:auth:token:detail';

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

  static setAuthorizedToken(data: unknown): void {
    // 인증 토큰을 세션 스토리지에 저장
    sessionStorage.setItem(AUTH_TOKEN_KEY, JSON.stringify(data));
  }
  static setAuthorizedDetailToken(data: unknown): void {
    // 인증 토큰을 세션 스토리지에 저장
    sessionStorage.setItem(AUTH_TOKEN_DETAIL_KEY, JSON.stringify(data));
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
