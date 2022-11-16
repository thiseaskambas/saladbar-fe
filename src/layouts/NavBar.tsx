import NavItem from '../components/NavItem';
import { navItems } from '../utils/navItems';
import { INavItem } from '../types/components.types';

import {
  StyledLogoContainer,
  StyledMainUl,
  StyledNav,
} from './styles/navBar.styles';
import { IUser } from '../types/user.types';
import { useEffect, useState } from 'react';
import images from '../assets/index';
import { Link } from 'react-router-dom';

const NavBar = ({ user }: { user: IUser | null }) => {
  const [navItemsState, setNavItems] = useState<INavItem[]>([]);

  useEffect(() => {
    if (!user) {
      const navItemsToMap = navItems.filter((item) => !item.mustBeLoggedIn);
      setNavItems(() => navItemsToMap);
    } else {
      const navItemsToMap = navItems.filter(
        (item) => item.mustBeLoggedIn || item.alwaysShow
      );
      setNavItems(() => navItemsToMap);
    }
  }, [user]);

  return (
    <StyledNav>
      <StyledLogoContainer>
        <Link to="/">
          <img src={images['logo.blue.XS.png']} alt="" />
        </Link>
      </StyledLogoContainer>
      <StyledMainUl>
        {navItemsState.map((item: INavItem) => {
          const depthLevel = 0;
          return (
            <NavItem key={item.title} item={item} depthLevel={depthLevel} />
          );
        })}
      </StyledMainUl>
    </StyledNav>
  );
};

export default NavBar;
