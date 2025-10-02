import type { ReactNode } from 'react';

import { Box, Card, Stack, Avatar, Typography } from '@mui/material';

import { getTextColor } from 'src/utils/action-theme';

import { Iconify } from 'src/components/iconify';

import { Label } from '../../../components/label';

type CardViewSubjectProps = { subject: Subject; action?: ReactNode;  };
export function CardViewSubject({ subject, action }: CardViewSubjectProps) {
  return (
    <Card sx={{ height: 1 }}>
      <Stack height={1} p={2} gap={1} overflow="hidden" alignItems="center" justifyContent="center">
        <Avatar
          variant="circular"
          sx={{
            my: 2,
            width: 60,
            height: 60,
            bgcolor: subject.config.color,
            color: getTextColor(subject.config.color),
          }}
        >
          <Iconify width={0.5} icon={subject.config.icon as any} />
        </Avatar>
        <Box flex={1} display="flex" justifyContent="center" alignItems="center">
          <Typography
            textAlign="center"
            variant="h5"
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
        </Box>
        <Label>{subject.category}</Label>
        <Typography variant="caption">{subject.admissionGroups.join(', ')}</Typography>
      </Stack>
      {action && (
        <Stack
          spacing={1}
          direction="row"
          position="absolute"
          top={(t) => t.spacing(1)}
          right={(t) => t.spacing(1)}
        >
          {action}
        </Stack>
      )}
    </Card>
  );
}
