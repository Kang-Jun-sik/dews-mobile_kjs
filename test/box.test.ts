import { assert, fixture, html } from '@open-wc/testing';
import { Box } from '../src/components/box/box.js';
import '../src/index.js';

suite('Box', () => {
  test('Default Mobile Layout Box test ', async () => {
    const el: Box = await fixture(html` <dews-box></dews-box> `);
    assert.equal(el.title, '');
    assert.equal(el.hide, false);
    // assert.equal(el.expandable, 'true');
  });
  test('Set Box Title ', async () => {
    const el: Box = await fixture(html` <dews-box title="Box"></dews-box> `);
    assert.equal(el.title, 'Box');
  });
  test('Set Box hide ', async () => {
    const el: Box = await fixture(html` <dews-box hide="true"></dews-box> `);
    assert.equal(el.title, '');
    assert.equal(el.hide, true);
    // assert.equal(el.expandable, true);
  });
  test('Set Box click ', async () => {
    const el: Box = await fixture(html` <dews-box title="box"><div style="height: 30px"></div></dews-box> `);
    assert.equal(el.title, 'box');
    // assert.equal(el.expandable, 'true');
    el.shadowRoot!.querySelectorAll('div')[0].querySelectorAll('div')[0].click();
    await el.updateComplete;
    // assert.equal(el.expandable, 'false');
    el.shadowRoot!.querySelectorAll('div')[0].querySelectorAll('div')[0].click();
    await el.updateComplete;
    // assert.equal(el.expandable, 'true');
  });
});
