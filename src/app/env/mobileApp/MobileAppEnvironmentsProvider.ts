import { singleton } from '@dews/dews-mobile-core';
import { SystemEnvironmentsProvider } from '../SystemEnvironmentsProvider.js';

@singleton()
export class MobileAppEnvironmentsProvider extends SystemEnvironmentsProvider {
  configure(): Promise<void> {
    return Promise.resolve(undefined);
  }
}
