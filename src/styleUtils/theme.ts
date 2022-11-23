import { DefaultTheme } from 'styled-components';

const theme: DefaultTheme = {
  colors: {
    blue: '#3D5A80',
    lightBlue: '#98C1D9',
    orange: '#F7882F',
    lightOrange: '#F7B681',
    yellow: '#F7C331',
    lightYellow: '#FDE08E',
    darkBrown: '#DCC7AA',
    mediumBrown: '#E2CEBC',
    lightBrown: '#ede3da',
    white: '#FAFAFF',
  },
  error: {
    color: 'darkGray',
  },
  backDropShadow: {
    webkitboxShadow: '0px 3px 8px 0px rgba(66, 66, 66, 0.64)',
    mozzilaboxShadow: '0px 3px 8px 0px rgba(66, 66, 66, 0.64)',
    boxShadow: '0px 3px 8px 0px rgba(66, 66, 66, 0.64)',
  },
};

export default theme;
