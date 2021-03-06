import { html, internalProperty, property, PropertyValues, TemplateResult } from 'lit-element';
import template from './containerbutton.html';
import scss from './containerbutton.scss';
import { DataSet, SearchContainer, SearchData } from '../searchcontainer/searchcontainer.js';
import { FormContainer } from '../formcontainer/formcontainer.js';
import { Tooltip } from '../tooltip/tooltip.js';
import { Messagebox } from '../messagebox/messagebox.js';
import { date } from '@dews/dews-mobile-core';
import DrawerRightBase from '../base/DrawerRightBase.js';
import { query } from 'lit-element/lib/decorators';
import { TouchScroll } from '../utill/touchscroll.js';

const userId = 'kuyoungjun';
const menuId = 'MA0001';

export class Containerbutton extends DrawerRightBase {
  static styles = scss;

  @property({ type: Boolean, attribute: 'data-set' })
  setButton = false;

  @property({ type: Boolean, attribute: 'data-capture' })
  captureButton = false;

  @property({ type: Boolean, attribute: 'data-reset' })
  resetButton = false;

  @internalProperty()
  _iconList: Array<TemplateResult> = [];

  @internalProperty()
  _buttonList: Array<TemplateResult> = [];

  @internalProperty()
  private _dataSetHeader: Array<TemplateResult> = [];

  @internalProperty()
  private _dataSetList: Array<TemplateResult> = [];

  private $parent: SearchContainer | FormContainer | undefined;

  private contentList: Array<TemplateResult> = [];

  private _scrollHandler: EventListener | undefined;

  @query('.dews-snackbar.dataset')
  snackbar: HTMLElement | undefined;

  @query('.dataset-nodata')
  datasetNodata: HTMLElement | undefined;

  @query('drawer-layout')
  drawerLayout: HTMLElement | undefined;

  connectedCallback() {
    super.connectedCallback();
    this._iconList = [];
    let list: any;
    switch (this.parentElement?.tagName) {
      case 'DEWS-SEARCH-CONTAINER':
        this.$parent = this.parentElement as SearchContainer;
        list = this.$parent!.querySelector('container-content')?.children;
        for (let i = 0; i < list!.length; i++) {
          this.contentList.push(list[i]);
        }
        break;
      case 'DEWS-FORM-CONTAINER':
        this.$parent = this.parentElement as FormContainer;
        list = this.$parent.querySelector('container-content')?.querySelectorAll('form-section');
        for (let i = 0; i < list.length; i++) {
          for (let j = 0; j < list[i]!.children.length; j++) {
            this.contentList.push(list[i].children[j]);
          }
        }
        break;
    }

    if (this.setButton) {
      this._iconList.push(html` <li class="data-set">
        <button class="set will-touch" @click="${this._dataSet}"><span>Data Set</span></button>
      </li>`);
    }
    if (this.captureButton) {
      this._iconList.push(
        html` <li class="data-capture">
          <button class="capture will-touch" @click="${this._dataCapture}">
            <span>Data Capture</span>
          </button>
        </li>`
      );
    }
    if (this.resetButton) {
      this._iconList.push(
        html` <li class="data-reset">
          <button class="reset will-touch" @click="${this._dataReset}">
            <span>Data Reset</span>
          </button>
        </li>`
      );
    }
  }

