import type { Theme } from '@mui/material/styles';

export const getTextColor = (bgcolor?: string) =>
  bgcolor
    ? (t: Theme) => {
        try {
          return t.palette.getContrastText(bgcolor);
        } catch {
          return 'inherit';
        }
      }
    : undefined;

export const bgGradient = (listColor: string[] = [], rotate: number = 45) =>
  `linear-gradient(${rotate}deg, ${listColor.filter(Boolean).join(',')})`;
