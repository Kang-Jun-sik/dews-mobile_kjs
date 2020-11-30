import { AuthenticationManagerInterface } from '../auth/exports.js';
import { GlobalEnvironmentVariablesProvider } from './GlobalEnvironmentVariablesProvider.js';

export abstract class SystemEnvironmentsProvider {
  protected _auth!: AuthenticationManagerInterface;
  protected _variables!: GlobalEnvironmentVariablesProvider;

  get auth(): AuthenticationManagerInterface {
    return this._auth;
  }

  get env(): GlobalEnvironmentVariablesProvider {
    return this._variables;
  }

  abstract configure(): Promise<void>;
}
