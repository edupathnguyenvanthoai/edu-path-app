import { Stack } from '@mui/material';

type GoalListViewProps = {
  goalMap: Map<number, Goal[]>;
  subjects: Subject[];
};
export function GoalListView({ subjects, goalMap }: GoalListViewProps) {
  return <Stack spacing={2}>Goal</Stack>;
}
