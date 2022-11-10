export interface INavItem {
  title: string;
  url: string;
  submenu?: INavSubItem;
}

export type INavSubItem = Array<INavItem>;
