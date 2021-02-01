import { injectable } from 'tsyringe';
import { EventArgs, EventEmitter } from '@dews/dews-mobile-core';

export class MainButton {
  public renderButtonEvent: EventEmitter;
  private _hidden = true;
  protected _on: { [name: string]: (e: Event, ...args: unknown[]) => void } = {};

  constructor() {
    this.renderButtonEvent = new EventEmitter();
  }

  public get hidden(): boolean {
    return this._hidden;
  }

  /**
   * 버튼에 이벤트를 바인딩합니다.
   * @param name 이벤트 명
   * @param handler 이벤트 핸들러
   */
  public on(name: string, handler: (e: Event, ...args: unknown[]) => void): void {
    this._on[name] = handler;
  }

  public click(e: MouseEvent): void {
    if (this._on['click']) {
      this._on['click'](e);
    }
  }

  public show(): void {
    this._hidden = false;
    this.emitRenderButtonEvent();
  }

  public hide(): void {
    this._hidden = true;
    this.emitRenderButtonEvent();
  }

  private emitRenderButtonEvent() {
    this.renderButtonEvent.emit('renderButton', {} as EventArgs);
  }
}

@injectable()
export class MainButtonSet {
  public renderButtonSetEvent: EventEmitter;
  public save: MainButton;
  public delete: MainButton;
  public search: MainButton;
  public add: MainButton;

  constructor() {
    this.renderButtonSetEvent = new EventEmitter();
    this.save = new MainButton();
    this.delete = new MainButton();
    this.search = new MainButton();
    this.add = new MainButton();

    this.registerButtonRenderingEvent(this.save);
    this.registerButtonRenderingEvent(this.delete);
    this.registerButtonRenderingEvent(this.search);
    this.registerButtonRenderingEvent(this.add);
  }

  private registerButtonRenderingEvent(button: MainButton) {
    button.renderButtonEvent.on('renderButton', () => {
      this.renderButtonSetEvent.emit('renderButtonSet', {} as EventArgs);
    });
  }

  public getMainButtonByType(type: string): MainButton {
    let result: MainButton;
    switch (type) {
      case 'save':
        result = this.save;
        break;
      case 'delete':
        result = this.delete;
        break;
      case 'search':
        result = this.search;
        break;
      case 'add':
        result = this.add;
        break;
    }

    return result!;
  }
}
