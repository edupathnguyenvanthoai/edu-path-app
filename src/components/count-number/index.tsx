import { useRef, forwardRef, useCallback } from 'react';

import { TextField, IconButton, InputAdornment, type TextFieldProps } from '@mui/material';

import { Iconify } from '../iconify';

export type CountNumberProps = TextFieldProps & {
  step?: number;
};

export default forwardRef<HTMLDivElement, CountNumberProps>(function CountNumber(
  { step = 1, sx, slotProps, ...props },
  ref
) {
  const inputRef = useRef<HTMLInputElement>(null);

  const actionAction = useCallback(
    (t: 1 | -1) => () => {
      if (inputRef.current) {
        inputRef.current.value = String(Number(inputRef.current.value || '0') + t * step);
      }
    },
    [step]
  );

  return (
    <TextField
      ref={ref}
      inputRef={inputRef}
      defaultValue={0}
      {...props}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <IconButton onClick={actionAction(-1)}>
                <Iconify sx={{ scale: -1 }} icon="eva:arrow-ios-forward-fill" />
              </IconButton>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={actionAction(1)}>
                <Iconify icon="eva:arrow-ios-forward-fill" />
              </IconButton>
            </InputAdornment>
          ),
        },
        ...slotProps,
      }}
      sx={{
        '& input': {
          textAlign: 'center',
        },
        ...sx,
      }}
    />
  );
});
