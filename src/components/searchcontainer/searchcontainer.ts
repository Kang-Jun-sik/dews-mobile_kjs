import { html, internalProperty, property, TemplateResult } from 'lit-element';

import template from './searchcontainer.html';
import scss from './searchcontainer.scss';
import { query } from 'lit-element/lib/decorators.js';
import { date } from '@dews/dews-mobile-core';
import DrawerRightBase from '../base/DrawerRightBase.js';

export interface DataSet {
  userId?: string;
  menuId?: string;
  containerId: string;
  data: Array<any>;
}

export interface SearchData {
  id: string;
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

  private _iconList: Array<TemplateResult> = [];
  private _contentList: Array<TemplateResult> = [];

  @internalProperty()
  private _totalCount: Array<TemplateResult> = [];

  @internalProperty()
  private _dataList: Array<TemplateResult> = [];

  /**
   * set 버튼 클릭시 처리
   */
  private _setClick(e?: MouseEvent) {
    this._renderDataList();
    this._open();
  }

  private _renderDataList() {
    this._dataList = [];
    this._totalCount = [];
    this._dataList = [];
    let dataSetList;
    let isDataSet = false;

    if (localStorage.dataSet) {
      dataSetList = JSON.parse(localStorage.dataSet);
    }

    if (dataSetList) {
      for (let i = 0; i < dataSetList.length; i++) {
        const dataSet = dataSetList[i];
        if (dataSet.containerId === this.id) {
          isDataSet = true;
          dataSet.data.sort((a: SearchData[], b: SearchData[]) => {
            return new Date(b[0].dateTime).getTime() - new Date(a[0].dateTime).getTime();
          });

          this._totalCount.push(html`총 <strong>${dataSet.data.length}</strong>건`);

          for (let i = 0; i < dataSet.data.length; i++) {
            const data = dataSet.data[i];
            this._dataList.push(
              html`
                <div class="dataset">
                  <div class="header">
                    <span class="date">${data[0].dateTime}</span>
                    <button class="apply-button" @click="${this._setData.bind(this, data)}">적용</button>
                    <button class="delete-button" @click="${this._reomveData.bind(this, dataSet.data, i)}">
                      <span>삭제</span>
                    </button>
                  </div>
                  <div class="field">${data.map((i: any) => html` <button>${i.value}</button>`)}</div>
                </div>
              `
            );
          }
        }
      }
      if (!isDataSet) {
        // 등록된 정보가 없습니다 디자인 추후 추가 필요
        this._totalCount.push(html`총 <strong>0</strong>건</>`);
      }
    } else {
      this._totalCount.push(html`총 <strong>0</strong>건</>`);
    }
  }

  /**
   * data를 search container에 적용합니다.
   * @param data
   * @private
   */
  private _setData(data: SearchData[]) {
    for (let i = 0; i < this._contentList.length; i++) {
      const control: any = this._contentList[i].values[0];

      for (let j = 0; j < data.length; j++) {
        if (control.id === data[j].id) {
          control.value = data[j].value;
        }
      }
    }
    this._close();
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
  private _resetClick() {
    for (let i = 0; i < this._contentList.length; i++) {
      const control: any = this._contentList[i].values[0];
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
  private _captureClick() {
    const searchData: SearchData[] = [];
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

    for (let i = 0; i < this._contentList.length; i++) {
      const control: any = this._contentList[i].values[0];
      const id = control.id || '';
      const value = control.value || '';
      if (value) {
        searchData.push({
          id: id,
          value: value,
          dateTime: date.format(date.parse(new Date()), 'yyyy-MM-dd HH:mm:ss')
        });
        save = true;
      }
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

  /*
   * capture 버튼 클릭시 처리
   * */

  private _contentView() {
    const contentChildLength = this.querySelector('container-content')?.childElementCount;
    const contentChildItem = this.querySelector('container-content')?.children;
    if (contentChildLength! <= 0 || contentChildItem == undefined) {
      return;
    }
    for (let i = 0; i < contentChildLength!; i++) {
      this._contentList.push(html`<li>${contentChildItem.item(i)}</li>`);
    }
    // this.querySelector('container-content').remove();
  }

  private _buttonView() {
    const setState: boolean | undefined = this.querySelector('container-button')?.hasAttribute('data-set');
    const captureState: boolean | undefined = this.querySelector('container-button')?.hasAttribute('data-capture');
    const resetState: boolean | undefined = this.querySelector('container-button')?.hasAttribute('data-reset');

    if (setState) {
      this._iconList.push(
        html`<li class="data-set">
          <button id="drawer" class="set" @click="${this._setClick}">
            <span>Data Set</span>
          </button>
        </li>`
      );
    }
    if (captureState) {
      this._iconList.push(
        html`<li class="data-capture">
          <button class="capture" @click="${this._captureClick}"><span>Data Capture</span></button>
        </li>`
      );
    }
    if (resetState) {
      this._iconList.push(
        html`<li class="data-reset">
          <button class="reset" @click="${this._resetClick}"><span>Data Reset</span></button>
        </li>`
      );
    }
  }
  constructor() {
    super();
    this._contentView();
    this._buttonView();
  }

  render() {
    return template.call(this);
  }
}
