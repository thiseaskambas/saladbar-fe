import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import NavItem from '../components/NavItem';
import { navItems } from '../utils/navItems';
import { INavItem } from '../types/components.types';
import {
  StyledLogoContainer,
  StyledMainUl,
  StyledNav,
} from './styles/navBar.styles';
import { IUser } from '../types/user.types';
import images from '../assets/index';
import { StyledLogoutBtn } from '../components/styles/navLInk.styles';
import Modal from '../components/Modal';
import LogoutPrompt from '../components/LogoutPrompt';
import { useAppDispatch } from '../store/store';
import { logUserOut } from '../store/auth.slice';

const NavBar = ({ user }: { user: IUser | null }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [navItemsState, setNavItems] = useState<INavItem[]>([]);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

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

  const logoutHandler = () => {
    dispatch(logUserOut())
      .then(() => setIsLogoutModalOpen(false))
      .then(() => navigate('/', { replace: true }));
  };

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
        {user && (
          <StyledLogoutBtn onClick={() => setIsLogoutModalOpen(true)}>
            LOGOUT
          </StyledLogoutBtn>
        )}
        <Modal
          open={isLogoutModalOpen}
          onClose={() => setIsLogoutModalOpen(false)}
        >
          <LogoutPrompt
            onCancel={() => setIsLogoutModalOpen(false)}
            onLogout={logoutHandler}
          />
        </Modal>
      </StyledMainUl>
    </StyledNav>
  );
};

export default NavBar;
