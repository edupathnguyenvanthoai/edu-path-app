import { createFormControl } from 'react-hook-form';

import type { SubjectListData } from '../hooks/use-subject-controller';

export const formControl = createFormControl<SubjectListData>({
  defaultValues: {},
});
