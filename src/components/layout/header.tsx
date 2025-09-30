import { memo } from 'react';

import { Stack, IconButton, Typography } from '@mui/material';

import { RouterLink } from 'src/routes/components/router-link';

import { Iconify } from '../iconify';

type GoalsHeaderProps = {
  title: string;
  action?: React.ReactNode;
  hrefBack?: string;
};

function Header({ title, action, hrefBack }: GoalsHeaderProps) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      gap={1}
      sx={{
        scrollSnapAlign: 'start',
      }}
    >
      {hrefBack && (
        <IconButton
          sx={{ p: 0.5, scale: -1, mr: -1 }}
          component={RouterLink}
          href={hrefBack}
          replace
        >
          <Iconify width={32} icon="eva:arrow-ios-forward-fill" />
        </IconButton>
      )}
      <Typography variant="h2" flex={1} textTransform="uppercase">
        {title}
      </Typography>
      {action}
    </Stack>
  );
}

export default memo(Header);
