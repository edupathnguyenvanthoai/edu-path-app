import { useBoolean } from 'ahooks';

import { Fab, Grid, Stack, IconButton } from '@mui/material';

import ViewGoal from './components/view-goal';
import { Iconify } from '../../src/components/iconify';
import Header from '../../src/components/layout/header';
import { useDialogSetGoal } from './hooks/use-dialog';
import DialogSetGoal from './components/dialog-set-goal';
import { Empty } from '../../src/components/empty/empty-expand';
import useGoalController from './hooks/use-goal-controller';
import DialogSetGoalPage from './components/dialog-set-goal-page';
import { FloatLayout } from '../../src/components/layout/float-layout';
import SearchSubjects from '../subjects/components/search-subjects';
import { formSetGoalControl } from './context/form-set-goal-control';

export default function GoalsPage() {
  const [isSetGoal, { setTrue, setFalse }] = useBoolean(false);
  const { open, setTrue: openGoalConfig, setFalse: closeGoalConfig } = useDialogSetGoal();
  const listData = useGoalController();
  const listGoal = listData.filter((x) => x.isGoal);
  const listGoalNotGoal = listData.filter((x) => !x.isGoal);

  return (
    <Stack spacing={2}>
      <Header title="Mục tiêu" />
      <SearchSubjects />
      <Grid container spacing={2} columns={2}>
        {(!listGoal.length && <Empty />) ||
          listGoal.map((goal) => (
            <Grid size={1} key={goal.id}>
              <ViewGoal
                key={goal.id}
                subjectGoalData={goal}
                action={
                  <IconButton
                    onClick={() => {
                      openGoalConfig();
                      formSetGoalControl.reset(goal);
                    }}
                  >
                    <Iconify icon="solar:settings-outline" />
                  </IconButton>
                }
              />
            </Grid>
          ))}
      </Grid>
      <DialogSetGoalPage open={isSetGoal} onClose={setFalse} listSubject={listGoalNotGoal} />
      <DialogSetGoal open={open} onClose={closeGoalConfig} />
      <FloatLayout>
        <Fab onClick={setTrue} color="primary">
          <Iconify icon="mingcute:add-line" />
        </Fab>
      </FloatLayout>
    </Stack>
  );
}
