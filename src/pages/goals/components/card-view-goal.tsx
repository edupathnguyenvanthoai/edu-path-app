import { Card, Stack, Avatar, Typography, CardContent, CardActionArea } from '@mui/material';

import ViewCircularScore from './view-circular-score';
import { Iconify } from '../../../components/iconify';
import { getTextColor } from '../../../utils/action-theme';
import { handleScoreChange } from '../context/goal-config-form-control';

export function CardViewGoal({ subject, goals, exams, onSetting }: CardViewGoalProps) {
  const avg = handleScoreChange.getAvgScore(exams, goals);
  return (
    <Card sx={{ height: 1 }}>
      <CardActionArea onClick={onSetting} sx={{ height: 1 }}>
        <ViewCircularScore score={avg} size={50} sx={{ mt: 3 }} />
        <CardContent>
          <Stack direction="row" spacing={1} alignItems="center">
            <Avatar
              sx={{
                borderRadius: 1.5,
                bgcolor: subject.config.color,
                color: getTextColor(subject.config.color),
              }}
            >
              <Iconify icon={subject.config.icon as any} />
            </Avatar>
            <Typography
              variant="subtitle2"
              sx={{
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                lineClamp: 2,
              }}
            >
              {subject.name}
            </Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

type CardViewGoalProps = {
  subject: Subject;
  goals: Goal[];
  exams: Map<number, ExamType>;
  onSetting: () => void;
};
