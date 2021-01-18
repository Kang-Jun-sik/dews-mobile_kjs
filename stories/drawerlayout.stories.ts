import { html } from 'lit-html';
import '../src/dews-mobile.js';

export default {
  title: 'Drawer-layout'
};

export const DrawerBottom = () => html`
  <div style="width: 360px">
    <drawer-layout active="true"></drawer-layout>
  </div>
`;

export const DrawerRightLarge = () => html`
  <div style="width: 360px">
    <drawer-layout active="true" right="true"></drawer-layout>
  </div>
`;
export const DrawerRightFULL = () => html`
  <div style="width: 360px">
    <drawer-layout active="true" right="true" size="full"></drawer-layout>
  </div>
`;
