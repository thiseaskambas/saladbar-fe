import { RootState } from '../store/store';
import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { INavItem } from '../types/components.types';
import NavDropDown from './NavDropDown';
import { StyledNavButton } from './styles/navButton.styles';
import { StyledNavLink, StyledOuterSpan } from './styles/navLInk.styles';
import images from '../assets';

interface IProps {
  item: INavItem;
  depthLevel: number;
}

const NavItem = ({ item, depthLevel }: IProps) => {
  const [dropdown, setDropdown] = useState(false);
  const [moveLeft, setMoveLeft] = useState(false);
  const ref = useRef<null | HTMLLIElement>(null);

  const cartItemsQuantity = useSelector(
    (state: RootState) => state.cart.totalItems
  );

  useEffect(() => {
    const handler = (event: Event): void => {
      //prevent other listeners of the same event from being called.
      // event.stopImmediatePropagation();
      if (
        dropdown &&
        ref.current &&
        !ref.current.contains(event.target as Node) //type assertion
      ) {
        setDropdown(false);
      }
    };
    document.addEventListener('pointerdown', handler);
    //cleanup on unmount:
    return () => {
      document.removeEventListener('pointerdown', handler);
    };
  }, [dropdown]);

  const onMouseEnter = (e: React.MouseEvent<Element>) => {
    const viewportWidth = window.innerWidth;

    let elWidth = 0;
    if (e.target instanceof Element && e.target.tagName === 'SPAN') {
      if (
        e.target.parentNode instanceof Element &&
        e.target.parentNode.nodeName === 'BUTTON'
      ) {
        elWidth = Number(e.target.parentNode.clientWidth);
      }
    } else if (e.target instanceof Element && e.target.tagName === 'BUTTON') {
      elWidth = Number(e.target.clientWidth);
    }
    if (viewportWidth < e.clientX + 2 * elWidth) {
      setMoveLeft(true);
    } else {
      setMoveLeft(false);
    }
    setDropdown(true);
  };

  const onMouseLeave = () => setDropdown(false);

  const closeDropdown = () => dropdown && setDropdown(false);

  return (
    <li
      ref={ref}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={closeDropdown}
    >
      {item.submenu ? (
        <>
          <StyledNavButton
            onClick={() => setDropdown((prev) => !prev)}
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
          />
        </>
      ) : (
        <StyledNavLink
          to={item.url}
          issubmenu={depthLevel > 0 ? 'submenu' : ''}
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
