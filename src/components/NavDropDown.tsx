import { StyledDropUl } from '../layouts/styles/navBar.styles';
import { INavItem, INavSubItem } from '../types/components.types';
import NavItem from './NavItem';

interface IProps {
  submenu: INavSubItem;
  dropdown: boolean;
  depthLevel: number;
  moveLeft: boolean;
  setDropdown: React.Dispatch<React.SetStateAction<any>>;
}

const NavDropDown = ({
  submenu,
  dropdown,
  depthLevel,
  moveLeft,
  setDropdown,
}: IProps) => {
  depthLevel = depthLevel + 1;

  return (
    <StyledDropUl
      dropdown={dropdown}
      depthLevel={depthLevel}
      moveLeft={moveLeft}
    >
      {submenu.map((item: INavItem) => {
        return (
          <NavItem
            key={item.title}
            item={item}
            depthLevel={depthLevel}
            onClick={() => setDropdown(false)}
          />
        );
      })}
    </StyledDropUl>
  );
};

export default NavDropDown;
