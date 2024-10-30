import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    title: true,
    name: 'Inventario'
  },
  {
    name: 'Listado de Productos',
    url: '/listar-productos',
    iconComponent: { name: 'cil-list' }
  },
  {
    name: 'Crear Productos',
    url: '/product',
    iconComponent: { name: 'cilPlus' }
  }
];
