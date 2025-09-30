import { Box, Stack, Container } from '@mui/material';

import { usePadding } from '../../config-capacitor';

export function FloatLayout({ children }: React.PropsWithChildren) {
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
      <Container maxWidth="xs">
        <Stack direction="row" justifyContent="end">
          {children}
        </Stack>
      </Container>
    </Box>
  );
}
