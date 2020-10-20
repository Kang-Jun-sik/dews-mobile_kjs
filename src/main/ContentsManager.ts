export class ContentsManager {
  private $contents: HTMLElement | null;

  constructor() {
    console.log(`NavigationBar`);

    window.addEventListener('onLoadPage', e => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      const param = e.detail;
      this.appendCustomElement(param);
    });

    window.addEventListener('onHistoryBack', e => {
      console.log(`history back`);
      // history manager
      this.removeLastCustomElement();
    });
  }

  appendCustomElement(param) {
    const tag = `page-${param.menuId.toLowerCase()}`;
    const createCustomTag = document.createElement(tag);
    createCustomTag.setAttribute('id', tag);
    this.$contents.querySelector('#contents').appendChild(createCustomTag);
  }

  removeLastCustomElement() {
    const $contents = this.$contents.querySelector('#contents');
    $contents.removeChild($contents.lastChild);
  }
}
