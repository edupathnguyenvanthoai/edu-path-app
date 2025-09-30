import { createFormControl } from 'react-hook-form';

import type { SubjectGoalData } from '../hooks/use-goal-controller';

export const formSetGoalControl = createFormControl<SubjectGoalData>();
