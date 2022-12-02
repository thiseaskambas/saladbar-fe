import { StyledDropUl } from '../layouts/styles/navBar.styles';
import { INavItem, INavSubItem } from '../types/components.types';
import NavItem from './NavItem';

interface IProps {
  submenu: INavSubItem;
  dropdown: boolean;
  depthLevel: number;
  moveLeft: boolean;
}

const NavDropDown = ({ submenu, dropdown, depthLevel, moveLeft }: IProps) => {
  depthLevel = depthLevel + 1;
  return (
    <StyledDropUl
      dropdown={dropdown}
      depthLevel={depthLevel}
      moveLeft={moveLeft}
    >
      {submenu.map((item: INavItem) => {
        return <NavItem key={item.title} item={item} depthLevel={depthLevel} />;
      })}
    </StyledDropUl>
  );
};

export default NavDropDown;
