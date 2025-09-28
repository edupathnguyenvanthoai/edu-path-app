import type { Theme } from '@mui/material/styles';

import { viVN as coreViVN } from '@mui/material/locale';
import { viVN as pickersViVN } from '@mui/x-date-pickers/locales';
import { createTheme as createMuiTheme } from '@mui/material/styles';

import { shadows } from './core/shadows';
import { palette } from './core/palette';
import { themeConfig } from './theme-config';
import { components } from './core/components';
import { typography } from './core/typography';
import { customShadows } from './core/custom-shadows';

import type { ThemeOptions } from './types';

// ----------------------------------------------------------------------

export const baseTheme: ThemeOptions = {
  colorSchemes: {
    light: {
      palette: palette.light,
      shadows: shadows.light,
      customShadows: customShadows.light,
    },
    dark: {
      palette: palette.dark,
      shadows: shadows.dark,
      customShadows: customShadows.dark,
    },
  },
  components,
  typography,
  shape: { borderRadius: 12 },
  cssVariables: themeConfig.cssVariables,
};

// ----------------------------------------------------------------------

type CreateThemeProps = {
  themeOverrides?: ThemeOptions;
};

export function createTheme({ themeOverrides = {} }: CreateThemeProps = {}): Theme {
  const theme = createMuiTheme(baseTheme, themeOverrides, coreViVN, pickersViVN);

  return theme;
}
