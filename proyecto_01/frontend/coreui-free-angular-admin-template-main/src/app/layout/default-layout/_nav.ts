import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    title: true,
    name: 'Inventario'
  },
  {
    name: 'Listar Productos',
    url: '/listar-productos',
    iconComponent: { name: 'cil-pencil' }
  },
  {
    name: 'Notificaciones',
    url: '/notifications',
    iconComponent: { name: 'cil-bell' }
  }
];
