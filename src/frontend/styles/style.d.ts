import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      otelBlue: string;
      otelYellow: string;
      otelGray: string;
      otelRed: string;
      backgroundGray: string;
      lightBorderGray: string;
      borderGray: string;
      textGray: string; 
      textLightGray: string;
      white: string;
    };
    sizes: {
      mLarge: string;
      mxLarge: string;
      mMedium: string;
      mSmall: string;
      dLarge: string;
      dxLarge: string;
      dMedium: string;
      dSmall: string;
      nano: string;
    };
    breakpoints: {
      desktop: string;
    };
    fonts: {
      bold: string;
      regular: string;
      semiBold: string;
      light: string;
    };
  }
}
