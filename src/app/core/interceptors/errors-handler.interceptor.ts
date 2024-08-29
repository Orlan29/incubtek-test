import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest
} from "@angular/common/http";
import {catchError, throwError} from "rxjs";

export const errorsHandlerInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  return next(req).pipe(
    catchError(error => {
      if (error.error instanceof ErrorEvent || error.error  instanceof HttpErrorResponse) {
        // Client-side or network or sever-side error occurred
        return throwError(() => error.error);
      }
      // Return an observable with a user-facing error message.
      return throwError(() => error.error);
    })
  );
}
