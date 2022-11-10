import NavItem from '../components/NavItem';
import { navItems } from '../utils/navItems';
import { INavItem } from '../types/types';

import { StyledMainUl } from './styles/navBar.styles';

const NavBar = () => {
  return (
    <nav>
      <StyledMainUl>
        {navItems.map((item: INavItem) => {
          const depthLevel = 0;
          return (
            <NavItem key={item.title} item={item} depthLevel={depthLevel} />
          );
        })}
      </StyledMainUl>
    </nav>
  );
};

export default NavBar;
