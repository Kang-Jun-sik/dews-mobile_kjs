import { MainEnvironment } from './MainEnvironment.js';

export class EnvironmentService {
  // 서버에서 환경 설정 데이터 받아오기
  // Api or App 중에 우선 순위에 맞춰 탐색
  public async getEnvironment(): Promise<MainEnvironment> {
    return new Promise((resolve, reject) => {
      const MainEnv = {
        initMenu: {
          modules: 'MA',
          pageId: 'MA1000',
        },
      } as MainEnvironment;
      resolve(MainEnv);
      // fetch('../../../api/env.json')
      //   .then(data => {
      //     const MainEnv = data.json() as MainEnvironment;
      //     if (this.initPage) {
      //       MainEnv.initMenu = this.initPage;
      //     }
      //     resolve(MainEnv);
      //   })
      //   .catch(err => {
      //     reject({});
      //   });
    });
  }
}
