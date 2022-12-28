import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import LogoutPrompt from '../components/LogoutPrompt';
import Modal from '../components/Modal';
import Notification from '../components/Notification';
import { StyledModalCtnDiv } from '../components/styles/modal.styles';
import { StyledLogoutBtn } from '../components/styles/navLInk.styles';
import { logUserOut } from '../store/auth.slice';
import {
  resetNotification,
  setAsyncNotification,
  setNotification,
} from '../store/notification.slice';
import { RootState, useAppDispatch } from '../store/store';
import { INavItem } from '../types/components.types';
import { IUser } from '../types/user.types';
import { navItems } from '../utils/navItems';
import {
  StyledMobileLi,
  StyledMobileLogoutBtn,
  StyledMobileNav,
  StyledMobileNavLink,
  StyledMobileUl,
} from './styles/mobileNavBar.styles';

const MobileNavBar = ({ user }: { user: IUser | null }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [navItemsState, setNavItems] = useState<INavItem[]>([]);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const notification = useSelector((state: RootState) => state.notification);

  const temp: INavItem[] = [];
  const flattenNavItems = (arr: INavItem[]) => {
    arr.forEach((item) => {
      const { submenu } = item;
      submenu ? flattenNavItems(submenu) : temp.push(item);
    });
    return temp;
  };

  useEffect(() => {
    if (!user) {
      const navItemsToMap = navItems.filter((item) => !item.mustBeLoggedIn);
      setNavItems(() => navItemsToMap);
    } else {
      const navItemsToMap = flattenNavItems(navItems).filter(
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
      navigate('/', { replace: true });
      dispatch(resetNotification());
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      dispatch(
        setAsyncNotification({ type: 'error', text: err.message, time: 6 })
      );
    }
  };

  return (
    <>
      <StyledMobileNav>
        <StyledMobileUl>
          {navItemsState.map((item) =>
            item.mustBeAdmin && user?.role === 'user' ? null : (
              <StyledMobileLi key={item.title}>
                <StyledMobileNavLink to={item.url}>
                  {item.title}
                </StyledMobileNavLink>
              </StyledMobileLi>
            )
          )}
          {user && (
            <StyledMobileLogoutBtn onClick={() => setIsLogoutModalOpen(true)}>
              Logout
            </StyledMobileLogoutBtn>
          )}
        </StyledMobileUl>
      </StyledMobileNav>
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
    </>
  );
};

export default MobileNavBar;
