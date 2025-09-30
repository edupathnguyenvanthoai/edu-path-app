import { Controller } from 'react-hook-form';

import { Box, Badge, Stack, Avatar, Typography } from '@mui/material';

import { Iconify } from '../../../src/components/iconify';
import ScoreNumberChange from './score-number-change';
import { formSetGoalControl } from '../context/form-set-goal-control';

import type { GoalItem } from '../hooks/use-goal-controller';

type ViewSetGoalsProps = {
  goal: GoalItem;
  index: number;
};

export default function ViewSetGoals({ goal, index }: ViewSetGoalsProps) {
  return (
    <Stack direction="row" alignItems="center" py={1}>
      <Badge
        badgeContent={
          <Box
            sx={{
              bgcolor: 'background.neutral',
              p: 0.5,
              width: 20,
              textAlign: 'center',
              borderRadius: 0.6,
              boxShadow: 5,
              aspectRatio: '1 / 1',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Iconify width={6} icon="mingcute:close-line" />
            {goal.weight}
          </Box>
        }
      >
        <Avatar
          sx={{
            bgcolor: goal.config.bgcolor,
            color: (t) => t.palette.getContrastText(goal.config.bgcolor),
            width: 32,
            height: 32,
          }}
        >
          <Iconify width={0.6} icon={goal.config.icon as any} />
        </Avatar>
      </Badge>
      <Typography noWrap typography="subtitle1" flex={1} ml={2}>
        {goal.name}
      </Typography>

      <Controller
        control={formSetGoalControl.control}
        name={`goals.${index}.targetScore`}
        render={({ field }) => <ScoreNumberChange value={field.value} onChange={field.onChange} />}
      />
    </Stack>
  );
}
