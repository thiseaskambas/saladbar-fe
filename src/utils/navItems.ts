import { INavItem } from '../types/components.types';

export const navItems: Array<INavItem> = [
  { title: 'Info', url: '/', mustBeLoggedIn: true, alwaysShow: true },
  { title: 'Login', url: '/login', mustBeLoggedIn: false, alwaysShow: false },
  {
    title: 'Dash Board',
    url: '/dashboard',
    mustBeLoggedIn: true,
  },
  { title: 'Cart', url: '/carts/current', mustBeLoggedIn: true, isCart: true },
  { title: 'Today', url: '/day-view', mustBeLoggedIn: true },
  { title: 'My Profile', url: '/users/me', mustBeLoggedIn: true },
  {
    title: 'Admin',
    url: '',
    mustBeLoggedIn: true,
    mustBeAdmin: true,
    submenu: [
      {
        title: 'Carts',
        url: '/carts',
        mustBeLoggedIn: true,
        mustBeAdmin: true,
      },
      {
        title: 'All users',
        url: '/users',
        mustBeLoggedIn: true,
        mustBeAdmin: true,
      },
      {
        title: 'Products',
        url: '',
        mustBeLoggedIn: true,
        mustBeAdmin: true,
        submenu: [
          {
            title: 'All Products',
            url: '/products',
            mustBeLoggedIn: true,
            mustBeAdmin: true,
          },
          {
            title: 'New Product',
            url: '/products/create',
            mustBeLoggedIn: true,
            mustBeAdmin: true,
          },
        ],
      },
    ],
  },
];
