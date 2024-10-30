import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./listar-productos.component').then(m => m.ListarProductosComponent),
    data: {
      title: $localize`Listar Productos`
    }
  }
];

