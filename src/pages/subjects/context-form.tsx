import { createFormControl } from 'react-hook-form';

import type { Subject } from '../../db/schema';

export const formControl = createFormControl<Subject>();
