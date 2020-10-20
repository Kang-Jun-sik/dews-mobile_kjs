// 바인딩, 변화 감지
export type eventType = 'change' | 'set' | 'get';

export class ObservableObject<T> {
  // 제네릭
  private _value: T;

  protected isChanged: boolean;
  public uid: string; // kendo : outputs "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"

  private readonly eventList: { [key: string]: (e: T) => void };

  constructor() {
    this.uid = '';
    this.isChanged = false;
    this.eventList = {};
  }

  protected init(initData: T) {
    this._value = initData;
  }

  set(key: keyof T, value: T[typeof key]) {
    if (typeof this._value[key] === typeof value) {
      this._value[key] = value;
      this.isChanged = true;
      this.trigger('change');
    } else {
      throw new Error('Error : mismatch value type');
    }
    this.trigger('set');
  }

  get(key: keyof T) {
    try {
      if (this._value[key]) {
        this.trigger('get');
        return this._value;
      } else {
        return null;
      }
    } catch (e) {
      console.log(JSON.stringify(e));
    }
  }

  // 이벤트 바인딩
  bind(eventName: eventType, handler: (e: T) => void) {
    this.eventList[eventName] = handler;
  }

  unbind(eventName: eventType) {
    const eventHandler = this.eventList[eventName];
    if (eventHandler) {
      this.eventList[eventName] = undefined;
      delete this.eventList[eventName];
    }
  }

  trigger(eventName: eventType) {
    const eventHandler = this.eventList[eventName];
    if (eventHandler) {
      eventHandler(this._value);
    }
  }
}
