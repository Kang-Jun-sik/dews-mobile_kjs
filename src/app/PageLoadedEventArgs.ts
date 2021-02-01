import { DewsPageBase } from './base/exports.js';

export class PageLoadedEventArgs extends CustomEvent<unknown> {
  openPage: DewsPageBase | undefined;
  pageId: string | undefined;
  tag: string | undefined;
  opened: boolean | undefined;
}
