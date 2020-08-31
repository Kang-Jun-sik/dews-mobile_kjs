import { html, fixture, expect } from '@open-wc/testing';

import { DewsMobile } from '../src/DewsMobile.js';
import '../index.js';

/**
 * OpenWC Default Element Test
 */
describe('DewsMobile', () => {
  it('has a default title "Hey there" and counter 5', async () => {
    const el: DewsMobile = await fixture(html` <dews-mobile></dews-mobile> `);

    expect(el.title).to.equal('Hey there');
    expect(el.counter).to.equal(5);
  });

  it('increases the counter on button click', async () => {
    const el: DewsMobile = await fixture(html` <dews-mobile></dews-mobile> `);
    el.shadowRoot!.querySelector('button')!.click();

    expect(el.counter).to.equal(6);
  });

  it('can override the title via attribute', async () => {
    const el: DewsMobile = await fixture(html`
      <dews-mobile title="attribute title"></dews-mobile>
    `);

    expect(el.title).to.equal('attribute title');
  });

  it('passes the a11y audit', async () => {
    const el: DewsMobile = await fixture(html` <dews-mobile></dews-mobile> `);

    await expect(el).shadowDom.to.be.accessible();
  });
});
