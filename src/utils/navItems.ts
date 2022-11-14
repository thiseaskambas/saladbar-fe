import { INavItem } from '../types/components.types';

export const navItems: Array<INavItem> = [
  { title: 'Home', url: '/', mustBeLoggedIn: false },
  { title: 'Login', url: '/login', mustBeLoggedIn: false },
  { title: 'My Profile', url: '/users/me', mustBeLoggedIn: true },
  { title: 'Dash Board', url: '/dashboard', mustBeLoggedIn: true },
  { title: 'Cart', url: '/carts/current', mustBeLoggedIn: true },
  { title: 'Today', url: '/day-view', mustBeLoggedIn: true },
  { title: 'Logout', url: '/logout', mustBeLoggedIn: true },
  {
    title: 'Admin',
    url: '',
    mustBeLoggedIn: true,
    submenu: [
      { title: 'Carts', url: '/carts', mustBeLoggedIn: true },
      { title: 'All users', url: '/users', mustBeLoggedIn: true },
      {
        title: 'Products',
        url: '',
        mustBeLoggedIn: true,
        submenu: [
          { title: 'All Products', url: '/products', mustBeLoggedIn: true },
          {
            title: 'New Product',
            url: '/products/create',
            mustBeLoggedIn: true,
          },
        ],
      },
    ],
  },
];
