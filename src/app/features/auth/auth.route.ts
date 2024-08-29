import {Routes} from "@angular/router";

const authRoute: Routes = [
  {
    path: 'login',
    loadComponent: () => import('@incubtek/features/auth/containers/login/login.component')
    .then(c => c.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () => import('@incubtek/features/auth/containers/register/register.component')
      .then(c => c.RegisterComponent),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
]

export default authRoute;
