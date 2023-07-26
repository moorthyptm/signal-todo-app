import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.component'),
  },
  {
    path: 'manage',
    loadComponent: () => import('./manage/manage.component'),
  },
  {
    path: 'list',
    loadComponent: () => import('./list/list.component'),
  },
];
