import { useRef, useEffect } from 'react';

import { Box, Stack, ButtonBase } from '@mui/material';

import { Iconify } from '../iconify';
import { COLOR_SET } from './color-set';

type ColorFieldProps = {
  value?: string;
  onChange: (color: string) => void;
  columns?: number;
};
export default function ColorField({ value, onChange, columns = 6 }: ColorFieldProps) {
  const ref = useRef<Record<string, HTMLElement>>({});
  const autoScroll = useRef(true);
  useEffect(() => {
    if (value && ref.current[value] && autoScroll.current) {
      ref.current[value].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      autoScroll.current = false;
    }
  }, [value]);
  return (
    <Box
      sx={{
        overflowX: 'auto',
        scrollSnapType: 'x mandatory',
        WebkitOverflowScrolling: 'touch',
        '&::-webkit-scrollbar': { display: 'none' },
      }}
    >
      <Stack
        direction="row"
        sx={{
          '&>*': {
            flex: `0 0 ${100/columns}%`,
            borderRadius: 1,
            scrollSnapAlign: 'start',
          },
        }}
      >
        {Object.values(COLOR_SET).map((color) => (
          <Box
            ref={(r: HTMLElement) => {
              if (r) ref.current[color] = r;
            }}
            sx={{ aspectRatio: '1 / 1' }}
          >
            <ButtonBase
              key={color}
              sx={{
                bgcolor: color,
                height: 1,
                width: 1,
                scale: value === color ? 0.9 : 0.8,
                borderRadius: 1.5,
                transition: 'all 0.2s',
              }}
              onClick={() => onChange(color)}
            >
              {value === color && <Iconify width={24} icon="eva:checkmark-fill" />}
            </ButtonBase>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
