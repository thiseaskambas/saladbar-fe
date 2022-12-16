import React, { useState, useEffect, useRef } from 'react';

import { RootState } from '../store/store';
import useMeasure from 'react-use-measure';
import { useSelector } from 'react-redux';
import { INavItem } from '../types/components.types';
import NavDropDown from './NavDropDown';
import { StyledNavButton } from './styles/navButton.styles';
import { StyledNavLink, StyledOuterSpan } from './styles/navLInk.styles';
import images from '../assets';

interface IProps {
  item: INavItem;
  depthLevel: number;
  onClick?: () => void;
}

const NavItem = ({ item, depthLevel, onClick }: IProps) => {
  const [btnMeasureRef, btnBounds] = useMeasure();
  const [dropdown, setDropdown] = useState(false);
  const [moveLeft, setMoveLeft] = useState(false);
  const localRef = useRef<null | HTMLLIElement>(null);

  const cartItemsQuantity = useSelector(
    (state: RootState) => state.cart.totalItems
  );

  useEffect(() => {
    const handler = (event: Event): void => {
      if (
        dropdown &&
        localRef.current &&
        !localRef.current.contains(event.target as Node)
      ) {
        setDropdown(false);
      }
    };
    document.addEventListener('pointerdown', handler);

    return () => {
      document.removeEventListener('pointerdown', handler);
    };
  }, [dropdown]);

  const clickHandler = (e: React.MouseEvent<Element>) => {
    const viewportWidth = window.innerWidth;
    const elWidth = btnBounds.width;
    if (viewportWidth < e.clientX + 2 * elWidth) {
      setMoveLeft(true);
    } else {
      setMoveLeft(false);
    }
    setDropdown((prev) => !prev);
  };

  return (
    <li ref={localRef}>
      {item.submenu ? (
        <>
          <StyledNavButton
            ref={btnMeasureRef}
            onClick={clickHandler}
            aria-expanded={dropdown ? 'true' : 'false'}
          >
            {item.title.toUpperCase()}
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
          />
        </>
      ) : (
        <StyledNavLink
          to={item.url}
          issubmenu={depthLevel > 0 ? 'submenu' : ''}
          onClick={onClick}
        >
          {' '}
          {item.title.toUpperCase()}
          {item.isCart && (
            <StyledOuterSpan>
              {'  '}
              {cartItemsQuantity}
            </StyledOuterSpan>
          )}
        </StyledNavLink>
      )}
    </li>
  );
};

export default NavItem;
