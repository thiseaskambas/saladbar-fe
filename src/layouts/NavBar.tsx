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
import { RootState, useAppDispatch } from '../store/store';
import { logUserOut } from '../store/auth.slice';
import { StyledModalCtnDiv } from '../components/styles/modal.styles';
import useMeasure from 'react-use-measure';
import {
  resetNotification,
  setAsyncNotification,
  setNotification,
} from '../store/notification.slice';
import Notification from '../components/Notification';
import { useSelector } from 'react-redux';

const NavBar = ({ user }: { user: IUser | null }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [navRef, { height }] = useMeasure();

  const [navItemsState, setNavItems] = useState<INavItem[]>([]);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const notification = useSelector((state: RootState) => state.notification);
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

  const logoutHandler = async () => {
    try {
      dispatch(setNotification({ text: 'Hang on...', type: 'loading' }));
      await dispatch(logUserOut()).unwrap();
      setIsLogoutModalOpen(false);
      navigate('/login', { replace: true });
      dispatch(resetNotification());
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      dispatch(
        setAsyncNotification({ type: 'error', text: err.message, time: 6 })
      );
    }
  };

  return (
    <StyledNav ref={navRef}>
      <StyledLogoContainer>
        <Link to="/">
          <img src={images['logo.png']} alt="" />
        </Link>
      </StyledLogoContainer>
      <StyledMainUl>
        {navItemsState.map((item: INavItem) => {
          const depthLevel = 0;

          return (
            <NavItem
              key={item.title}
              item={item}
              depthLevel={depthLevel}
              //TODO: find a way to make closeParent optional
              closeParent={() => {
                null;
              }}
              navHeight={height}
            />
          );
        })}
        {user && (
          <StyledLogoutBtn onClick={() => setIsLogoutModalOpen(true)}>
            Logout
          </StyledLogoutBtn>
        )}
      </StyledMainUl>
      <Modal
        open={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        modalTitle="Logout"
      >
        <StyledModalCtnDiv>
          <Notification notification={notification} />
        </StyledModalCtnDiv>

        <LogoutPrompt
          onCancel={() => setIsLogoutModalOpen(false)}
          onLogout={logoutHandler}
        />
      </Modal>
    </StyledNav>
  );
};

export default NavBar;
