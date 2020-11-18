import { AuthenticationManagerInterface } from '../auth/exports.js';

export abstract class SystemEnvironmentsProviderBase {
  protected _auth!: AuthenticationManagerInterface;

  get auth(): AuthenticationManagerInterface {
    return this._auth;
  }

  abstract configure(): Promise<void>;
}
