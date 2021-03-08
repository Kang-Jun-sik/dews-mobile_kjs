import { ApplicationContextInterface } from './ApplicationContext.js';
import { DataApiClientInterface } from '@dews/dews-mobile-core';
import { HttpClient } from '@dews/dews-mobile-core/dist/types/utils/comm/HttpClient';
import { GlobalComponentRegister } from './GlobalComponentRegister.js';

export interface DewsMobileInterface {
  app: ApplicationContextInterface;
  api: DataApiClientInterface;
  ajax: HttpClient;
  ui: GlobalComponentRegister;
}
