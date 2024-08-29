import {InjectionToken} from "@angular/core";
import {environment} from "../environments/environment.development";

export interface IEnv {
  production: boolean;
  apiRoot: string;
  localServer: string;
}

export const ENV_CONFIG = new InjectionToken<IEnv>('Application environment config', {
  providedIn: 'root',
  factory: () => environment
});
