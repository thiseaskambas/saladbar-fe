import { DefaultTheme } from 'styled-components';

enum colors {
  PINK = '#F1C2CC',
  PURPLE = '#C9BFFE',
  ORANGE = '#FEE2C7',
  DARKGRAY = '#232227',
  WHITE = '#FFFFFF',
}
enum neobrutalColors {
  ORANGE = '#F4714E',
  GREEN = '#1FA95B',
  MINT = '#B1EBD3',
  PURPLE = '#A49EF8',
  YELLOW = '#FDC62E',
  RED = '#FF2F01',
  DARKGRAY = '#01416',
  WHITE = '#FFFFFF',
}
const theme: DefaultTheme = {
  colors: {
    blue: '#3D5A80',
    skyBlue: '#cae8fa',
    lightBlue: '#98C1D9',
    orange: '#F7882F',
    lightOrange: '#F7B681',
    yellow: '#F7C331',
    lightYellow: '#FDE08E',
    darkBrown: '#DCC7AA',
    mediumBrown: '#E2CEBC',
    lightBrown: '#ede3da',
    white: '#FAFAFF',
    lightGray: '#ebeded',
    gray: '#7d888d',
    newBlue: '#3d91ff',
    lightGreen: '#90EE90',
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
