import { useCallback, useDeferredValue } from 'react';

import { Grid, Stack, Button, IconButton } from '@mui/material';

import { solarIconsName } from 'src/components/iconify/icon-solar';

import { useSubject } from './hooks/use-subject';
import { Iconify } from '../../components/iconify';
import Header from '../../components/layout/header';
import SearchSubjects from './components/search-subjects';
import subjectFormControl from './context/subject-form-control';
import { CardViewSubject } from './components/card-view-subject';
import { EmptyExpand } from '../../components/empty/empty-expand';
import { COLOR_LIST } from '../../components/color-utils/color-set';
import DialogActionSubject from './components/dialog-action-subject';
import { useDialogActionSubject } from './hooks/use-dialog-action-subject';

export default function SubjectPage() {
  const subjects = useDeferredValue(useSubject(), []);
  const { onOpen } = useDialogActionSubject();

  const handleEdit = useCallback(
    (s: Subject) => () => {
      onOpen();
      subjectFormControl.reset(s);
    },
    [onOpen]
  );

  const handleAdd = useCallback(
    () =>
      handleEdit({
        name: '',
        config: {
          icon: solarIconsName[Math.floor(Math.random() * solarIconsName.length)],
          color: COLOR_LIST[Math.floor(Math.random() * COLOR_LIST.length)],
        },
        weight: 0,
        category: '',
        admissionGroups: [],
      }),
    [handleEdit]
  );

  return (
    <Stack spacing={2}>
      <Header
        title="Môn học"
        action={
          <Button
            onClick={handleAdd()}
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            Tạo môn học
          </Button>
        }
      />
      <SearchSubjects />
      <Grid container spacing={2} columns={2}>
        {subjects.map((subject) => (
          <Grid key={subject.id} size={1}>
            <CardViewSubject
              key={subject.id}
              subject={subject}
              action={
                <IconButton onClick={handleEdit(subject)}>
                  <Iconify icon="solar:pen-bold" />
                </IconButton>
              }
            />
          </Grid>
        ))}
      </Grid>
      <EmptyExpand in={!subjects.length} />
      <DialogActionSubject />
    </Stack>
  );
}
