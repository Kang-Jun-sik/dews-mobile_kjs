import { html, internalProperty, property, TemplateResult } from 'lit-element';

import template from './searchcontainer.html';
import scss from './searchcontainer.scss';
import { query } from 'lit-element/lib/decorators.js';
import { date } from '@dews/dews-mobile-core';
import DrawerRightBase from '../base/DrawerRightBase.js';
import { Messagebox } from '../messagebox/dews-messagebox.js';
import { Tooltip } from '../tooltip/tooltip.js';

export interface DataSet {
  userId?: string;
  menuId?: string;
  containerId: string;
  data: Array<any>;
}

export interface SearchData {
  id: string;
  title: string;
  value: string;
  dateTime: string;
}

const userId = 'kuyoungjun';
const menuId = 'MA0001';

export class SearchContainer extends DrawerRightBase {
  static styles = scss;

  @property({ type: String })
  id = '';

  @property({ type: String })
  title = '';

  @property({ type: Number, reflect: true })
  col = 1;

  @query('.dews-snackbar.dataset')
  snackbar: HTMLElement | undefined;

  @internalProperty()
  private _dataSetHeader: Array<TemplateResult> = [];

  @internalProperty()
  private _dataSetList: Array<TemplateResult> = [];

  /**
   * set 버튼 클릭시 처리
   */
  public _setClick() {
    this._renderDataList();
    this._open();
  }

  private _renderDataList() {
    let dataSetList;
    let isDataSet = false;

    if (localStorage.dataSet) {
      dataSetList = JSON.parse(localStorage.dataSet);
    }

    this._dataSetList = [];
    this._dataSetHeader = [];

    if (dataSetList) {
      for (let i = 0; i < dataSetList.length; i++) {
        const dataSet = dataSetList[i];
        if (dataSet.containerId === this.id) {
          isDataSet = true;
          dataSet.data.sort((a: SearchData[], b: SearchData[]) => {
            return new Date(b[0].dateTime).getTime() - new Date(a[0].dateTime).getTime();
          });

          this._dataSetHeader.push(html`
            <div class="dataset-total">
              <span>총 <strong>${dataSet.data.length}</strong>건</span>
            </div>

            <div class="dataset-total-delete">
              <dews-button
                type="text"
                text="전체삭제"
                size="small"
                @click="${this._removeAllData.bind(this)}"
              ></dews-button>
            </div>
          `);

          for (let i = 0; i < dataSet.data.length; i++) {
            const data = dataSet.data[i];
            this._dataSetList.push(
              html`
                <div class="dataset">
                  <div class="header">
                    <span class="date">${data[0].dateTime}</span>
                    <button class="apply-button" @click="${this._setData.bind(this, data)}">적용</button>
                    <button class="delete-button" @click="${this._reomveData.bind(this, dataSet.data, i)}">
                      <span>삭제</span>
                    </button>
                  </div>
                  <div class="field">
                    ${data.map((item: SearchData) =>
                      item.value
                        ? html`<button @click="${(e: any) => this._showToolTip(e.target, item.title)}">
                            ${item.value}
                          </button>`
                        : html``
                    )}
                  </div>
                </div>
              `
            );
          }
        }
      }
      if (!isDataSet) {
        // 등록된 정보가 없습니다 디자인 추후 추가 필요
      }
    } else {
      // 등록된 정보가 없습니다 디자인 추후 추가 필요
    }
  }

  private _showToolTip(target: HTMLElement, title: string) {
    if (title) {
      const tooltip = new Tooltip();
      tooltip.options = {
        type: 'normal',
        text: title,
        position: 'bottom',
        fadeOutTime: 0
      };
      tooltip._target = target;
      tooltip.show();
    }
  }

  /**
   * data를 search container에 적용합니다.
   * @param data
   * @private
   */
  private _setData(data: SearchData[]) {
    const fieldList = this.shadowRoot!.querySelector('container-content')?.shadowRoot!.querySelectorAll(
      '.form-field li'
    ) as NodeList;

    for (let i = 0; i < fieldList.length; i++) {
      const control: any = fieldList[i].childNodes[0];

      for (let j = 0; j < data.length; j++) {
        if (control.id && control.id === data[j].id) {
          control.value = data[j].value;
        }
      }
    }
    this._close();
  }

