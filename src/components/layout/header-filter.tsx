import { memo } from 'react';

import { Box } from '@mui/material';

function HeaderFilter({ top }: { top: number }) {
  return (
    <Box
      sx={{
        backdropFilter: 'blur(4px)',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: (t) => t.spacing(top - 1),
        zIndex: (t) => t.zIndex.modal + 50,
      }}
    />
  );
}

export default memo(HeaderFilter);
