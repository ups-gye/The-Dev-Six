import {RouterModule, Routes} from '@angular/router';
import { DefaultLayoutComponent } from './layout';
import {NgModule} from "@angular/core";
import {authGuard} from "./guards/auth.guard";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./views/pages/login/login.component').then(m => m.LoginComponent),
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    loadComponent: () => import('./views/pages/register/register.component').then(m => m.RegisterComponent),
    data: {
      title: 'Register Page'
    }
  },

  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },

    children: [

      {
        path: 'listar-productos',
        loadChildren: () => import('./views/listar-productos/routes').then((m) => m.routes),
        canActivate: [authGuard],
        data: { role: 'admin' } // Solo accesible para administradores

      },
      {
        path: 'product',
        loadChildren: () => import('./views/producto/routes').then((m) => m.routes),
        canActivate: [authGuard],
        data: { role: 'admin' } // Accesible para usuarios y administradores

      },
      {
        path: 'buscar-productos',
        loadChildren: () => import('./views/buscar-productos/routes').then((m) => m.routes),
        canActivate: [authGuard],
        data: { role: ['admin', 'user'] } // Accesible para admin y user

      }
    ]
  },
  {
    path: '404',
    loadComponent: () => import('./views/pages/page404/page404.component').then(m => m.Page404Component),
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    loadComponent: () => import('./views/pages/page500/page500.component').then(m => m.Page500Component),
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    loadComponent: () => import('./views/pages/login/login.component').then(m => m.LoginComponent),
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    loadComponent: () => import('./views/pages/register/register.component').then(m => m.RegisterComponent),
    data: {
      title: 'Register Page'
    }
  },
  { path: '**', redirectTo: 'listar-productos' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking'
      // relativeLinkResolution: 'legacy'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
