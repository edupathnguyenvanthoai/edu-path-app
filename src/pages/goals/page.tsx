import { useMemo } from 'react';
import { useBoolean } from 'ahooks';

import { Stack, Button, Collapse, IconButton } from '@mui/material';

import { useGoals } from './hooks/use-goals';
import { Iconify } from '../../components/iconify';
import Header from '../../components/layout/header';
import { GoalListView } from './components/goal-list-view';
import { GoalConfigView } from './components/goal-config-view';
import SearchSubjects from '../subjects/components/search-subjects';
import { DialogConfigGoals } from './components/dialog-config-goals';

export default function GoalPage() {
  const { subjects, goalsMap } = useGoals();
  const [config, setConfig] = useBoolean(false);
  const subjectGoals = useMemo(() => subjects.filter((s) => s.isGoal), [subjects]);
  const subjectGoalConfigs = useMemo(() => subjects.filter((s) => !s.isGoal), [subjects]);

  return (
    <>
      <Stack spacing={2}>
        <Header
          title={!config ? 'Mục Tiêu' : 'Đặt mục tiêu'}
          action={
            !config ? (
              <Button
                onClick={setConfig.setTrue}
                startIcon={<Iconify icon="solar:target-bold-duotone" />}
                variant="contained"
              >
                Đặt mục tiêu
              </Button>
            ) : (
              <IconButton onClick={setConfig.setFalse}>
                <Iconify icon="mingcute:close-line" />
              </IconButton>
            )
          }
        />
        <SearchSubjects />
        <Stack>
          <Collapse in={!config} mountOnEnter unmountOnExit>
            <GoalListView subjects={subjectGoals} goalMap={goalsMap} />
          </Collapse>
          <Collapse in={config} mountOnEnter unmountOnExit>
            <GoalConfigView subjects={subjectGoalConfigs}/>
          </Collapse>
        </Stack>
      </Stack>
      <DialogConfigGoals />
    </>
  );
}
