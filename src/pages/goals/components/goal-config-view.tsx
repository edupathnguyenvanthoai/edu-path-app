import { useCallback } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';

import { Grid, IconButton } from '@mui/material';

import { db } from '../../../schema/schema';
import { Iconify } from '../../../components/iconify';
import { EmptyExpand } from '../../../components/empty/empty-expand';
import { useDialogConfigGoal } from '../hooks/use-dialog-config-goal';
import { CardViewSubject } from '../../subjects/components/card-view-subject';
import { DEFAULT_GOAL_SCORE, GoalConfigFormControl } from '../context/goal-config-form-control';

type GoalListViewProps = {
  subjects: Subject[];
};
export function GoalConfigView({ subjects }: GoalListViewProps) {
  const { onOpen } = useDialogConfigGoal();
  const examType = useLiveQuery(() => db.examTypes.toArray());
  const onSetting = useCallback(
    (s: Subject) => () => {
      onOpen();
      GoalConfigFormControl.reset({
        subject: s,
        goals: examType?.map((x) => ({
          subjectId: s.id!,
          examTypeId: x.id!,
          targetScore: DEFAULT_GOAL_SCORE,
        })),
      });
    },
    [examType, onOpen]
  );

  return (
    <>
      <Grid container spacing={2} columns={2}>
        {subjects.map((subject) => (
          <Grid size={1} key={subject.id}>
            <CardViewSubject
              subject={subject}
              action={
                <IconButton onClick={onSetting(subject)}>
                  <Iconify icon="solar:settings-bold-duotone" />
                </IconButton>
              }
            />
          </Grid>
        ))}
      </Grid>
      <EmptyExpand in={subjects.length === 0} />
    </>
  );
}
