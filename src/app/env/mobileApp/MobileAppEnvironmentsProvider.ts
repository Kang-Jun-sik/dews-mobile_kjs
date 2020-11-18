import 'reflect-metadata';
import { singleton } from '../../../core/di/exports.js';
import { SystemEnvironmentsProviderBase } from '../SystemEnvironmentsProviderBase.js';

@singleton()
export class MobileAppEnvironmentsProvider extends SystemEnvironmentsProviderBase {
  configure(): Promise<void> {
    return Promise.resolve(undefined);
  }
}
