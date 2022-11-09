import NavItem from '../components/NavItem';
import { navItems } from '../utils/navItems';
import { INavItem } from '../utils/types';

import { StyledUl } from './styles/nav.styles';

const NavBar = () => {
  return (
    <nav>
      <StyledUl>
        {navItems.map((item: INavItem) => {
          const depthLevel = 0;
          return (
            <NavItem key={item.title} item={item} depthLevel={depthLevel} />
          );
        })}
      </StyledUl>
    </nav>
  );
};

export default NavBar;
