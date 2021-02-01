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

  protected selectElementById(id: string): Element | null {
    let element: Element | null = this.querySelector(`#${id}`) || this.shadowRoot!.querySelector(`#${id}`);

    if (!element) {
      for (let i = 0; i < this.shadowRoot!.children.length; i++) {
        if (this.shadowRoot?.children[i] instanceof DewsComponent) {
          element = (this.shadowRoot?.children[i] as DewsComponent).selectElementById(id);
          if (element) break;
        }
      }
    }

    if (!element) {
      for (let i = 0; i < this.children.length; i++) {
        if (this.children[i] instanceof DewsComponent) {
          element = (this.children[i] as DewsComponent).selectElementById(id);
          if (element) break;
        }
      }
    }

    return element;
  }
}
