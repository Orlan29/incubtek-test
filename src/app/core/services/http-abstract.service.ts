import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, Optional, inject } from '@angular/core';
import { Observable } from 'rxjs';
import {ENV_CONFIG, IEnv} from "../../environment.token";
import {LoadingService} from "@incubtek/core/services/loading.service";

@Injectable()
export abstract class HttpAbstractService<TModel = unknown> {
  protected _http = inject(HttpClient);
  protected _loaderService = inject(LoadingService);

  protected constructor(
    @Inject(ENV_CONFIG) @Optional() protected config: IEnv,
    protected _resources: string
  ) {}

  add<TRequest, TResponse>(payload: TRequest): Observable<TResponse> {
    return this._loaderService.enableLoadingUntilCompleted<TResponse>(
      this._http.post<TResponse>(
        `${this.config.apiRoot}/${this._resources}`,
        payload
      )
    );
  }

  findAll<TResponse>(): Observable<TResponse[]> {
    return this._loaderService.enableLoadingUntilCompleted(this._http.get<TResponse[]>(
        `${this.config.apiRoot}/${this._resources}`
      )
    );
  }

  findById<TResponse>(id: string): Observable<TResponse> {
    return this._loaderService.enableLoadingUntilCompleted(this._http.get<TResponse>(
      `${this.config.apiRoot}/${this._resources}/${id}`
    ));
  }

  delete<TResponse>(id: string): Observable<TResponse> {
    return this._loaderService.enableLoadingUntilCompleted(
      this._http.delete<TResponse>(
        `${this.config.apiRoot}/${this._resources}/${id}`
      )
    );
  }

  update<TRequest, TResponse>(
    id: string,
    payload: TRequest
  ): Observable<TResponse> {
    return this._http.put<TResponse>(
      `${this.config.apiRoot}/${this._resources}/${id}`,
      payload
    );
  }
}