  /**
   * data-set 전체를 삭제합니다.
   * @private
   */
  private _removeAllData() {
    const msgBox = new Messagebox();
    msgBox.message = '데이터 Set 내역을 모두 삭제하시겠습니까?';
    msgBox.options = {
      id: 'msgBox5',
      align: 'center',
      icon: 'question'
    };
    msgBox.show();

    msgBox.yes(() => {
      const list = JSON.parse(localStorage.dataSet);
      const dataSet: DataSet | void = this.findDataSet(list);

      list.splice(list.indexOf(dataSet), 1);

      localStorage.setItem('dataSet', JSON.stringify(list));

      this._renderDataList();
    });
  }

  /**
   * data-set을 삭제합니다.
   * @param data
   * @private
   */
  private _reomveData(data: SearchData[], index: number) {
    const list = JSON.parse(localStorage.dataSet);

    const dataSet: DataSet | void = this.findDataSet(list);

    if (dataSet) {
      dataSet.data.splice(index, 1);
    }

    localStorage.setItem('dataSet', JSON.stringify(list));
    this._renderDataList();
  }

  /**
   * reset 버튼 클릭시 처리
   *
   */
  public _resetClick() {
    const fieldList = this.shadowRoot!.querySelector('container-content')?.shadowRoot!.querySelectorAll(
      '.form-field li'
    ) as NodeList;

    for (let i = 0; i < fieldList.length; i++) {
      const control: any = fieldList[i].childNodes[0];
      control.value = '';
    }
  }

  private findDataSet(list: DataSet[]): DataSet | void {
    for (let i = 0; i < list.length; i++) {
      const data = list[i];
      if (data.userId === userId && data.menuId === menuId && data.containerId === this.id) {
        return data;
      }
    }
  }

  /**
   * capture 버튼 클릭시 처리
   * @private
   */
  public _captureClick() {
    const searchData: SearchData[] = [];
    const fieldList = this.shadowRoot!.querySelector('container-content')?.shadowRoot!.querySelectorAll(
      '.form-field li'
    ) as NodeList;

    const defalut = {
      userId: userId,
      menuId: menuId,
      containerId: this.id,
      data: []
    };

    let dataSetList: DataSet[];
    let dataSet: DataSet | void;
    let save = false;

    if (!localStorage.dataSet) {
      dataSetList = [defalut];
    } else {
      dataSetList = JSON.parse(localStorage.dataSet);
    }

    dataSet = this.findDataSet(dataSetList);

    if (!dataSet) {
      dataSet = defalut;
      dataSetList.push(dataSet);
    }

    for (let i = 0; i < fieldList.length; i++) {
      const control: any = fieldList[i].childNodes[0];
      const id = control.id || '';
      const value = control.value || '';
      const title = control.title || '';
      // if (id && value) {
      searchData.push({
        id: id,
        title: title,
        value: value,
        dateTime: date.format(date.parse(new Date()), 'yyyy-MM-dd HH:mm:ss')
      });
      save = true;
      // }
    }

    const count = dataSet.data.unshift(searchData);
    if (count > 30) {
      dataSet.data.pop();
    }

    if (save) {
      localStorage.setItem('dataSet', JSON.stringify(dataSetList));
      this.snackbar?.classList.remove('fadeout');
      this.snackbar?.classList.add('fadein');

      // 스낵바가 사라질 때 애니메이션을 주기위한 class 변경
      setTimeout(() => {
        this.snackbar?.classList.remove('fadein');
        this.snackbar?.classList.add('fadeout');
      }, 2000);
    }
  }

  private _slotChange(e: Event) {
    for (let i = 0; i < this.children.length; i++) {
      if (this.children.item(i)?.tagName === 'CONTAINER-BUTTON') {
        this.shadowRoot
          ?.querySelector('.dews-container-option-control')
          ?.appendChild(this.children.item(i) as HTMLElement);
      } else if (this.children.item(i)?.tagName === 'CONTAINER-CONTENT') {
        this.shadowRoot?.querySelector('.dews-search-field')?.appendChild(this.children.item(i) as HTMLElement);
      }
    }
  }

  render() {
    return template.call(this);
  }
}
