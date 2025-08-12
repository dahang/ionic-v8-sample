import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'add-account',
    loadComponent: () => import('./pages/add-account/add-account.page').then((m) => m.AddAccountPage),
  },
];
