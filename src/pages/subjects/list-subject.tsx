import type { Subject } from 'src/db/schema';

import { useLiveQuery } from 'dexie-react-hooks';

import {
  Fab,
  Box,
  Grid,
  Card,
  Stack,
  Divider,
  Typography,
  IconButton,
  CardActionArea,
} from '@mui/material';

import { db } from 'src/db/schema';

import { formControl } from './context-form';
import { Iconify } from '../../components/iconify';
import { Empty } from '../../components/empty/empty';
import { DialogHandleSubject } from './dialog-handle-subject';

export default function ListSubject() {
  const subjects = useLiveQuery(() => db.subjects.toArray(), []);
  const handleAddSubject = () =>
    formControl.reset({
      _open: true,
    });

  const handleEditSubject = (subject: Subject) => () =>
    formControl.reset({ ...subject, _open: true });
  return (
    <Stack sx={{ position: 'relative', minHeight: '100vh', py: 2 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h4">Danh sách môn học</Typography>
        <IconButton>
          <Iconify width={24} icon="solar:cart-large-bold-duotone" />
        </IconButton>
      </Stack>
      <Divider sx={{ mb: 2 }} />
      {subjects && subjects.length > 0 ? (
        <Grid container spacing={1} columns={2}>
          {subjects.map((subject) => (
            <Grid size={1} key={subject.id}>
              <Card
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  height: 1,
                }}
              >
                <CardActionArea onClick={handleEditSubject(subject)}>
                  <Stack p={2} direction="row" overflow="hidden" spacing={2} alignItems="center">
                    <Box
                      sx={{
                        p: 1,
                        borderRadius: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: subject.color,
                        color: (t) =>
                          t.palette.getContrastText(subject.color || t.palette.background.paper),
                      }}
                    >
                      <Iconify icon={subject.icon as any} />
                    </Box>
                    <Box
                      sx={{
                        typography: 'h6',
                        textWrap: 'nowrap',
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        maxWidth: '100%',
                      }}
                    >
                      {subject.name}
                    </Box>
                  </Stack>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Empty />
      )}
      <Fab
        color="primary"
        aria-label="add"
        onClick={handleAddSubject}
        size="medium"
        sx={{ position: 'absolute', bottom: (t) => t.spacing(10), right: 0 }}
      >
        <Iconify icon="mingcute:add-line" />
      </Fab>
      <DialogHandleSubject />
    </Stack>
  );
}
