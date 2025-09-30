import { Grid, Stack, Button, IconButton } from '@mui/material';

import { Iconify } from '../../components/iconify';
import Header from '../../components/layout/header';
import { DialogHandleSubject } from './dialog-handle';
import { Empty } from '../../components/empty/empty-expand';
import ViewSubjectCard from './components/view-subject-card';
import SearchSubjects from '../subjects/components/search-subjects';
import { useSubjectController } from './hooks/use-subject-controller';
import useDialogHandleSubject from './hooks/use-dialog-handle-subject';

export default function SubjectList() {
  const { listData } = useSubjectController();
  const { openDialog } = useDialogHandleSubject();
  return (
    <Stack spacing={2}>
      <Header
        title="Môn học"
        action={
          <Button
            onClick={() => openDialog()}
            startIcon={<Iconify width={16} icon="mingcute:add-line" />}
            variant="contained"
          >
            Tạo môn học
          </Button>
        }
      />
      <SearchSubjects />
      {(!listData.length && <Empty />) || (
        <Grid container columns={2} spacing={2}>
          {listData.map((x) => (
            <Grid key={x.id} size={1}>
              <ViewSubjectCard
                subject={x}
                action={
                  <IconButton onClick={() => openDialog(x)}>
                    <Iconify icon="solar:pen-bold" />
                  </IconButton>
                }
              />
            </Grid>
          ))}
        </Grid>
      )}
      <DialogHandleSubject />
    </Stack>
  );
}
