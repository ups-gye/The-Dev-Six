import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;
  const router = inject(Router);

  // Verificar si el token y el usuario existen
  if (token && user) {
    const userRole = user.role.toLowerCase();
    const requiredRoles = route.data['role'] as string[]; // Los roles permitidos pueden ser un array

    // Si el rol del usuario es "admin", permitir acceso a todas las rutas
    if (userRole === 'admin') {
      return true;
    }

    // Si el rol del usuario es "user", permitir acceso solo si la ruta lo especifica
    if (userRole === 'user' && requiredRoles?.includes('user')) {
      return true;
    }
  }

  // Si no se cumple la validación, redirigir al login
  router.navigate(['/login']);
  return false;
};
