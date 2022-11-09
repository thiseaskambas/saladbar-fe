import { StyledUl } from '../layouts/styles/nav.styles';
import { INavItem, INavSubItem } from '../utils/types';
import NavItem from './NavItem';

interface IProps {
  submenu: INavSubItem;
  dropdown: boolean;
  depthLevel: number;
}

const NavDropDown = ({ submenu, dropdown, depthLevel }: IProps) => {
  depthLevel = depthLevel + 1;
  return (
    <StyledUl style={{ display: dropdown ? 'block' : 'none' }}>
      {submenu.map((item: INavItem) => {
        return <NavItem key={item.title} item={item} depthLevel={depthLevel} />;
      })}
    </StyledUl>
  );
};

// NOTE: for components which are part of UI that can be opened and closed multiple times by user (e.g. dropdown-menu, tooltips, popovers etc): use CSS hiding/ displaying, possibly with conditionally adding class in react.
// for components rendered and hidden only once (e.g. delete an item from a list, close a one-time modal popup etc): use conditional rendering.

export default NavDropDown;
