import { useCallback } from 'react';

import { Grid, IconButton } from '@mui/material';

import { Iconify } from '../../../components/iconify';
import { useParams } from '../../../utils/use-params';
import { EmptyExpand } from '../../../components/empty/empty-expand';
import { CardViewSubject } from '../../subjects/components/card-view-subject';

type GoalListViewProps = {
  subjects: Subject[];
};
export function GoalConfigView({ subjects }: GoalListViewProps) {
  const [, setParams] = useParams({
    subjectId: -1,
  });
  const onSetting = useCallback(
    (s: Subject) => () => {
      setParams({ subjectId: s.id! });
    },
    [setParams]
  );

  return (
    <>
      {subjects.length > 0 && (
        <Grid container spacing={2} columns={2}>
          {subjects.map((subject) => (
            <Grid size={1} key={subject.id}>
              <CardViewSubject
                subject={subject}
                action={
                  <IconButton onClick={onSetting(subject)}>
                    <Iconify width={24} icon="solar:settings-bold-duotone" />
                  </IconButton>
                }
              />
            </Grid>
          ))}
        </Grid>
      )}
      <EmptyExpand in={subjects.length === 0} />
    </>
  );
}
