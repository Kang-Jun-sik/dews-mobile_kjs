import { EventArgs } from './EventArgs.js';

/**
 * 순수 자바스크립트 객체에서 이벤트 기능 지원하는 클래스입니다.
 */
export class EventEmitter {
  private event: { [key: string]: ((args: EventArgs) => void)[] } = {};

  private onceEvent: { [key: string]: ((args: EventArgs) => void)[] } = {};

  /**
   * 지정한 이름의 이벤트에 대한 핸들러를 등록합니다.
   * @param event 이벤트 명
   * @param handler 이벤트 핸들러 함수
   */
  on<T extends EventArgs>(event: string, handler: (args: T) => void): void {
    if (!this.event[event]) {
      this.event[event] = [];
    }
    this.event[event].push(handler as (args: EventArgs) => void);
  }

  /**
   * 지정한 이름의 이벤트에 대해 최초 발생 시 한 번만 실행되는 핸들러를 등록합니다.
   * @param event 이벤트 명
   * @param handler 이벤트 핸들러 함수
   */
  once<T extends EventArgs>(event: string, handler: (args: T) => void): void {
    if (!this.onceEvent[event]) {
      this.onceEvent[event] = [];
    }
    this.onceEvent[event].push(handler as (args: EventArgs) => void);
  }

  /**
   * 지정한 이름의 이벤트에 등록된 이벤트 핸들러를 삭제합니다.
   * @param event 이벤트 명
   * @param handler 삭제할 핸들러 함수 (생략 시에는 등록된 핸들러를 모두 삭제합니다.)
   */
  off<T extends EventArgs>(event: string, handler?: (args: T) => void): void {
    if (this.event[event]) {
      if (handler) {
        EventEmitter._removeHandler(this.event[event], handler);
      } else {
        this.event[event] = [];
      }
    }
    if (this.onceEvent[event]) {
      if (handler) {
        EventEmitter._removeHandler(this.onceEvent[event], handler);
      } else {
        this.onceEvent[event] = [];
      }
    }
  }

  /**
   * 지정한 이름의 이벤트를 발생시킵니다.
   * @param event 발생시킬 이벤트 명
   * @param args 이벤트 핸들러에 제공되는 이벤트 매개변수
   */
  emit<T extends EventArgs>(event: string, args: T): void {
    const events = this.event[event];
    if (events && Array.isArray(events)) {
      events.forEach(cb => {
        cb.call(args.target ?? this, args);
      });
    }

    const onceEvents = this.onceEvent[event];
    if (onceEvents && Array.isArray(onceEvents)) {
      onceEvents.forEach(cb => {
        cb.call(args.target ?? this, args);
      });
    }
    this.onceEvent[event] = [];
  }

  private static _removeHandler(sourceHandlers: Function[], targetHandler: Function) {
    const idx = sourceHandlers.findIndex(item => {
      return item === targetHandler;
    });
    if (idx >= 0) {
      sourceHandlers.splice(idx, 1);
    }
  }
}
