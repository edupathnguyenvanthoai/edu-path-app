import { varAlpha } from 'minimal-shared/utils';

import { Card, Stack, Typography } from '@mui/material';

import { Iconify } from '../iconify';

export function Empty() {
  return (
    <Stack
      p={3}
      alignItems="center"
      justifyContent="center"
      spacing={1}
      component={Card}
      sx={{
        border: 1,
        borderColor: 'divider',
        borderStyle: 'dashed',
        height: 150,
        bgcolor: (t) => varAlpha(t.vars.palette.background.neutralChannel, 0.5),
      }}
    >
      <Iconify width={40} icon="solar:inbox-bold-duotone" />
      <Typography variant="body2">Không có dữ liệu nào</Typography>
    </Stack>
  );
}
