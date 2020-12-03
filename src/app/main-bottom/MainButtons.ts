import { injectable } from 'tsyringe';

export class MainButton {
  private _disabled = false;
  private _hidden = true;
  private _onclick: Function | undefined;

  public get hidden(): boolean {
    return this._hidden;
  }

  public set onclick(handler: (e?: Event) => {}) {
    this._onclick = handler;
  }

  click(): void {
    if (this.onclick) {
      this.onclick();
    } else {
      console.log(this);
    }
  }

  show() {
    this._hidden = false;
  }

  hide() {
    this._hidden = true;
  }

  public disable(state: boolean) {
    this._disabled = state;
  }

  get disabled(): boolean {
    return this._disabled;
  }
}

@injectable()
export class MainButtonSet {
  public save = new MainButton();
  public delete = new MainButton();
  public search = new MainButton();
  public add = new MainButton();

  public getMainButtonByType(type: string): MainButton {
    let result: MainButton;
    switch (type) {
      case 'save':
        result = this.save;
        break;
      case 'delete':
        result = this.delete;
        break;
      case 'search':
        result = this.search;
        break;
      case 'add':
        result = this.add;
        break;
    }

    return result!;
  }
}
