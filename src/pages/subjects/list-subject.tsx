import { useBoolean } from 'ahooks';
import { useLiveQuery } from 'dexie-react-hooks';

import { Fab, Grid, Card, Stack, Typography, CardContent } from '@mui/material';

import { db } from 'src/db/schema';

import { Iconify } from '../../components/iconify';
import { DialogHandleSubject } from './dialog-handle-subject';

export default function ListSubject() {
  const subjects = useLiveQuery(() => db.subjects.toArray(), []);
  const [open, { setTrue, setFalse }] = useBoolean(false);
  return (
    <Stack sx={{ position: 'relative', minHeight: '100vh', padding: 2 }}>
      {subjects && subjects.length > 0 ? (
        <Grid container spacing={2} columns={2}>
          {subjects.map((subject) => (
            <Grid columns={1} key={subject.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" component="div">
                    {subject.name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h6" align="center" sx={{ marginTop: 4 }}>
          Chưa có môn học nào
        </Typography>
      )}
      <Fab
        color="primary"
        aria-label="add"
        onClick={setTrue}
        sx={{ position: 'absolute', bottom: (t) => t.spacing(10), right: (t) => t.spacing(2) }}
      >
        <Iconify icon="mingcute:add-line" />
      </Fab>
      <DialogHandleSubject open={open} setFalse={setFalse} />
    </Stack>
  );
}
