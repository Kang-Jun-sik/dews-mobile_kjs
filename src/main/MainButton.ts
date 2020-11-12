export class MainButton {
  private _disabled: boolean = false;
  private _hidden: boolean = true;
  onclick: Function;

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

export class MainButtonSet {
  public save = new MainButton();
  public delete = new MainButton();
  public search = new MainButton();
  public add = new MainButton();
  // public more = new MainButton();
}
