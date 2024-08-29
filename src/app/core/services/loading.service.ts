import {computed, Injectable, signal} from "@angular/core";
import {finalize, mergeMap, Observable, of, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private readonly _isLoading = signal(false);
  public readonly isLoading = computed(() => this._isLoading());

  start() {
    this._isLoading.set(true);
  }

  enableLoadingUntilCompleted<T>(observable$: Observable<T>) {
    return of().pipe(
      tap(_ => this.start()),
      mergeMap(_ => observable$),
      finalize(() => this.stop())
    );
  }

  stop() {
    this._isLoading.set(false);
  }
}
