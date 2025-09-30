import type { ReactNode } from 'react';

import { Box, Card, Badge, Stack, Avatar, Typography } from '@mui/material';

import ViewScoreCicle from './view-score-cicle';
import { Label } from '../../../src/components/label';
import { Iconify } from '../../../src/components/iconify';
import { getTextColor } from '../../../src/utils/action-theme';
import { getAvgScore, getScoreColor } from '../utils/score';

import type { SubjectGoalData } from '../hooks/use-goal-controller';

type ViewGoalProps = {
  subjectGoalData: SubjectGoalData;
  action?: ReactNode;
};

export default function ViewGoal({
  subjectGoalData: { goals, ...subject },
  action,
}: ViewGoalProps) {
  const avgScore = getAvgScore(goals);
  const bgcolor = getScoreColor(avgScore);
  return (
    <Card component={Stack} alignItems="center" p={3} height={1} gap={0.5} position="relative">
      <Badge
        overlap="circular"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        badgeContent={
          <Avatar
            sx={{
              width: 28,
              height: 28,
              boxShadow: 5,
              bgcolor: subject.config.color,
              color: getTextColor(subject.config.color),
              outline: 2,
              outlineColor: getTextColor(subject.config.color),
            }}
          >
            <Iconify width={0.5} icon={subject.config.icon as any} />
          </Avatar>
        }
      >
        <ViewScoreCicle bgcolor={bgcolor} score={avgScore} size={60} />
      </Badge>
      <Box flex={1} display="flex" justifyContent="center" alignItems="center">
        <Typography
          variant="h6"
          textAlign="center"
          sx={{
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            WebkitLineClamp: 2,
          }}
        >
          {subject.name}
        </Typography>
      </Box>
      <Label>{subject.category}</Label>
      <Typography variant="caption">{subject.admissionGroups.join(', ')}</Typography>
      {action && (
        <Box position="absolute" top={(t) => t.spacing(1)} right={(t) => t.spacing(1)}>
          {action}
        </Box>
      )}
    </Card>
  );
}
