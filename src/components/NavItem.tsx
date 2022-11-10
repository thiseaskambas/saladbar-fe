import React, { useState, useEffect, useRef } from 'react';

import { INavItem } from '../types/types';
import NavDropDown from './NavDropDown';

import { NavLink } from 'react-router-dom';

interface IProps {
  item: INavItem;
  depthLevel: number;
}

const NavItem = ({ item, depthLevel }: IProps) => {
  const [dropdown, setDropdown] = useState(false);
  const [moveLeft, setMoveLeft] = useState(false);
  const ref = useRef<null | HTMLLIElement>(null);

  useEffect(() => {
    const handler = (event: Event): void => {
      //prevent other listeners of the same event from being called.
      event.stopImmediatePropagation();

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
    if (viewportWidth < e.clientX + elWidth) {
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
          <button
            onClick={() => setDropdown((prev) => !prev)}
            aria-expanded={dropdown ? 'true' : 'false'}
          >
            {item.title}
            {depthLevel && depthLevel > 0 ? (
              <span> right </span>
            ) : (
              <span> down </span>
            )}
          </button>
          <NavDropDown
            submenu={item.submenu}
            dropdown={dropdown}
            depthLevel={depthLevel}
            moveLeft={moveLeft}
          />
        </>
      ) : (
        <NavLink to={item.url}>{item.title}</NavLink>
      )}
    </li>
  );
};

export default NavItem;
