import { Controller } from 'react-hook-form';

import { Stack } from '@mui/material';

import { formControl } from '../context/formControl';
import IconField from '../../../components/iconify/icon-field';
import ColorField from '../../../components/color-utils/color-field';

export default function ContentStructIcon() {
  const [color] = formControl.watch(['config.color']);
  return (
    <Stack spacing={2}>
      <Controller
        control={formControl.control}
        name="config.icon"
        defaultValue=""
        render={({ field, fieldState: { error, invalid } }) => (
          <IconField
            error={invalid}
            helperText={error?.message}
            value={field.value as any}
            onChange={field.onChange}
            label="Chọn biểu tượng"
            sx={{
              ...(color && {
                '& button.active': {
                  bgcolor: color,
                  color: (t) => t.palette.getContrastText(color),
                },
              }),
            }}
          />
        )}
      />
      <Controller
        control={formControl.control}
        name="config.color"
        defaultValue=""
        render={({ field, fieldState: { error, invalid } }) => (
          <ColorField
            error={invalid}
            helperText={error?.message}
            value={field.value}
            onChange={field.onChange}
            label="Chọn màu"
          />
        )}
      />
    </Stack>
  );
}
