import { Routes } from '@angular/router';
import {BuscarProductosComponent} from "./buscar-productos.component";

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./buscar-productos.component').then(m => m.BuscarProductosComponent),
    data: {
      title: $localize`Buscar Productos`
    }
  }
];

