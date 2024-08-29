import { Routes } from '@angular/router';
import {authGuard} from "@incubtek/core/guards/auth.guard";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadComponent: () => import('@incubtek/layout/auth-layout/auth-layout.component')
      .then(c => c.AuthLayoutComponent),
    loadChildren: () => import('@incubtek/features/auth/auth.route')
  },
  {
    path: 'portal',
    loadComponent: () => import('@incubtek/layout/portal-layout/portal-layout.component')
      .then(c => c.PortalLayoutComponent),
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('@incubtek/features/dashboard/dashboard.component')
          .then(c => c.DashboardComponent),
      },
      {
        path: 'warehouses',
        loadComponent: () => import('@incubtek/features/warehouse/container/warehouse-list/warehouse.component')
          .then(c => c.WarehouseComponent),
      }
    ]
  },
];
