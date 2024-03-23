interface Colors {
  black: string;
  secondary: string;
  primary: string;
  info: string;
  error: string;
  gray: Gray;
  background: string;
  white: string;
}

interface Gray {
  dark: string;
  main: string;
  light: string;
}

interface FontSize {
  xl: string;
  lg: string;
  md: string;
  sm: string;
  xs: string;
}

interface FontWeight {
  black: number;
  extraBold: number;
  bold: number;
  regular: number;
}

export type Breakpoints = keyof typeof theme.breakpoints;


export interface CustomTheme {
  colors: Colors;
  fonts: {
    size: FontSize;
    weight: FontWeight;
  };
  breakpoints : Breakpoints;
}

const theme = {
  colors: {
    black: '#161718',
    secondary: {
      main: '#4C9DF8',
      light: '#8DC1FA',
      lighter: '#4C9DF8',
      lightest: '#F8FBFF',
    },
    primary: {
      main: '#334259',
      light: '#7D8695',
    },
    info: {
      main: '#F7C863',
      light: '#FADC9B',
      lighter: '#FDF1D8',
      lightest: '#FFFDF9',
    },
    error: '#E0291D',
    gray: {
      dark: '#a8a9af',
      main: '#c8c9d0',
      light: '#eeeff2',
    },
    background: '#ecf1f6',
    white: '#fcfcfc',
    notice: '#E0291D',
  },
  fonts: {
    size: {
      xl: '50px',
      lg: '32px',
      md: '22px',
      sm: '16px',
      xs: '14px',
    },
    weight: {
      black: 900,
      extraBold: 800,
      bold: 700,
      regular: 400,
    },
  },
  breakpoints: {
    lgWeb: 1920,
    mdWeb: 1399,
    smWeb: 1100,
    tablet: 999,
    mobile: 450,
  },
};

export const device = (device: Breakpoints) =>
  `@media (max-width: ${theme.breakpoints[device]}px)`;
export default theme;
