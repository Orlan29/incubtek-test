import {CanActivateFn, Router, UrlTree} from "@angular/router";
import {inject} from "@angular/core";
import {AuthService} from "@incubtek/features/auth";

export const authGuard: CanActivateFn = (route, state): boolean | UrlTree => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.currentUser() != null) return true;
  return router.createUrlTree(['/auth']);
}
