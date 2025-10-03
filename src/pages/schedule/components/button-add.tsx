import { Button } from '@mui/material';

import { Iconify } from '../../../components/iconify';

export function ButtonAddScore() {
  return (
    <Button variant="contained" startIcon={<Iconify icon="solar:box-minimalistic-bold-duotone" />}>
      Nhập điểm
    </Button>
  );
}
