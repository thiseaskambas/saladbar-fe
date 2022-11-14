export interface INavItem {
  title: string;
  url: string;
  submenu?: INavSubItem;
  mustBeLoggedIn: boolean;
}

export type INavSubItem = Array<INavItem>;
