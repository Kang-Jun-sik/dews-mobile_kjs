import { DewsMobileInterface } from './app/DewsMobileInterface.js';

declare global {
  interface Window {
    dews: DewsMobileInterface;
  }

  const dews: DewsMobileInterface;
}