  /**
   * set ?????? ????????? ??????
   */
  public _dataSet() {
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
        if (dataSet.containerId === this.$parent?.id) {
          isDataSet = true;
          dataSet.data.sort((a: SearchData[], b: SearchData[]) => {
            return new Date(b[0].dateTime).getTime() - new Date(a[0].dateTime).getTime();
          });

          this._dataSetHeader.push(html`
            <div class="dataset-total">
              <span>??? <strong>${dataSet.data.length}</strong>???</span>
            </div>

            <div class="dataset-total-delete">
              <dews-button
                type="text"
                text="????????????"
                size="small"
                @click="${this._removeAllData.bind(this)}"
              ></dews-button>
            </div>
          `);

          this.datasetNodata!.style.display = 'none';

          for (let i = 0; i < dataSet.data.length; i++) {
            const data = dataSet.data[i];
            let value = false;
            for (let j = 0; j < data.length; j++) {
              const item: SearchData = data[j];
              if (item.value) {
                value = true;
                break;
              }
            }
            this._dataSetList.push(
              html`
                <div class="dataset">
                  <div class="header">
                    <span class="date">${data[0].dateTime}</span>
                    <button class="apply-button" @click="${this._bindData.bind(this, data)}">??????</button>
                    <button class="delete-button will-touch" @click="${this._reomveData.bind(this, dataSet.data, i)}">
                      <span>??????</span>
                    </button>
                  </div>
                  <div class="field">
                    ${value
                      ? data.map((item: SearchData) =>
                          item.value
                            ? html`<button @click="${(e: any) => this._showToolTip(e.target, item.title)}">
                                ${item.text ? item.text : item.value}
                              </button>`
                            : html``
                        )
                      : html`<span class="nodata">???????????? ????????????.</span>`}
                  </div>
                </div>
              `
            );
          }
        }
      }
      // <span class="nodata">???????????? ????????????.</span>
      // </div>
      if (!isDataSet) {
        this.datasetNodata!.style.display = 'block';
      }
    } else {
      this.datasetNodata!.style.display = 'block';
    }
  }

  private _showToolTip(target: HTMLElement, title: string) {
    if (title) {
      const tooltip = new Tooltip(target, {
        type: 'normal',
        text: title,
        position: 'bottom',
        fadeOutTime: 0
      });

      tooltip.show();

      this._scrollHandler = this._removeTooltip.bind(this, tooltip) as EventListener;

      window.addEventListener('scroll', this._scrollHandler);
      this.drawerLayout?.shadowRoot!.querySelector('.layer-content')!.addEventListener('scroll', this._scrollHandler);
    }
  }

  private _removeTooltip(tooltip: Tooltip) {
    tooltip.remove();
    if (this._scrollHandler) {
      window.removeEventListener('scroll', this._scrollHandler);
      this.drawerLayout
        ?.shadowRoot!.querySelector('.layer-content')!
        .removeEventListener('scroll', this._scrollHandler);
    }
  }

  /**
   * data??? search container??? ???????????????.
   * @param data
   * @private
   */
  private _bindData(data: SearchData[]) {
    for (let i = 0; i < this.contentList.length; i++) {
      const control: any = this.contentList[i];

      for (let j = 0; j < data.length; j++) {
        if (control.id && control.id === data[j].id) {
          switch (control.tagName) {
            case 'DEWS-PERIODPICKER':
            case 'DEWS-WEEKPERIODPICKER':
            case 'DEWS-MONTHPERIODPICKER':
              {
                const strArr = data[j].value.split('~');
                control.startDate = strArr[0] || '';
                control.endDate = strArr[1] || '';
              }
              break;
            case 'DEWS-DROPDOWNLIST':
              control.uncheckItems();
              control.setCheckItems(data[j].value);
              break;
            default:
              control.value = data[j].value;
          }
        }
      }
    }
    this._close();
  }

  /**
   * data-set ????????? ???????????????.
   * @private
   */
  private _removeAllData() {
    const msgBox = new Messagebox('????????? Set ????????? ?????? ?????????????????????????', 'alert', {
      id: 'msgBox5',
      align: 'center',
      icon: 'question'
    });

    msgBox.yes(() => {
      const list = JSON.parse(localStorage.dataSet);
      const dataSet: DataSet | void = this.findDataSet(list);

      list.splice(list.indexOf(dataSet), 1);

      localStorage.setItem('dataSet', JSON.stringify(list));

      this._renderDataList();
    });
  }

  /**
   * data-set??? ???????????????.
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
   * reset ?????? ????????? ??????
   *
   */
  public _dataReset() {
    for (let i = 0; i < this.contentList.length; i++) {
      const control: any = this.contentList[i];
      switch (control.tagName) {
        case 'DEWS-PERIODPICKER':
        case 'DEWS-WEEKPERIODPICKER':
        case 'DEWS-MONTHPERIODPICKER':
          control.startDate = '';
          control.endDate = '';
          break;
        case 'DEWS-DROPDOWNLIST':
          control.uncheckItems();
          break;
        default:
          control.value = '';
      }
    }
  }

  private findDataSet(list: DataSet[]): DataSet | void {
    for (let i = 0; i < list.length; i++) {
      const data = list[i];
      if (data.userId === userId && data.menuId === menuId && data.containerId === this.$parent!.id) {
        return data;
      }
    }
  }

  /**
   * capture ?????? ????????? ??????
   * @private
   */
  public _dataCapture() {
    const searchData: SearchData[] = [];

    const defalut = {
      userId: userId,
      menuId: menuId,
      containerId: this.$parent!.id,
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

    for (let i = 0; i < this.contentList.length; i++) {
      const control: any = this.contentList[i];
      const id = control.id || '';
      const title = control.title || '';
      let text = '';
      let value = '';
      switch (control.tagName) {
        case 'DEWS-PERIODPICKER':
        case 'DEWS-WEEKPERIODPICKER':
        case 'DEWS-MONTHPERIODPICKER':
          if (control.startDate && control.endDate) {
            text = control.text || '';
            value = control.startDate + '~' + control.endDate;
          }
          break;
        case 'DEWS-CHECKBOX-GROUP':
          text = control.value.length > 0 ? control.value.join(',') : '';
          value = control.value.length > 0 ? control.value : '';
          break;
        case 'DEWS-DROPDOWNLIST':
          text = control.text || '';
          value = control.getCheckItems().length > 0 ? control.getCheckItems() : '';
          break;
        default:
          text = control.text || '';
          value = control.value || '';
      }

      // if (id && value) {
      searchData.push({
        id: id,
        title: title,
        value: value,
        text: text,
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

      // ???????????? ????????? ??? ?????????????????? ???????????? class ??????
      setTimeout(() => {
        this.snackbar?.classList.remove('fadein');
        this.snackbar?.classList.add('fadeout');
      }, 2000);
    }
  }

  private _slotChange(e: Event) {
    Array.from(this.children).forEach($el => {
      const li = document.createElement('li');
      if ($el.tagName !== 'LI') {
        li.appendChild($el as Element);
        li.slot = 'content';
        this.appendChild(li);
      }
    });
  }

  protected firstUpdated(_changedProperties: PropertyValues) {
    super.firstUpdated(_changedProperties);
    new TouchScroll(this.shadowRoot?.querySelector('.dataset-list') as HTMLElement);
    if (this.children.length === 0) {
      this.shadowRoot?.querySelector('.option-custom-button')?.remove();
    }
  }

  render() {
    return template.call(this);
  }
}
