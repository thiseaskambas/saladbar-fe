import { useState, useEffect, useRef } from 'react';

import { INavItem } from '../utils/types';
import NavDropDown from './NavDropDown';
import { StyledNavLink } from '../layouts/styles/nav.styles';

interface IProps {
  item: INavItem;
  depthLevel: number;
}

const NavItem = ({ item, depthLevel }: IProps) => {
  const [dropdown, setDropdown] = useState(false);
  const ref = useRef<null | HTMLLIElement>(null);

  useEffect(() => {
    const handler = ({ target }: MouseEvent | TouchEvent): void => {
      if (dropdown && ref.current && !ref.current.contains(target as Node)) {
        setDropdown(false);
      }
    };
    document.addEventListener('mousedown', handler);
    document.addEventListener('touchstart', handler);
    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('touchstart', handler);
    };
  }, [dropdown]);

  const onMouseEnter = () => {
    setDropdown(true);
  };

  const onMouseLeave = () => {
    setDropdown(false);
  };

  const closeDropdown = () => {
    dropdown && setDropdown(false);
  };

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
          />
        </>
      ) : (
        <StyledNavLink to={item.url}>{item.title}</StyledNavLink>
      )}
    </li>
  );
};

export default NavItem;
