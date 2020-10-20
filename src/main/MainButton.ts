export class MainButton {
  private _hidden: boolean = false;
  // public on(name: string, )

  show() {
    this._hidden = false;
  }

  hide() {
    this._hidden = true;
  }
}

export class MainButtonSet {
  public more = new MainButton();
  public add = new MainButton();
  public search = new MainButton();
  public delete = new MainButton();
  public save = new MainButton();
}
