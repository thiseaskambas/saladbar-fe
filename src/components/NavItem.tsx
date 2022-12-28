import React, { useState, useEffect, useRef } from 'react';

import { RootState } from '../store/store';
import useMeasure from 'react-use-measure';
import { useSelector } from 'react-redux';
import { INavItem } from '../types/components.types';
import NavDropDown from './NavDropDown';
import { StyledNavButton } from './styles/navButton.styles';
import {
  StyledNavLi,
  StyledNavLink,
  StyledOuterSpan,
} from './styles/navLInk.styles';
import images from '../assets';

interface IProps {
  item: INavItem;
  depthLevel: number;
  closeParent: () => void;
  navHeight?: number;
}

const NavItem = ({ item, depthLevel, closeParent, navHeight }: IProps) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [dropdown, setDropdown] = useState(false);
  const [moveLeft, setMoveLeft] = useState(false);
  const [btnMeasureRef, btnBounds] = useMeasure();
  const liRef = useRef<null | HTMLLIElement>(null);

  const cartItemsQuantity = useSelector(
    (state: RootState) => state.cart.totalItems
  );

  useEffect(() => {
    const handler = (event: Event): void => {
      if (
        dropdown &&
        liRef.current &&
        !liRef.current.contains(event.target as Node)
      ) {
        setDropdown(false);
      }
    };
    document.addEventListener('pointerdown', handler);

    return () => {
      document.removeEventListener('pointerdown', handler);
    };
  }, [dropdown]);

  const clickHandler = () => {
    const viewportWidth = window.innerWidth;

    if (viewportWidth < btnBounds.x + btnBounds.width * 2) {
      setMoveLeft(true);
    } else {
      setMoveLeft(false);
    }
    setDropdown((prev) => !prev);
  };

  return (
    <StyledNavLi ref={liRef}>
      {item.mustBeAdmin && user?.role === 'user' ? null : item.submenu ? (
        <>
          <StyledNavButton
            ref={btnMeasureRef}
            onClick={clickHandler}
            aria-expanded={dropdown ? 'true' : 'false'}
          >
            {item.title}
            {depthLevel && depthLevel > 0 ? (
              <img src={images['right.XS.png']} />
            ) : (
              <img src={images['drop.XS.png']} />
            )}
          </StyledNavButton>
          <NavDropDown
            submenu={item.submenu}
            dropdown={dropdown}
            depthLevel={depthLevel}
            moveLeft={moveLeft}
            setDropdown={setDropdown}
            closeParent={closeParent}
            moveFromTop={navHeight}
          />
        </>
      ) : (
        <StyledNavLink
          to={item.url}
          issubmenu={depthLevel > 0 ? 'submenu' : ''}
          onClick={() => {
            closeParent && closeParent();
          }}
        >
          {' '}
          {item.title}
          {item.isCart && (
            <StyledOuterSpan>
              {'  '}
              {cartItemsQuantity}
            </StyledOuterSpan>
          )}
        </StyledNavLink>
      )}
    </StyledNavLi>
  );
};

export default NavItem;
