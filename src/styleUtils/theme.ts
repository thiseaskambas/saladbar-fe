import 'styled-components';
import { DefaultTheme } from 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: typeof colors;
    backDropShadow: typeof backDropShadow;
    neobrutalColors: typeof neobrutalColors;
    paleBrutalColors: typeof paleBrutalColors;
    styledNav: typeof styledNav;
    navLink: typeof navLink;
    navLinkBgColor: typeof navLinkBgColor;
    productCard: typeof productCard;
    createShadow: (
      x: number,
      y: number,
      blur: number,
      spread: number,
      color: neobrutalColors
    ) => string;
    customColor: () => neobrutalColors;
  }
}

enum colors {
  blue = '#3D5A80',
  skyBlue = '#cae8fa',
  lightBlue = '#98C1D9',
  orange = '#F7882F',
  lightOrange = '#F7B681',
  yellow = '#F7C331',
  lightYellow = '#FDE08E',
  darkBrown = '#DCC7AA',
  mediumBrown = '#E2CEBC',
  lightBrown = '#ede3da',
  white = '#FAFAFF',
  lightGray = '#ebeded',
  gray = '#7d888d',
  newBlue = '#3d91ff',
  lightGreen = '#90EE90',
}

enum backDropShadow {
  webkitboxShadow = '0px 3px 8px 0px rgba(66, 66, 66, 0.64)',
  mozzilaboxShadow = '0px 3px 8px 0px rgba(66, 66, 66, 0.64)',
  boxShadow = '0px 3px 8px 0px rgba(66, 66, 66, 0.64)',
}

const createShadow = (
  x: number,
  y: number,
  blur: number,
  spread: number,
  color: neobrutalColors
) => `${x}px ${y}px ${blur}px ${spread}px ${color}`;

const customColor = (): neobrutalColors => {
  const values = Object.values(neobrutalColors);
  const max = values.length;
  const random = Math.floor(Math.random() * max);
  if (
    values[random] !== neobrutalColors.WHITE &&
    values[random] !== neobrutalColors.DARKGRAY
  ) {
    return values[random];
  } else {
    return customColor();
  }
};

enum paleBrutalColors {
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
  DARKGRAY = '#0C1416',
  WHITE = '#FFFFFF',
}

enum styledNav {
  padding = 0,
  backgroundColor = neobrutalColors.WHITE,
}

enum productCard {
  borderRadius = '0rem',
  backgroundColor = '#FFFFFF',
  padding = '0',
  border = '3px solid #0C1416',
}

enum navLinkBgColor {
  base = neobrutalColors.WHITE,
  hover = neobrutalColors.DARKGRAY,
  active = neobrutalColors.GREEN,
}

enum navLink {
  borderRadius = '0',
  padding = '0 2rem',
  fontWeight = 300,
}

const theme: DefaultTheme = {
  neobrutalColors,
  colors,
  backDropShadow,
  paleBrutalColors,
  styledNav,
  navLink,
  navLinkBgColor,
  productCard,
  createShadow,
  customColor,
};

export default theme;
