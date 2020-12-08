import { FrontDesignerEnvironmentsTest } from './frontDesigner/env.frontDesigner.test.js';
import { MobileAppEnvironmentsTest } from './mobileApp/env.mobileApp.test.js';
import { StandardEnvironmentsTest } from './standalone/env.standalone.test.js';

describe('env', () => {
  FrontDesignerEnvironmentsTest();
  MobileAppEnvironmentsTest();
  StandardEnvironmentsTest();
});
