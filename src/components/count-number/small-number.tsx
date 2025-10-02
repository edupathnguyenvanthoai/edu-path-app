import type { Theme, SxProps } from '@mui/material';

import { Stack, IconButton, OutlinedInput } from '@mui/material';

import { Iconify } from '../iconify';

export function SmallNumber({ value, onChange, min = 0, max = 10, sx }: SmallNumberProps) {
  return (
    <Stack
      direction="row"
      spacing={0.25}
      alignItems="center"
      sx={{
        '& button': {
          borderRadius: 1,
          p: 0.75,
        },
        ...sx,
      }}
    >
      <IconButton onClick={() => onChange?.(Number(value) - 0.25)}>
        <Iconify scale={-1} icon="eva:arrow-ios-forward-fill" />
      </IconButton>
      <OutlinedInput
        slotProps={slotProps}
        value={value}
        onFocus={(e) => e.target.select()}
        onChange={onChangeField(min, max, onChange)}
        onBlur={onBlurField(min, max, onChange)}
      />
      <IconButton onClick={() => onChange?.(Number(value) + 0.25)}>
        <Iconify icon="eva:arrow-ios-forward-fill" />
      </IconButton>
    </Stack>
  );
}

// ------------------------------------------------------------------------------

type SmallNumberProps = {
  value?: number | string;
  onChange?: (value: number | string) => void;
  step?: number;
  min?: number;
  max?: number;
  sx?: SxProps<Theme>;
};

const slotProps = {
  input: {
    sx: {
      textAlign: 'center',
      width: 46,
      py: 1,
      px: 0,
    },
  },
};

const onChangeField =
  (min: number, max: number, onChange?: (value: number | string) => void) =>
  (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/[^0-9.]/g, '');
    const firstDot = val.indexOf('.');
    if (firstDot !== -1) {
      val = val.slice(0, firstDot + 1) + val.slice(firstDot + 1).replace(/\./g, '');
    }
    if (val.endsWith('.') || val.startsWith('.') || val === '') {
      onChange?.(val);
      return;
    }
    const num = Number(val);

    onChange?.(Math.min(max, Math.max(min, num)));
  };

const onBlurField =
  (min: number, max: number, onChange?: (value: number | string) => void) =>
  (e: React.FocusEvent<HTMLInputElement>) => {
    let val = e.target.value;
    if (val[0] === '.') val = '0' + val;
    if (val[val.length - 1] === '.') val = val.slice(0, val.length - 1);
    if (val === '') val = '0';
    const num = Number(val);
    onChange?.(Math.floor(num * 4) / 4);
  };
