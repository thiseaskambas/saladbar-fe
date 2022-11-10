import { INavItem } from '../types/types';

export const navItems: Array<INavItem> = [
  { title: 'Home', url: '/' },
  { title: 'Login', url: '/login' },
  { title: 'My Profile', url: '/users/me' },
  { title: 'Dash Board', url: '/main-dash' },
  { title: 'Cart', url: '/carts/current' },
  { title: 'Today', url: '/day-view' },
  {
    title: 'Admin',
    url: '',
    submenu: [
      { title: 'Carts', url: '/carts' },
      { title: 'All users', url: '/users' },
      {
        title: 'Products',
        url: '',
        submenu: [
          { title: 'All Products', url: '/products' },
          { title: 'New Product', url: '/products/create' },
        ],
      },
    ],
  },
];
