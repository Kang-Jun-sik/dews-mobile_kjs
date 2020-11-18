import 'reflect-metadata';

export * from './core/exports.js';
export * from './app/exports.js';

import { app } from './app/ApplicationContext.js';
window.dews = {
  app
};
