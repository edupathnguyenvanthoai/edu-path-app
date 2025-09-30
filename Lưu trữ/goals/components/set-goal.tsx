import { Stack, IconButton } from '@mui/material';

import ViewSubject from './view-subject';
import { SCORE_DEFAULT } from '../utils/score';
import { Iconify } from '../../../src/components/iconify';
import { useDialogSetGoal } from '../hooks/use-dialog';
import { Empty } from '../../../src/components/empty/empty-expand';
import { formSetGoalControl } from '../context/form-set-goal-control';
import SearchSubjects from '../../subjects/components/search-subjects';

import type { SubjectGoalData } from '../hooks/use-goal-controller';

type SetGoalProps = {
  listGoal: SubjectGoalData[];
};

export const SetGoal = ({ listGoal }: SetGoalProps) => {
  const { setTrue } = useDialogSetGoal();
  return (
    <Stack spacing={1}>
      <SearchSubjects />
      {(!listGoal.length && <Empty />) ||
        listGoal.map((goal) => (
          <ViewSubject
            key={goal.id}
            subject={goal}
            action={
              <IconButton
                onClick={() => {
                  setTrue();
                  formSetGoalControl.reset({
                    ...goal,
                    goals: goal.goals.map((x) => ({ ...x, targetScore: SCORE_DEFAULT })),
                  });
                }}
              >
                <Iconify icon="solar:settings-outline" />
              </IconButton>
            }
          />
        ))}
    </Stack>
  );
};
