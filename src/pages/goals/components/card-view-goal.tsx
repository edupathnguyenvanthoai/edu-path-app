import { Card, Badge, Avatar, Typography, CardContent, CardActionArea } from '@mui/material';

import ViewCircularScore from './view-circular-score';
import { Iconify } from '../../../components/iconify';
import { getTextColor } from '../../../utils/action-theme';
import { handleScoreChange } from '../context/goal-config-form-control';

export function CardViewGoal({ subject, goals, exams, onSetting }: CardViewGoalProps) {
  const avg = handleScoreChange.getAvgScore(exams, goals);
  return (
    <Card sx={{ height: 1 }}>
      <CardActionArea
        onClick={onSetting}
        sx={{ height: 1, display: 'flex', flexDirection: 'column' }}
      >
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          badgeContent={
            <Avatar
              variant="circular"
              sx={{
                boxShadow: 5,
                bgcolor: subject.config.color,
                color: getTextColor(subject.config.color),
              }}
            >
              <Iconify icon={subject.config.icon as any} />
            </Avatar>
          }
        >
          <ViewCircularScore score={avg} size={60} sx={{ m: 1, mt: 4 }} />
        </Badge>

        <CardContent sx={{ flex: 1 }}>
          <Typography
            variant="h5"
            sx={{
              textAlign: 'center',
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
