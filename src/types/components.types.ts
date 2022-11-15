export interface INavItem {
  title: string;
  url: string;
  submenu?: INavSubItem;
  mustBeLoggedIn: boolean;
  alwaysShow?: boolean;
}

export type INavSubItem = Array<INavItem>;
