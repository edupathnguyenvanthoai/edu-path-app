import type { ReactNode } from 'react';

import { Card, Fade, Stack, Typography } from '@mui/material';

import { Iconify } from '../iconify';

type EmptyProps = {
  in?: boolean;
  icon?: ReactNode;
  title?: string | ReactNode;
};

export function EmptyExpand({ title, icon, in: open = true }: EmptyProps) {
  return (
    <Fade in={open} unmountOnExit mountOnEnter>
      <Stack
        spacing={1}
        component={Card}
        sx={{
          p: 3,
          width: 1,
          border: 2,
          height: 200,
          alignItems: 'center',
          justifyContent: 'center',
          borderStyle: 'dashed',
          borderColor: 'divider',
          bgcolor: 'background.paper',
        }}
      >
        {icon ?? <Iconify width={40} icon="solar:inbox-bold-duotone" />}
        <Typography variant="body1" textAlign="center">
          {title ?? 'Không có dữ liệu nào'}
        </Typography>
      </Stack>
    </Fade>
  );
}
