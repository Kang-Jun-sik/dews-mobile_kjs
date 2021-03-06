import { LitElement } from 'lit-element';
import { container } from '@dews/dews-mobile-core';
import { ApplicationMainInterface } from './ApplicationMainInterface.js';
import { SystemEnvironmentsProvider } from './env/SystemEnvironmentsProvider.js';
import { SystemType } from './SystemTypeEnum.js';
import { dependencySymbols } from './dependencySymbols.js';

/** 실핼되는 DEWS/UI Mobile 어플리케이션의 컨텍스트 객체입니다. */
export interface ApplicationContextInterface {
  /** DEWS/UI Mobile 런타임의 버전을 가져옵니다. */
  version: string;

  /** 어플리케이션의 실행 형식을 가져옵니다. */
  systemType: SystemType;

  /** 어플리케이션을 실행합니다.
   * @param container 어플리케이션이 호스팅될 요소입니다.
   */
  start(container?: HTMLDivElement | HTMLBodyElement): Promise<void>;

  /** 어플리케이션 메인 인스턴스입니다. */
  main: ApplicationMainInterface | undefined;
}

// noinspection JSMethodCanBeStatic
class ApplicationContext implements ApplicationContextInterface {
  readonly #version = '__VERSION__';
  readonly #systemType: SystemType;
  #started = false;
  #main: ApplicationMainInterface | undefined = undefined;

  constructor() {
    this.#systemType = this.getCurrentAppType();
  }

  get version(): string {
    return this.#version;
  }
  get systemType(): SystemType {
    return this.#systemType;
  }

  get main(): ApplicationMainInterface | undefined {
    return this.#main;
  }

  async start(target?: HTMLDivElement | HTMLBodyElement): Promise<void> {
    if (!this.#started) {
      // 인증 프로세스 수행
      const systemEnv = await this.registerConditionalDependencies();

      try {
        await systemEnv.auth.authenticate();
        if (systemEnv.auth.isAuthenticated) {
          const { DewsMobileApp } = await import('./dews-mobile-app.js');
          this.#main = new DewsMobileApp();

          target = target ?? (document.body as HTMLBodyElement);
          target!.prepend((this.#main as unknown) as Node);

          await ((this.#main as unknown) as LitElement).updateComplete;
          // Object.freeze(this.#main);
        }
      } catch (err) {
        // 인증 실패
      }

      this.#started = true;
    }
  }

  private getCurrentAppType(): SystemType {
    if (window.DzMobileBridge) {
      // Mobile-app 호출 : 앱에서 제공하는 전용 function 이 있는지 여부로 판단
      return SystemType.MobileApp;
    }

    if (location.search) {
      // Front-designer 호출 : querystring 에 token 매개변수가 제공됨
      const params = new URLSearchParams(location.search);
      if (params.has('token')) {
        return SystemType.FrontDesigner;
      }
    }

    return SystemType.Standalone;
  }

  private async registerConditionalDependencies(): Promise<SystemEnvironmentsProvider> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let systemEnv: { new (...args: any[]): SystemEnvironmentsProvider };

    switch (this.#systemType) {
      case SystemType.MobileApp:
        systemEnv = (await import('./env/mobileApp/MobileAppEnvironmentsProvider.js')).MobileAppEnvironmentsProvider;
        break;
      case SystemType.FrontDesigner:
        systemEnv = (await import('./env/frontDesigner/FrontDesignerEnvironmentProvider.js'))
          .FrontDesignerEnvironmentProvider;
        break;
      default:
        systemEnv = (await import('./env/standalone/StandaloneEnvironmentsProvider.js')).StandaloneEnvironmentsProvider;
        break;
    }
    const instance = container.resolve<SystemEnvironmentsProvider>(systemEnv);
    await instance.configure();
    container.registerInstance(dependencySymbols.SystemEnvironmentsProvider, instance);

    return instance;
  }
}

const app = new ApplicationContext();

export { app };
