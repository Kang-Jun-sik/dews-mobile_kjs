import 'reflect-metadata';
import { singleton } from '@dews/dews-mobile-core';
import { SystemEnvironmentsProviderBase } from '../SystemEnvironmentsProviderBase.js';

@singleton()
export class MobileAppEnvironmentsProvider extends SystemEnvironmentsProviderBase {
  configure(): Promise<void> {
    return Promise.resolve(undefined);
  }
}
