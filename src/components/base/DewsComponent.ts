import { LitElement } from 'lit-element';
import { getDewsComponentList } from '../dews-component-list.js';

/**
 * 전체 컴포넌트의 상속
 */

export abstract class DewsComponent extends LitElement {
  static getRegisteredComponents(): { [key: string]: HTMLElement } {
    const components: { [key: string]: HTMLElement } = {};

    const tagNames = getDewsComponentList();

    for (const tagName of tagNames) {
      components[tagName] = customElements.get(tagName);
    }

    return components;
  }
}
