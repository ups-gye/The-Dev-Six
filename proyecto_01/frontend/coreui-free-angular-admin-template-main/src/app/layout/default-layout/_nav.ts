import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    title: true,
    name: 'Inventario'
  },
  {
    name: 'Crear Productos',
    url: '/product',
    iconComponent: { name: 'cilPlus' }
  },
  {
    name: 'Listado de Productos',
    url: '/listar-productos',
    iconComponent: { name: 'cil-list' }
  },
  {
    name: 'Buscar Productos',
    url: '/buscar-productos',
    iconComponent: { name: 'cil-search' }
  }
];
