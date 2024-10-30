import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./producto.component').then(m => m.ProductoComponent),
    data: {
      title: $localize`Productos`
    }
  }
];

