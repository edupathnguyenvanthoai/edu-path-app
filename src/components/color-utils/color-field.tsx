import type { BoxProps } from '@mui/material';

import { useRef, useEffect } from 'react';

import { Box, Stack, ButtonBase, InputLabel, FormControl, FormHelperText } from '@mui/material';

import { Iconify } from '../iconify';
import { COLOR_LIST } from './color-set';

type ColorFieldProps = {
  value?: string;
  onChange: (color: string) => void;
  columns?: number;
  error?: boolean;
  helperText?: string;
  sx?: BoxProps['sx'];
  label?: string;
  required?: boolean;
};
export default function ColorField({
  value,
  onChange,
  columns = 6,
  error,
  helperText,
  sx,
  label,
  required,
}: ColorFieldProps) {
  const ref = useRef<Record<string, HTMLElement>>({});
  const autoScroll = useRef(true);
  useEffect(() => {
    if (value && ref.current[value] && autoScroll.current) {
      ref.current[value].scrollIntoView({ block: 'nearest', inline: 'center' });
      autoScroll.current = false;
    }
  }, [value]);
  return (
    <FormControl sx={sx}>
      {label && (
        <InputLabel
          shrink
          sx={{
            mx: -0.75,
            px: 0.75,
            bgcolor: 'background.paper',
          }}
        >
          {label}
          {required && (
            <Box component="span" color="error.main" ml={0.5}>
              *
            </Box>
          )}
        </InputLabel>
      )}
      <Box
        sx={{
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
          border: 1,
          borderColor: 'divider',
          borderRadius: 1,
          '&::-webkit-scrollbar': { display: 'none' },
          ...(error && { outline: 1, outlineColor: 'error.main', borderRadius: 1 }),
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
          {COLOR_LIST.map((color) => (
            <Box
              key={color}
              ref={(r: HTMLElement) => {
                if (r) ref.current[color] = r;
              }}
              sx={{
                height: 56,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <ButtonBase
                sx={{
                  bgcolor: color,
                  width: 40,
                  height: 40,
                  scale: value === color ? 1 : 0.6,
                  borderRadius: 1.5,
                  transition: 'all 0.2s',
                  color: (t) => t.palette.getContrastText(color),
                }}
                onClick={() => {
                  onChange(color);
                  autoScroll.current = false;
                }}
              >
                {value === color && <Iconify width={24} icon="eva:checkmark-fill" />}
              </ButtonBase>
            </Box>
          ))}
        </Stack>
      </Box>
      {helperText && <FormHelperText error={error}>{helperText}</FormHelperText>}
    </FormControl>
  );
}
