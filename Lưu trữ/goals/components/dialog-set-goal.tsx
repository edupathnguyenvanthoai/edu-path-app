import { toast } from 'sonner';
import { useState, useEffect } from 'react';
import { Controller, useFormState } from 'react-hook-form';

import {
  Box,
  Tab,
  Zoom,
  Stack,
  Alert,
  Avatar,
  Dialog,
  Button,
  Collapse,
  Typography,
  AlertTitle,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

import { SliderScore } from './slider';
import ViewSetGoals from './view-set-goals';
import ViewScoreCicle from './view-score-cicle';
import { Label } from '../../../src/components/label';
import { Iconify } from '../../../src/components/iconify';
import { updateGoals } from '../hooks/use-goal-controller';
import ButtonTabsGroup from '../../../src/components/button-tabs-group';
import { TabView, TabViewItem } from '../../../src/components/tab-view';
import { formSetGoalControl } from '../context/form-set-goal-control';
import { getAvgScore, checkAvgScore, getScoreColor } from '../utils/score';

type DialogSetGoalProps = {
  open: boolean;
  onClose: () => void;
};

const typeTab = ['Mục tiêu chung', 'Mục tiêu chi tiết'];

export default function DialogSetGoal({ open, onClose }: DialogSetGoalProps) {
  const [tab, setTab] = useState(0);
  const { isSubmitSuccessful, isSubmitting } = useFormState(formSetGoalControl);
  const [name, config] = formSetGoalControl.watch(['name', 'config']);
  const goals = formSetGoalControl.watch('goals') ?? [];
  const isAvgScore = checkAvgScore(goals);
  const score = getAvgScore(goals);
  const bgcolor = getScoreColor(score);

  useEffect(() => {
    if (isSubmitSuccessful) {
      const nameSubject = formSetGoalControl.getValues('name');
      toast.success(`Đã cập nhật mục tiêu cho "${nameSubject}"`);
      onClose();
    }
  }, [isSubmitSuccessful, onClose]);

  return (
    <Dialog open={open}>
      <DialogTitle>
        <Stack direction="row" spacing={1} alignItems="center">
          <Avatar
            sx={{
              bgcolor: config?.color,
              color: (t) => t.palette.getContrastText(config?.color),
            }}
          >
            <Iconify width={0.6} icon={config?.icon as any} />
          </Avatar>
          <Stack flex={1}>
            <Typography variant="body2">Đặt mục tiêu cho</Typography>
            <Box textTransform="uppercase" fontWeight="900">
              {name}
            </Box>
          </Stack>
          <Zoom in={tab === 1}>
            <Avatar
              variant="circular"
              sx={{ fontSize: '0.8em', bgcolor, color: (t) => t.palette.getContrastText(bgcolor) }}
            >
              {score.toFixed(1)}
            </Avatar>
          </Zoom>
        </Stack>
      </DialogTitle>
      <DialogContent dividers>
        <ButtonTabsGroup value={tab} onChange={(_, v) => setTab(v)}>
          {typeTab.map((val, index) => (
            <Tab key={index} value={index} label={val} />
          ))}
        </ButtonTabsGroup>
        <TabView tab={tab}>
          <TabViewItem value={0} mountOnEnter unmountOnExit>
            <Stack my={2}>
              <Stack justifyContent="center" alignItems="center" spacing={2} px={2}>
                <Typography variant="body1">
                  Tổng cộng: <Label>{goals.length}</Label> bài kiểm tra
                </Typography>
                <ViewScoreCicle bgcolor={bgcolor} score={score} size={120} />
                <Controller
                  control={formSetGoalControl.control}
                  name="goals"
                  render={({ field: { value, onChange } }) => (
                    <SliderScore
                      value={score}
                      onChange={(v) => {
                        onChange(value.map((x) => ({ ...x, targetScore: v })));
                      }}
                      bgcolor={bgcolor}
                    />
                  )}
                />
              </Stack>
              <Collapse in={!isAvgScore} sx={{ mt: 4 }}>
                <Alert severity="info">
                  <AlertTitle>Đã có sự tinh chỉnh chi tiết</AlertTitle>
                  Khi bạn đặt lại điểm tổng mục tiêu thì tinh chỉnh chi tiết sẽ trở lại mặc định
                  (trung bình cộng)
                </Alert>
              </Collapse>
            </Stack>
          </TabViewItem>
          <TabViewItem value={1} mountOnEnter unmountOnExit>
            <Box mt={2}>
              {goals.map((goal, index) => (
                <ViewSetGoals key={index} goal={goal} index={index} />
              ))}
            </Box>
          </TabViewItem>
        </TabView>
      </DialogContent>
      <DialogActions>
        <Button loading={isSubmitting} onClick={onClose} color="inherit">
          Đóng
        </Button>
        <Button
          loading={isSubmitting}
          variant="contained"
          startIcon={<Iconify icon="solar:diskette-bold" />}
          onClick={formSetGoalControl.handleSubmit(updateGoals)}
        >
          Lưu lại
        </Button>
      </DialogActions>
    </Dialog>
  );
}
