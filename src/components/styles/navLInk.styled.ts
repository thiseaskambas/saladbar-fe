import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const StyledNavLink = styled(NavLink)<{
  issubmenu?: string;
}>`
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  font-weight: 300;

  &:hover {
    background-color: ${({ theme }) => theme.colors.mediumBrown};
  }
  &.active {
    background-color: ${({ theme }) => theme.colors.darkBrown};
    font-weight: 400;
    color: red;
  }
  &:visited {
    color: black;
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
