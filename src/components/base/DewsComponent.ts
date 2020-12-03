import { LitElement, PropertyValues } from 'lit-element';
import { getDewsComponentList } from '../dews-component-list.js';

/**
 * 전체 컴포넌트의 상속
 */

export abstract class DewsComponent extends LitElement {
  private isFirstUpdated = true;

  static getRegisteredComponents(): { [key: string]: HTMLElement } {
    const components: { [key: string]: HTMLElement } = {};

    const tagNames = getDewsComponentList();

    for (const tagName of tagNames) {
      components[tagName] = customElements.get(tagName);
    }

    return components;
  }

  protected updated(_changedProperties: PropertyValues) {
    super.updated(_changedProperties);
    if (!this.isFirstUpdated) {
      // 각 컴포넌트에서 리렌더링이 일어날 때 발생하는 이벤트
      this.dispatchEvent(new CustomEvent('setScrollOffset', { bubbles: true, composed: true }));
    }
    this.isFirstUpdated = false;
  }
}
