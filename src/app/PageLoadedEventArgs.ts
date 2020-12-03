import { DewsBizPage } from './base/exports.js';

export class PageLoadedEventArgs extends CustomEvent<unknown> {
  openPage: DewsBizPage | undefined;
  pageId: string | undefined;
  tag: string | undefined;
}
