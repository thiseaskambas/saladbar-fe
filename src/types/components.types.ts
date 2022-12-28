export interface INavItem {
  title: string;
  url: string;
  submenu?: INavSubItem;
  mustBeLoggedIn: boolean;
  mustBeAdmin?: boolean;
  alwaysShow?: boolean;
  isCart?: true;
}

export type INavSubItem = Array<INavItem>;
