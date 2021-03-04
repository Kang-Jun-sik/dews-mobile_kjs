import { DrawerBottomBase } from '../drawer-bottom-base.js';
import template from './zipcodepicker.html';
import scss from './zipcodepicker.scss';
import { property } from 'lit-element';
import { Textbox } from '../../textbox/textbox.js';

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
    const postCodeScript = document.querySelector('#daum_postcode') as HTMLScriptElement;
    if (postCodeScript === null) {
      const script = document.createElement('script');
      script.addEventListener('load', this.scriptLoadEvent);
      script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
      script.id = 'daum_postcode';
      document.body.appendChild(script);
    } else {
      if (postCodeScript.hasAttribute('load')) {
        this._scriptLoad.bind(this)();
      } else {
        postCodeScript.addEventListener('load', this.scriptLoadEvent);
      }
    }
  }

  // 이벤트 등록
  public on(key: EVENT_TYPES, handler: (e: { target: Zipcodepicker; type: string }, ...args: unknown[]) => void) {
    this._EVENT.on(key, handler);
  }

  public off(key: EVENT_TYPES, handler: (e: { target: Zipcodepicker; type: string }, ...args: unknown[]) => void) {
    this._EVENT.on(key, handler);
  }

  private _scriptLoad() {
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
    (document.querySelector('#daum_postcode') as HTMLScriptElement).setAttribute('load', '');
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    this._zipcode = new daum.Postcode({
      oncomplete: self._oncomplete.bind(self),
      theme: {
        bgColor: '#fcfcfc', //바탕 배경색
        searchBgColor: '#ffffff', //검색창 배경색
        contentBgColor: '#ffffff', //본문 배경색(검색결과,결과없음,첫화면,검색서제스트)
        pageBgColor: '#ffffff', //페이지 배경색
        textColor: '#333333', //기본 글자색
        queryTextColor: '#222222', //검색창 글자색
        postcodeTextColor: '#fa4256', //우편번호 글자색
        emphTextColor: '#177aff', //강조 글자색
        outlineColor: '#eoeoeo' //테두리
      },
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
