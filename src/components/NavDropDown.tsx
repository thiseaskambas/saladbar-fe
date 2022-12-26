import { StyledDropUl } from '../layouts/styles/navBar.styles';
import { INavItem, INavSubItem } from '../types/components.types';
import NavItem from './NavItem';

interface IProps {
  submenu: INavSubItem;
  dropdown: boolean;
  depthLevel: number;
  moveLeft: boolean;
  setDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  closeParent: () => void;
  moveFromTop?: number;
}

const NavDropDown = ({
  submenu,
  dropdown,
  depthLevel,
  moveLeft,
  setDropdown,
  closeParent,
  moveFromTop,
}: IProps) => {
  depthLevel = depthLevel + 1;
  return (
    <StyledDropUl
      dropdown={dropdown}
      depthLevel={depthLevel}
      moveLeft={moveLeft}
      moveFromTop={moveFromTop}
    >
      {submenu.map((item: INavItem) => {
        return (
          <NavItem
            key={item.title}
            item={item}
            depthLevel={depthLevel}
            closeParent={() => {
              setDropdown(false), closeParent();
            }}
          />
        );
      })}
    </StyledDropUl>
  );
};

export default NavDropDown;
