import { App } from './app.js';
import { ApplicationContext } from './ApplicationContext.js';

interface DewsInterface {
  app: ApplicationContext;
}

declare global {
  interface Window {
    dews: DewsInterface;
  }
  let dews: DewsInterface;
}

const context = new App();
window.dews = {
  app: context,
};
context.start();
