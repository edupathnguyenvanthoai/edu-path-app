import type { BoxProps } from '@mui/material';

import { useRef, useEffect } from 'react';

import { Box, Stack, ButtonBase, FormControl, FormHelperText } from '@mui/material';

import { Iconify } from '../iconify';
import { solarIcons } from './icon-solar';

import type { IconifyName } from '../iconify';

type IconFieldProps = {
  value?: IconifyName;
  onChange: (color: IconifyName) => void;
  columns?: number;
  error?: boolean;
  helperText?: string;
  sx?: BoxProps['sx'];
};
export default function IconField({
  value,
  onChange,
  columns = 6,
  error,
  helperText,
  sx,
}: IconFieldProps) {
  const ref = useRef<Record<string, HTMLElement>>({});
  const autoScroll = useRef(true);
  useEffect(() => {
    if (value && ref.current[value] && autoScroll.current) {
      ref.current[value].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      autoScroll.current = false;
    }
  }, [value]);
  const keys = Object.keys(solarIcons) as (keyof typeof solarIcons)[];
  return (
    <FormControl>
      <Box
        sx={{
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
          '&::-webkit-scrollbar': { display: 'none' },
          ...(error && { outline: 1, outlineColor: 'error.main', borderRadius: 1 }),
          ...sx,
        }}
      >
        <Stack
          direction="row"
          sx={{
            '&>*': {
              flex: `0 0 ${100 / columns}%`,
              borderRadius: 1,
              scrollSnapAlign: 'start',
            },
          }}
        >
          {keys.map((icon) => (
            <Box
              key={icon}
              ref={(r: HTMLElement) => {
                if (r) ref.current[icon] = r;
              }}
              sx={{
                aspectRatio: '1 / 1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ButtonBase
                className={icon === value ? 'active' : ''}
                sx={{
                  height: 40,
                  width: 40,
                  borderRadius: 1.5,
                  transition: 'all 0.2s',
                  '&.active': {
                    bgcolor: (t) => t.vars.palette.primary.main,
                    color: (t) => t.vars.palette.primary.contrastText,
                  },
                }}
                onClick={() => {
                  onChange(icon);
                  autoScroll.current = false;
                }}
              >
                <Iconify width={20} icon={icon} />
              </ButtonBase>
            </Box>
          ))}
        </Stack>
      </Box>
      {helperText && <FormHelperText error={error}>{helperText}</FormHelperText>}
    </FormControl>
  );
}
