import { DewsPageBase } from '../core/baseclass/DewsPageBase.js';

export class PageLoadedEventArgs extends CustomEvent<any> {
  openPage: DewsPageBase;
}
