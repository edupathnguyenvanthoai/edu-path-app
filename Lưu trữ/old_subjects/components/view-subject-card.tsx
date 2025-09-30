import type { ReactNode } from 'react';

import { Box, Card, Stack, Avatar, Typography } from '@mui/material';

import { Label } from '../../../components/label';
import { Iconify } from '../../../components/iconify';
import { getTextColor } from '../../../utils/action-theme';

type ViewSubjectCardProps = {
  subject: Subject;
  action?: ReactNode;
};

export default function ViewSubjectCard({ subject, action }: ViewSubjectCardProps) {
  return (
    <Card component={Stack} alignItems="center" p={3} height={1} gap={0.5} position="relative">
      <Avatar
        variant="circular"
        sx={{
          height: 60,
          width: 60,
          boxShadow: 10,
          bgcolor: subject.config.color,
          color: getTextColor(subject.config.color),
        }}
      >
        <Iconify width={0.5} icon={subject.config.icon as any} />
      </Avatar>
      <Typography
        variant="h6"
        textAlign="center"
        flex={1}
        sx={{
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          WebkitLineClamp: 2,
        }}
      >
        {subject.name}
      </Typography>
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
