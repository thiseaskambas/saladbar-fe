import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const StyledNavLink = styled(NavLink)<{
  issubmenu?: string;
}>`
  border-radius: 0.5rem;
  padding: 0.4rem 1rem;
  font-weight: 300;
  white-space: nowrap;

  &:hover {
    background-color: ${({ theme }) => theme.colors.mediumBrown};
  }
  &:visited {
    color: black;
  }
  &.active {
    background-color: ${({ theme }) => theme.colors.darkBrown};
  }

  ${({ issubmenu, theme }) =>
    issubmenu && {
      padding: '0.5rem 1rem',
      border: 'none',
      borderRadius: '0',
      width: '100%',
      ':hover': {
        backgroundColor: theme.colors.lightBrown,
      },
      '&.active': {
        backgroundColor: 'inherit',
      },
      '&.active:hover': {
        backgroundColor: theme.colors.lightBrown,
      },
    }}
`;

export const StyledLogoutBtn = styled.button`
  border-radius: 0.5rem;
  padding: 0.4rem 1rem;
  font-weight: 300;
  white-space: nowrap;

  &:hover {
    background-color: ${({ theme }) => theme.colors.mediumBrown};
  }
`;

export const StyledOuterSpan = styled.span`
  background-color: ${({ theme }) => theme.colors.orange};
  color: ${({ theme }) => theme.colors.white};
  display: inline-block;
  position: relative;
  font-weight: 600;
  text-align: center;
  border-radius: 0.2rem;
  padding: 0.2rem 0.5rem;
  margin-left: 0.8rem;
`;
