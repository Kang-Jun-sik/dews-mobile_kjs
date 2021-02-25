import { DrawerBottomBase } from '../picker/drawer-bottom-base.js';
import template from './zipcodepicker.html';
import scss from './zipcodepicker.scss';
import { property } from 'lit-element';
import { Textbox } from '../textbox/textbox.js';

type ADDRESS_TYPE = 'jibun' | 'street' | 'userselect';
type EVENT_TYPES = 'complete' | 'change' | 'open' | 'close';

export class Zipcodepicker extends DrawerBottomBase {
  static styles = scss;

  @property({ type: String })
  type: ADDRESS_TYPE = 'street';

  @property({ type: String, reflect: true })
  title = '';

  @property({ type: String, reflect: true })
  address = '';

  @property({ type: String, reflect: true })
  zipCode = '';

  @property({ type: String, reflect: true })
  detailAddress = '';

  @property({ type: Boolean })
  disalbed = false;

  @property({ type: Boolean })
  detail = false;

  @property({ type: Boolean })
  reset = false;

  @property({ type: Boolean, reflect: true })
  required = false;

  @property({ type: Boolean, reflect: true })
  readonly = false;

  protected scriptLoadEvent: EventListener = this._scriptLoad.bind(this) as EventListener;

  constructor() {
    super();
    const script = document.createElement('script');
    script.addEventListener('load', this.scriptLoadEvent);
    script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    this.appendChild(script);
  }

  // 이벤트 등록
  public on(key: EVENT_TYPES, handler: (e: { target: Zipcodepicker; type: string }, ...args: unknown[]) => void) {
    this._EVENT.on(key, handler);
  }

  public off(key: EVENT_TYPES, handler: (e: { target: Zipcodepicker; type: string }, ...args: unknown[]) => void) {
    this._EVENT.on(key, handler);
  }

  private _scriptLoad(e: Event) {
    (this.shadowRoot?.querySelector('dews-textbox') as Textbox)?.on('change', this._valueChange);
    this._createZip(this);
  }

  private _valueChange = (e: { target: Textbox; type: string; value: string }) => {
    this.detailAddress = e.value;
    this._EVENT.emit('change', { target: this, type: 'change' });
  };

  error(message: string) {
    (this.shadowRoot?.querySelector('dews-textbox') as Textbox).error(message);
  }

  warning(message: string) {
    (this.shadowRoot?.querySelector('dews-textbox') as Textbox).warning(message);
  }

  private _oncomplete(data: any) {
    let addr = '';
    let selectType: ADDRESS_TYPE = this.type;
    switch (this.type) {
      case 'jibun':
        addr = data.jibunAddress;
        break;
      case 'street':
        addr = data.roadAddress;
        break;
      case 'userselect':
        if (data.userSelectedType === 'R') {
          // 사용자가 도로명 주소를 선택했을 경우
          selectType = 'street';
          addr = data.roadAddress;
        } else {
          // 사용자가 지번 주소를 선택했을 경우(J)
          selectType = 'jibun';
          addr = data.jibunAddress;
        }
        break;
    }
    this._EVENT.emit('change', { target: this, type: 'change' });
    this._close();

    // 우편번호와 주소 정보를 해당 필드에 넣는다.
    this.zipCode = data.zonecode;
    this.address = addr;
    if (this.detail) {
      (this.shadowRoot?.querySelector('dews-textbox') as Textbox).focus();
    }
    this.shadowRoot?.querySelector('iframe')?.remove();
    this._createZip(this);
  }

  private async _resetClickHandler(e: Event) {
    this.address = '';
    this.detailAddress = '';
    this.zipCode = '';
    await this.shadowRoot?.querySelector('iframe')?.remove();
    await this._createZip(this);
  }

  private _zipcode: any;
  private _createZip(self: Zipcodepicker) {
    const target = self.shadowRoot?.querySelector('#iframe') as HTMLElement;
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    this._zipcode = new daum.Postcode({
      oncomplete: self._oncomplete.bind(self),
      // 우편번호 찾기 화면 크기가 조정되었을때 실행할 코드를 작성하는 부분. iframe을 넣은 element의 높이값을 조정한다.
      onresize: function (size: any) {
        target.style.height = size.height + 'px';
      },
      width: '100%',
      height: '100%'
    }).embed(target, { autoClose: false });
  }

  render() {
    return template.call(this);
  }
}
