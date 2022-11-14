import NavItem from '../components/NavItem';
import { navItems } from '../utils/navItems';
import { INavItem } from '../types/components.types';

import { StyledMainUl } from './styles/navBar.styles';
import { IUser } from '../types/user.types';
import { useEffect, useState } from 'react';

const NavBar = ({ user }: { user: IUser | null }) => {
  const [navItemsState, setNavItems] = useState<INavItem[]>([]);

  useEffect(() => {
    if (!user) {
      const navItemsToMap = navItems.filter((item) => !item.mustBeLoggedIn);
      setNavItems(() => navItemsToMap);
    } else {
      const navItemsToMap = navItems.filter((item) => item.mustBeLoggedIn);
      setNavItems(() => navItemsToMap);
    }
  }, [user]);

  return (
    <nav>
      <StyledMainUl>
        {navItemsState.map((item: INavItem) => {
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
