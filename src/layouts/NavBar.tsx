import styled from 'styled-components';
import NavItem from '../components/NavItem';
import { navItems } from '../utils/navItems';
import { INavItem } from '../utils/types';

const Ul = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 2rem;
`;

const NavBar = () => {
  return (
    <nav>
      <Ul>
        {navItems.map((item: INavItem) => {
          const depthLevel = 0;
          return (
            <NavItem key={item.title} item={item} depthLevel={depthLevel} />
          );
        })}
      </Ul>
    </nav>
  );
};

export default NavBar;
