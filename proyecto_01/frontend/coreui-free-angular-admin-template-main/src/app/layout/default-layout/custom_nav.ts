// custom-nav-items.ts
import { INavData } from '@coreui/angular';

// Define el tipo CustomNavData con roles opcionales
export interface CustomNavData extends INavData {
  roles?: string[];
}

// Define customNavItems como una constante que usa el tipo CustomNavData[]
export const customNavItems: CustomNavData[] = [
  {
    title: true,
    name: 'Inventario',
    roles: ['admin', 'user'] // Visible para ambos roles
  },
  {
    name: 'Crear Productos',
    url: '/product',
    iconComponent: { name: 'cilPlus' },
    roles: ['admin'] // Solo visible para admin
  },
  {
    name: 'Listado de Productos',
    url: '/listar-productos',
    iconComponent: { name: 'cil-list' },
    roles: ['admin'] // Solo visible para admin
  },
  {
    name: 'Buscar Productos',
    url: '/buscar-productos',
    iconComponent: { name: 'cil-search' },
    roles: ['admin', 'user'] // Visible para ambos roles
  }
];
