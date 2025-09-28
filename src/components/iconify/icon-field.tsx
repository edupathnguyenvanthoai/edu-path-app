import type { BoxProps } from '@mui/material';

import { memo, useRef, useEffect } from 'react';

import { Box, Stack, ButtonBase, InputLabel, FormControl, FormHelperText } from '@mui/material';

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
  label?: string;
  required?: boolean;
};

function IconField({
  value,
  onChange,
  columns = 6,
  error,
  helperText,
  sx,
  label,
  required,
}: IconFieldProps) {
  const ref = useRef<Record<string, HTMLElement>>({});
  const autoScroll = useRef(true);
  useEffect(() => {
    if (value && ref.current[value] && autoScroll.current) {
      ref.current[value].scrollIntoView({ block: 'nearest', inline: 'center' });
      autoScroll.current = false;
    }
  }, [value]);
  const keys = Object.keys(solarIcons) as (keyof typeof solarIcons)[];

  return (
    <FormControl>
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
                height: 56,
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

export default memo(IconField);
