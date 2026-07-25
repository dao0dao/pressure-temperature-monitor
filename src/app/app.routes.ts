import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';
import { logInGuard } from './core/auth/log-in.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [logInGuard],
    loadComponent: () => import('./components/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'monitor',
    canActivate: [authGuard],
    loadComponent: () => import('./components/monitor/monitor.component').then((m) => m.MonitorComponent),
  },
  {
    path: 'add-data',
    canActivate: [authGuard],
    loadComponent: () => import('./components/add-data/add-data.component').then((m) => m.AddDataComponent),
  },
  { path: '**', redirectTo: '' },
];