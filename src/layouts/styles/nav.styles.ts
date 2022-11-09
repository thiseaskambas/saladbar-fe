import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
export const StyledUl = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 2rem;
  list-style: none;
`;

export const StyledNavLink = styled(NavLink)`
  text-decoration: none;
`;
