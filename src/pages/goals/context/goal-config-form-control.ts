import { toast } from 'sonner';
import { createFormControl } from 'react-hook-form';

import { updateGoals, type SubjectCheckGoal } from '../hooks/use-goals';

type GoalConfigFormControlContext = {
  subject: SubjectCheckGoal;
  goals: Goal[];
  isNew: boolean;
};

export const DEFAULT_GOAL_SCORE = 8.0;
export const GoalConfigFormControl = createFormControl<GoalConfigFormControlContext>();

const formControl = GoalConfigFormControl;

const changeScore = (score: number) =>
  formControl.setValue(
    'goals',
    formControl.getValues('goals').map((goal) => ({
      ...goal,
      targetScore: score,
    }))
  );

const getAvgScore = (exams: Map<number, ExamType>, goals: Goal[]) => {
  const Score = goals.reduce(
    ({ total, count }, current) => ({
      total: total + current.targetScore * (exams.get(current.examTypeId!)?.weight || 0),
      count: count + (exams.get(current.examTypeId!)?.weight || 0),
    }),
    { total: 0, count: 0 }
  );

  if (Score.count === 0) return 0;

  return Score.total / Score.count;
};

export const handleScoreChange = {
  changeScore,
  getAvgScore,
};

export const onUpdateSubmit = formControl.handleSubmit(async (data) => {
  const SubjectId = data.subject.id!;
  const goals = data.goals;
  await updateGoals(goals, SubjectId);
  toast.success('Mục tiêu đã được cập nhật!', { id: 'goal-msg' });
});
