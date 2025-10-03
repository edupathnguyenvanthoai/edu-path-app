import { useCallback, useDeferredValue } from 'react';

import { Grid, Stack, Button, IconButton } from '@mui/material';

import { solarIconsName } from 'src/components/iconify/icon-solar';

import { useSubject } from './hooks/use-subject';
import { Iconify } from '../../components/iconify';
import { useParams } from '../../utils/use-params';
import Header from '../../components/layout/header';
import SearchSubjects from './components/search-subjects';
import subjectFormControl from './context/subject-form-control';
import { CardViewSubject } from './components/card-view-subject';
import { EmptyExpand } from '../../components/empty/empty-expand';
import { DialogInputScore } from './components/dialog-input-score';
import { COLOR_LIST } from '../../components/color-utils/color-set';
import DialogActionSubject from './components/dialog-action-subject';
import { useDialogActionSubject } from './hooks/use-dialog-action-subject';

export default function SubjectPage() {
  const { subjects: lst, scoreMap } = useSubject();
  const subjects = useDeferredValue(lst);
  const { onOpen } = useDialogActionSubject();
  const [, setParams] = useParams({ subjectId: -1 });

  const handleEdit = useCallback(
    (s: Subject) => () => {
      onOpen();
      subjectFormControl.reset(s);
    },
    [onOpen]
  );

  const handleAdd = useCallback(() => {
    onOpen();
    subjectFormControl.reset({
      name: '',
      config: {
        icon: solarIconsName[Math.floor(Math.random() * solarIconsName.length)],
        color: COLOR_LIST[Math.floor(Math.random() * COLOR_LIST.length)],
      },
      weight: 1,
      category: 'Tự chọn',
      admissionGroups: [],
    });
  }, [onOpen]);

  const handleAddScore = useCallback(
    (id: number) => () => {
      setParams({ subjectId: id });
    },
    [setParams]
  );

  return (
    <Stack spacing={2}>
      <Header
        title="Môn học"
        action={
          <Button
            onClick={handleAdd}
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            Tạo môn học
          </Button>
        }
      />
      <SearchSubjects />
      {subjects.length > 0 && (
        <Grid container spacing={2} columns={2}>
          {subjects.map((subject) => (
            <Grid key={subject.id} size={1}>
              <CardViewSubject
                key={subject.id}
                subject={subject}
                onClick={handleAddScore(subject.id!)}
                score={scoreMap.get(subject.id!)}
                action={
                  <IconButton onClick={handleEdit(subject)}>
                    <Iconify icon="eva:more-vertical-fill" />
                  </IconButton>
                }
              />
            </Grid>
          ))}
        </Grid>
      )}
      <EmptyExpand in={!subjects.length} />
      <DialogActionSubject />
      <DialogInputScore />
    </Stack>
  );
}
