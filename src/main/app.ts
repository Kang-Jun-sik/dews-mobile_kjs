import { ApplicationContext } from './ApplicationContext.js';
import { MainInterface } from './MainInterface.js';
import { Main } from './main.js';
import { MainEnvironment } from '../env/MainEnvironment.js';
import { EnvironmentService } from '../env/EnvironmentService.js';
import { AuthorizedUser } from './AuthorizedUser.js';

export class App implements ApplicationContext {
  public main: MainInterface;
  public user: AuthorizedUser; // tobe: interface
  public env: MainEnvironment;
  public version: string;

  private envService: EnvironmentService;

  constructor() {
    this.envService = new EnvironmentService();
    this.main = new Main();
    this.version = '0.0.1';
    // Main 을 시작하기 전 필요한 세팅
    // getEnv, getUser -> Api or App 에서 제공
  }

  public async start(): Promise<void> {
    await this.getEnvironment();
    await this.getAuthorizedUser();
    this.main.start();
  }

  public async getEnvironment(): Promise<void> {
    this.env = await this.envService.getEnvironment();
  }

  public async getAuthorizedUser(): Promise<void> {
    this.user = { username: 'testuser', userid: 'testid' } as AuthorizedUser;
  }
}
