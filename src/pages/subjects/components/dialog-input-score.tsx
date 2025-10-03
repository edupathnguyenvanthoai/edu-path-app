import { useEffect } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { useWatch, Controller, useFormState } from 'react-hook-form';

import {
  Stack,
  Button,
  Dialog,
  Avatar,
  MenuItem,
  TextField,
  Typography,
  DialogTitle,
  DialogActions,
  DialogContent,
} from '@mui/material';

import { db } from '../../../schema/schema';
import { useParams } from '../../../utils/use-params';
import { Iconify } from '../../../components/iconify';
import { CardMessageGoal } from './card-message-goals';
import { getTextColor } from '../../../utils/action-theme';
import { SliderScore } from '../../goals/components/slider-score';
import ViewCircularScore from '../../goals/components/view-circular-score';
import { InputScore, scoreFormControl } from '../context/score-form-control';
import { DEFAULT_GOAL_SCORE } from '../../goals/context/goal-config-form-control';

export function DialogInputScore() {
  const [{ subjectId }, setParams] = useParams({ subjectId: -1 });
  const { isSubmitSuccessful, isLoading } = useFormState(scoreFormControl);
  const [score] = useWatch({
    control: scoreFormControl.control,
    name: ['score'],
  });
  const { subject, goals, exams } = useLiveQuery(async () => {
    if (!subjectId) return undefined;
    const _subject = await db.subjects.get(Number(subjectId));
    const _goals = await db.goals.where('subjectId').equals(Number(subjectId)).toArray();
    const _exams = await db.examTypes.toArray();

    return { subject: _subject, goals: _goals, exams: _exams };
  }, [subjectId]) || { subject: null, goals: [], exams: [] };

  useEffect(() => {
    if (subjectId !== -1) {
      scoreFormControl.reset({
        score: DEFAULT_GOAL_SCORE,
        subjectId: Number(subjectId),
        examTypeId: 0,
      });
    }
  }, [subjectId]);

  useEffect(() => {
    if (isSubmitSuccessful && subjectId !== -1) {
      setParams({ subjectId: -1 });
    }
  }, [isSubmitSuccessful, setParams, subjectId]);

  return (
    <Dialog open={subjectId !== -1}>
      <DialogTitle>Nhập điểm</DialogTitle>
      <Typography variant="body2" px={3} pb={2}>
        Chọn bài kiểm tra và nhập điểm để theo dõi kết quả học tập của môn {subject?.name}.
      </Typography>
      <DialogContent dividers>
        <Stack spacing={3} mt={3}>
          <ViewCircularScore size={80} score={score} />
          <Controller
            control={scoreFormControl.control}
            name="score"
            render={({ field }) => <SliderScore value={field.value} onChange={field.onChange} />}
          />
          <Controller
            control={scoreFormControl.control}
            name="examTypeId"
            rules={{ validate: (value) => value !== 0 || 'Bạn phải chọn bài kiểm tra' }}
            render={({ field, fieldState: { error, invalid } }) => (
              <TextField
                select
                label="Bài kiểm tra"
                placeholder="Chọn bài kiểm tra"
                error={invalid}
                helperText={error?.message}
                fullWidth
                {...field}
              >
                <MenuItem value={0}>
                  <em>Chọn bài kiểm tra</em>
                </MenuItem>
                {exams.map((exam) => (
                  <MenuItem value={exam.id} key={exam.id}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Avatar
                        sx={{
                          width: 28,
                          height: 28,
                          bgcolor: exam.config.bgcolor,
                          color: getTextColor(exam.config.bgcolor),
                        }}
                      >
                        <Iconify width={0.6} icon={exam.config.icon as any} />
                      </Avatar>
                      <Typography variant="h6">{exam.name}</Typography>
                    </Stack>
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
          <CardMessageGoal goals={goals} subjectId={Number(subjectId)} />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button disabled={isLoading} color="inherit" onClick={() => setParams({ subjectId: -1 })}>
          Đóng
        </Button>
        <Button loading={isLoading} color="primary" variant="contained" onClick={InputScore}>
          Lưu lại
        </Button>
      </DialogActions>
    </Dialog>
  );
}
