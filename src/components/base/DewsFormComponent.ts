import { DewsComponent } from './DewsComponent.js';
import { LitElement } from 'lit-element';

/**
 * Form Component 관련
 *  - Checkboxgroup, Text, CheckBox 등등
 */
export abstract class DewsFormComponent extends DewsComponent {
  connectedCallback() {
    super.connectedCallback();
    this.updateComplete.then(async () => {
      const children = this.shadowRoot!.querySelectorAll('*');
      await Promise.all(
        Array.from(children).map(c => {
          if (c instanceof LitElement) {
            return c.updateComplete;
          }
        })
      );
      // console.log(this, 'UpdateComplete');
    });
  }
}
