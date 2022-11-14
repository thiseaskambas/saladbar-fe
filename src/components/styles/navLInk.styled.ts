import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const StyledNavLink = styled(NavLink)<{ issubmenu?: string }>`
  ${({ issubmenu }) =>
    !issubmenu && {
      border: '1px',
      borderStyle: 'solid',
      borderRadius: '0.5rem',
      padding: '0.5rem 1rem',
    }}
`;
