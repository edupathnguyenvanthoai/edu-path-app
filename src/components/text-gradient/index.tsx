import type { Theme, BoxProps } from '@mui/material';

import tinycolor from 'tinycolor2';

import { Box, keyframes } from '@mui/material';

const bgradient = keyframes`
 0% { background-position: 0% 50% }
 50% { background-position: 200% 50% }
 100% { background-position: 0% 50% }
 `;

export default function TextGradient({ children, ...props }: BoxProps) {
  const colors = (t: Theme) => {
    const base = t.palette.primary.main;
    const spinVal =
      tinycolor(t.palette.primary.contrastText).toHexString() === '#000000' ? -60 : 60;
    return [
      base,
      tinycolor(base).spin(spinVal).toHexString(),
      base,
      tinycolor(base)
        .spin(spinVal + 5)
        .toHexString(),
      base,
      tinycolor(base).spin(spinVal).toHexString(),
    ];
  };
  return (
    <Box
      component="span"
      {...props}
      sx={{
        backgroundImage: (t) => `linear-gradient(300deg, ${colors(t).join(',')}, ${colors(t)[0]})`,
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        backgroundSize: '400%',
        WebkitTextFillColor: 'transparent',
        animation: `${bgradient} 10s ease-in-out infinite`,
        fontWeight: (t) => t.typography.fontWeightBold,
        ...props.sx,
      }}
    >
      {children}
    </Box>
  );
}
