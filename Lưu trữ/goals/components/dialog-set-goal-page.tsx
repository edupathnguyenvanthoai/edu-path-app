import { Stack, Dialog, Button, Container } from '@mui/material';

import { SetGoal } from './set-goal';
import { Iconify } from '../../../src/components/iconify';
import Header from '../../../src/components/layout/header';
import { usePadding } from '../../../src/config-capacitor';

import type { SubjectGoalData } from '../hooks/use-goal-controller';

type DialogSetGoalProps = {
  open: boolean;
  listSubject: SubjectGoalData[];
  onClose: () => void;
};

export default function DialogSetGoalPage({ open, onClose, listSubject }: DialogSetGoalProps) {
  const { top } = usePadding();
  return (
    <Dialog open={open} fullScreen>
      <Container maxWidth="xs">
        <Stack spacing={1} pt={top}>
          <Header
            title="Đặt mục tiêu"
            action={
              <Button
                color="inherit"
                onClick={onClose}
                startIcon={<Iconify icon="mingcute:close-line" />}
              >
                Đóng
              </Button>
            }
          />
          <SetGoal listGoal={listSubject} />
        </Stack>
      </Container>
    </Dialog>
  );
}
