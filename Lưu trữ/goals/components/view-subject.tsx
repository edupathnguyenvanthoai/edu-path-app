import type { Theme, SxProps } from '@mui/material';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { Avatar, Divider, Typography } from '@mui/material';

import { Label } from '../../../src/components/label';
import { Iconify } from '../../../src/components/iconify';

type ViewSubjectProps = {
  subject: Subject;
  action?: React.ReactNode;
  sx?: SxProps<Theme>;
};

export default function ViewSubject({ subject, sx, action }: ViewSubjectProps) {
  return (
    <Card component={Stack} p={2} sx={sx} overflow="hidden" direction="row" alignItems="center">
      <Avatar
        sx={{
          bgcolor: subject.config.color,
          color: (t) => t.palette.getContrastText(subject.config.color),
        }}
      >
        <Iconify icon={subject.config.icon as any} />
      </Avatar>
      <Stack flex={1} overflow="hidden" ml={2}>
        <Typography variant="h6" noWrap>
          {subject.name}
        </Typography>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Label>{subject.category}</Label>
          {subject.admissionGroups.length && <Divider flexItem orientation="vertical" />}
          <Typography variant="caption" noWrap>
            {subject.admissionGroups.join(', ')}
          </Typography>
        </Stack>
      </Stack>
      {action}
    </Card>
  );
}
