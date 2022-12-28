import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const StyledMobileNav = styled.nav`
  top: 0;
  z-index: 1;
  width: 100%;
  display: flex;
  background-color: ${({ theme }) => theme.neobrutalColors.DARKGRAY};
  color: ${({ theme }) => theme.neobrutalColors.WHITE};
  border-bottom: ${({ theme }) => theme.borders.standard};
  flex-wrap: nowrap;
  white-space: nowrap;
`;

export const StyledMobileUl = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  flex-wrap: nowrap;
  overflow-x: scroll;
  padding: 0 1rem;
`;

export const StyledNestUl = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
`;

export const StyledMobileLi = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
`;
export const StyledSubTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  white-space: nowrap;
`;

export const StyledMobileNavLink = styled(NavLink)`
  font-weight: ${({ theme }) => theme.navLink.fontWeight};
  white-space: nowrap;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: font-weight 0.1s ease-in-out;
  padding: 1rem;
  &:hover {
    background-color: ${({ theme }) => theme.neobrutalColors.WHITE};
    color: ${({ theme }) => theme.neobrutalColors.DARKGRAY};
    transition: background-color 0.1s ease-in;
  }
  &:visited {
    color: white;
  }
  &:visited:hover {
    background-color: ${({ theme }) => theme.neobrutalColors.WHITE};
    color: ${({ theme }) => theme.neobrutalColors.DARKGRAY};
    transition: background-color 0.1s ease-in;
  }
  &:active {
    font-weight: 500;
    transition: font-weight 0.1s ease-in-out;
  }
`;
