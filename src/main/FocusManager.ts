export class FocusManager {
  init() {
    console.log('FocusManager');
    window.addEventListener('focused-changed', e => {
      console.log(`main focused changed`);
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      // this.current = e.detail.$target as Area;
      // this.navigationBar.setHeaderTitle(this.current.title);
      // this.buttonTabBar.setCurrentButtonSet(this.current);
    });
  }
}
