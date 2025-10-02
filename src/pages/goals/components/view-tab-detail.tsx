import { toast } from 'sonner';
import { useCallback } from 'react';
import { useFieldArray } from 'react-hook-form';

import { Stack } from '@mui/material';

import { CardItemGoalView } from './card-item-goal-view';
import { GoalConfigFormControl } from '../context/goal-config-form-control';

type ViewTabDetailProps = {
  examTypeMap: Map<number, ExamType>;
};
export function ViewTabDetail({ examTypeMap }: ViewTabDetailProps) {
  const { fields, remove, insert } = useFieldArray({
    control: GoalConfigFormControl.control,
    name: 'goals',
  });

  const onDelete = useCallback(
    (index: number) => () => {
      toast.success('Đã xoá bài kiểm tra', { id: 'goal-msg' });
      remove(index);
    },
    [remove]
  );
  const onCopy = useCallback(
    (index: number) => () => {
      const goal = GoalConfigFormControl.getValues(`goals.${index}`);
      insert(index, goal);
      const nameExam = examTypeMap.get(goal.examTypeId!)?.name;
      toast.success(`Đã thêm mục tiêu cho ${nameExam}`, { id: 'goal-msg' });
    },
    [examTypeMap, insert]
  );
  return (
    <Stack spacing={1}>
      {fields.map((goal, index) => (
        <CardItemGoalView
          key={goal.id}
          examType={examTypeMap}
          index={index}
          onCopy={onCopy(index)}
          onDelete={onDelete(index)}
          isDel={fields.length > 1}
        />
      ))}
    </Stack>
  );
}
