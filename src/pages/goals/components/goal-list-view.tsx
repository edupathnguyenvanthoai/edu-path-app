import { useCallback } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';

import { Grid } from '@mui/material';

import { db } from '../../../schema/schema';
import { CardViewGoal } from './card-view-goal';
import { Iconify } from '../../../components/iconify';
import { useParams } from '../../../utils/use-params';
import { EmptyExpand } from '../../../components/empty/empty-expand';

type GoalListViewProps = {
  subjects: Subject[];
  goalsMap: Map<number, Goal[]>;
};
export function GoalListView({ subjects, goalsMap }: GoalListViewProps) {
  const [, setParams] = useParams({
    subjectId: -1,
  });
  const examTypeMap = useLiveQuery(
    async () => new Map((await db.examTypes.toArray()).map((e) => [e.id!, e]))
  );

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
              <CardViewGoal
                subject={subject}
                goals={goalsMap.get(subject.id!)!}
                exams={examTypeMap!}
                onSetting={onSetting(subject)}
              />
            </Grid>
          ))}
        </Grid>
      )}
      <EmptyExpand
        in={subjects.length === 0}
        icon={<Iconify width={75} icon="solar:target-bold-duotone" />}
        title={
          <>
            Không có mục tiêu nào.
            <br /> Hãy tạo một mục tiêu nhé!
          </>
        }
      />
    </>
  );
}
