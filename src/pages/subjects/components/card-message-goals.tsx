import type { Theme, SxProps } from '@mui/material';

import { Alert, Button, AlertTitle } from '@mui/material';

import { Iconify } from '../../../components/iconify';
import { RouterLink } from '../../../routes/components';

type CardMessageGoalProps = {
  goals: Goal[];
  subjectId?: number;
  sx?: SxProps<Theme>;
};

export function CardMessageGoal({ goals, subjectId, sx }: CardMessageGoalProps) {
  if (goals.length === 0)
    return (
      <Alert
        sx={sx}
        severity="warning"
        action={
          <Button
            LinkComponent={RouterLink}
            color="inherit"
            startIcon={<Iconify icon="solar:target-bold-duotone" />}
            href={`/goals?subject-id=${subjectId}`}
          >
            Nhập
          </Button>
        }
      >
        <AlertTitle>Chưa đặt mục tiêu</AlertTitle>
        Vui lòng hãy đặt mục tiêu để theo dỗi tiến dộ môn học này
      </Alert>
    );
}
