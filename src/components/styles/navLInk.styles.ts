import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const StyledLogoutBtn = styled.button`
  border-radius: ${({ theme }) => theme.navLink.borderRadius};
  padding: ${({ theme }) => theme.navLink.padding};
  font-weight: ${({ theme }) => theme.navLink.fontWeight};
  white-space: nowrap;

  background-color: ${({ theme }) => theme.neobrutalColors.DARKGRAY};
  color: ${({ theme }) => theme.neobrutalColors.WHITE};
  &:hover {
    background-color: ${({ theme }) => theme.navLinkBgColor.hover};
  }
`;

export const StyledOuterSpan = styled.span`
  background-color: ${({ theme }) => theme.neobrutalColors.PURPLE};
  border: 2px solid black;
  color: ${({ theme }) => theme.colors.white};
  display: inline-block;
  position: relative;
  font-weight: 600;
  text-align: center;
  padding: 0.2rem 0.5rem;
  margin-left: 0.5rem;
`;

export const StyledNavLi = styled.li`
  display: flex;
`;

export const StyledNavLink = styled(NavLink)<{
  issubmenu?: string;
}>`
  border-radius: ${({ theme }) => theme.navLink.borderRadius};
  padding: ${({ theme }) => theme.navLink.padding};
  font-weight: ${({ theme }) => theme.navLink.fontWeight};
  white-space: nowrap;
  display: flex;
  align-items: center;
  &.active {
    background-color: ${({ theme }) => theme.navLinkBgColor.base};
  }
  &:hover {
    background-color: ${({ theme }) => theme.navLinkBgColor.hover};
    transition: background-color 0.1s ease-in;
  }
  &:visited {
    color: black;
  }
  &:active {
    background-color: ${({ theme }) => theme.navLinkBgColor.active};
    transition: background-color 0.1s ease-in;
  }

  ${({ issubmenu, theme }) =>
    issubmenu && {
      padding: '0.5rem 1rem',
      border: 'none',
      borderRadius: '0',
      width: '100%',
      ':hover': {
        backgroundColor: theme.neobrutalColors.MINT,
      },
      '&.active': {
        backgroundColor: 'inherit',
      },
      '&.active:hover': {
        backgroundColor: theme.neobrutalColors.MINT,
      },
    }}
`;
