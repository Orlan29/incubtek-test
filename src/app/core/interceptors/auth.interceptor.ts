import {HttpHandlerFn, HttpRequest} from "@angular/common/http";
import {inject} from "@angular/core";
import {Router} from "@angular/router";

export const authInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const token = localStorage.getItem('token');

  if (token) {
    const clonedRequest = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
    return next(clonedRequest);
  } else {
    inject(Router).createUrlTree(['/login']);
    return next(req);
  }
}
