import type { ContainerProps } from '@mui/material';

import { Box, Stack, Container } from '@mui/material';

import { usePadding } from '../../config-capacitor';

export function FloatLayout({ children, sx, ...props }: ContainerProps) {
  const { bottom } = usePadding();
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: (t) => t.spacing(bottom + 10),
        left: 0,
        right: 0,
      }}
    >
      <Container maxWidth="xs" sx={{ overflow: 'visible', ...sx }} {...props}>
        <Stack direction="row" justifyContent="end">
          {children}
        </Stack>
      </Container>
    </Box>
  );
}
