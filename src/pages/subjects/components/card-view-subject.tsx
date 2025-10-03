import type { ReactNode } from 'react';

import { Box, Card, Stack, Avatar, Typography, AvatarGroup, CardActionArea } from '@mui/material';

import { getTextColor } from 'src/utils/action-theme';

import { Iconify } from 'src/components/iconify';

import { Label } from '../../../components/label';
import { getColorScore } from '../../goals/utils/util-color-score';

type CardViewSubjectProps = {
  subject: Subject;
  action?: ReactNode;
  onClick?: () => void;
  score?: Score[];
};
export function CardViewSubject({ subject, action, onClick, score }: CardViewSubjectProps) {
  console.log(score);
  
  return (
    <Card sx={{ height: 1 }}>
      <CardActionArea disabled={!onClick} onClick={onClick}>
        <Stack
          height={1}
          p={2}
          gap={1}
          overflow="hidden"
          alignItems="center"
          justifyContent="center"
        >
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
          <Stack direction="row" spacing={0.5}>
            <Label>{subject.category}</Label>
            <Label>x{subject.weight}</Label>
          </Stack>
          <Typography variant="caption">{subject.admissionGroups.join(', ')}</Typography>
          {score && score.length > 0 && (
            <AvatarGroup>
              {score.map((i) => (
                <Avatar sx={{ bgcolor: getColorScore(i.score), width: 24, height: 24 }} key={i.id}>
                  {i.score.toFixed(1)}
                </Avatar>
              ))}
            </AvatarGroup>
          )}
        </Stack>
      </CardActionArea>
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
