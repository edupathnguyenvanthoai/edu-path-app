import { Stack, Button, Typography } from '@mui/material';

import { Iconify } from '../../components/iconify';
import useDialogHandleSubject from './use-dialog-handle-subject';

export default function SubjectHeader() {
  const { openDialog } = useDialogHandleSubject();
  return (
    <Stack direction="row" alignItems="center">
      <Typography variant="h2" mr="auto" textTransform="uppercase">
        Môn học
      </Typography>
      <Button
        onClick={() => openDialog()}
        startIcon={<Iconify width={16} icon="mingcute:add-line" />}
        variant="contained"
      >
        Tạo môn học
      </Button>
    </Stack>
  );
}
