import { toast } from 'sonner';
import { createFormControl } from 'react-hook-form';

import { db } from '../../../schema/schema';

export const scoreFormControl = createFormControl<Score>();

export const InputScore = scoreFormControl.handleSubmit(async (data) => {
  try {
    await db.scores.put(data);
    toast.success('Nhập điểm thành công', { id: 'score-msg' });
  } catch {
    toast.error('Nhập điểm thất bại', { id: 'score-msg' });
  }
});
