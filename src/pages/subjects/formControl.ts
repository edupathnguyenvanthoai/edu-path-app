import { createFormControl } from 'react-hook-form';

import type { SubjectListData } from './use-subject-controller';

export const formControl = createFormControl<SubjectListData>();
