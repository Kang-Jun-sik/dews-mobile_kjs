import { assert, fixture, html } from '@open-wc/testing';
import { AreaPanel } from '../src/components/areapanel/areapanel.js';
import '../src/index.js';

suite('AreaPanel & AreaItem', () => {
  test('Default Mobile Layout AreaPanel test ', async () => {
    const el: AreaPanel = await fixture(
      html`
        <dews-area-panel>
          <area-item col="6">
            <dews-area-panel> </dews-area-panel>
          </area-item>
        </dews-area-panel>
      `,
    );
  });
  test('Default Mobile Layout AreaItem test ', async () => {
    const el: AreaPanel = await fixture(html`<area-item></area-item>`);
  });
});
