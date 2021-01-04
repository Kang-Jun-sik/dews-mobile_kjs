import { DewsLayoutComponent } from './DewsLayoutComponent.js';
import { AreaType } from '../../app/base/AreaType.js';
import { FocusChangingEventArgs } from '../../app/FocusChangingEventArgs.js';
import { MainButtonSet } from '../../app/main-bottom/MainButtons.js';
import { container } from 'tsyringe';
import { property } from 'lit-element';
/**
 * Layout Component 관련
 *  - Area, Panel 등등
 */
export class DewsAreaComponent extends DewsLayoutComponent {
  // 모든 메인 버튼 활성화
  @property({ type: Boolean, attribute: 'btn-all' })
  useAllButton = false;

  // 저장 버튼
  @property({ type: Boolean, attribute: 'btn-save' })
  useSaveButton = false;

  // 추가 버튼
  @property({ type: Boolean, attribute: 'btn-add' })
  useAddButton = false;

  // 조회 버튼
  @property({ type: Boolean, attribute: 'btn-search' })
  useSearchButton = false;

  // 삭제 버튼
  @property({ type: Boolean, attribute: 'btn-delete' })
  useDeleteButton = false;

  protected _mainButtons: MainButtonSet | undefined;

  public get mainButtons(): MainButtonSet {
    return this._mainButtons!;
  }

  async connectedCallback() {
    super.connectedCallback();
    this._mainButtons = container.resolve(MainButtonSet);
    await this.setMainButtonSet();
  }

  // Area click 이벤트를 받아서 custom event dispatch
  protected _focusChanging(e: Event) {
    const focusChangingEvent = new FocusChangingEventArgs('focusChanging', { bubbles: true, composed: true });
    //   Click Event 에서 넘어온 currentTarget 이 click Event Listener 걸어놓은 box 나 tabs 고, 실제 active class 를 추가 할 요소이기 때문에 전달함.
    focusChangingEvent.focusTarget = e.currentTarget as AreaType;
    this.dispatchEvent(focusChangingEvent);
  }

  protected async setMainButtonSet(): Promise<void> {
    if (this.useAllButton) {
      this._mainButtons!.add.show();
      this._mainButtons!.delete.show();
      this._mainButtons!.save.show();
      this._mainButtons!.search.show();
    } else {
      if (this.useAddButton) this._mainButtons!.add.show();
      if (this.useDeleteButton) this._mainButtons!.delete.show();
      if (this.useSaveButton) this._mainButtons!.save.show();
      if (this.useSearchButton) this._mainButtons!.search.show();
    }

    return;
  }
}
