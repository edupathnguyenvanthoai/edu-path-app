import { useMemo } from 'react';
import { useWatch } from 'react-hook-form';
import { useLiveQuery } from 'dexie-react-hooks';

import {
  Tab,
  Box,
  Stack,
  Alert,
  Dialog,
  Button,
  Collapse,
  Typography,
  AlertTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

import { db } from '../../../schema/schema';
import { ViewTabDetail } from './view-tab-detail';
import { Label } from '../../../components/label';
import { useExpand } from './card-item-goal-view';
import { ViewTabOverview } from './view-tab-overview';
import ViewCircularScore from './view-circular-score';
import ButtonTabsGroup from '../../../components/button-tabs-group';
import { tabs, useDialogConfigGoal } from '../hooks/use-dialog-config-goal';
import { CardViewSubjectSumaryExam } from './card-view-subject-sumary-exam';
import { handleScoreChange, GoalConfigFormControl } from '../context/goal-config-form-control';


export function DialogConfigGoals() {
  const { setFalse } = useExpand();
  const { open, onClose, tab, setTab } = useDialogConfigGoal();
  const examTypeMap = useLiveQuery(
    async () => new Map((await db.examTypes.toArray()).map((e) => [e.id!, e]))
  );
  const [color, icon, name, goals = []] = useWatch({
    control: GoalConfigFormControl.control,
    name: ['subject.config.color', 'subject.config.icon', 'subject.name', 'goals'],
  });

  const { checkField, avgScore, isAvgAll } = useMemo(() => {
    const _checkField = goals.reduce(
      (prev, current) => {
        prev[current.examTypeId!] = (prev[current.examTypeId!] ?? 0) + 1;
        return prev;
      },
      {} as Record<number, number>
    );

    const _avgScore = handleScoreChange.getAvgScore(examTypeMap ?? new Map(), goals);
    const _isAvgAll = goals.every((goal) => goal.targetScore === _avgScore);
    return {
      checkField: _checkField,
      avgScore: _avgScore,
      isAvgAll: _isAvgAll,
    };
  }, [examTypeMap, goals]);

  return (
    <Dialog open={open}>
      <DialogContent dividers sx={{ borderTop: 'none', pt: 0 }}>
        <Box
          sx={{
            position: 'sticky',
            top: 0,
            zIndex: 30,
            backdropFilter: 'blur(4px)',
            width: 1,
          }}
        >
          <Typography variant="h5" my={2}>
            Cập nhật mục tiêu
          </Typography>
          <Stack direction="row" alignItems="center">
            <ButtonTabsGroup
              value={tab}
              onChange={(_, v) => {
                setTab(v);
                setFalse();
              }}
            >
              {tabs.map((t) => (
                <Tab key={t} label={t} value={t} />
              ))}
            </ButtonTabsGroup>
            <ViewCircularScore
              score={avgScore}
              size={38}
              sx={{
                ml: 'auto',
                mr: 1,
              }}
            />
          </Stack>
        </Box>
        {examTypeMap && <CardViewSubjectSumaryExam name={name} icon={icon} color={color} checkField={checkField} examTypeMap={examTypeMap} />}
        <Box>
          <Collapse in={tabs[0] === tab} mountOnEnter unmountOnExit>
            <ViewTabOverview defaultScore={avgScore} />
            <Collapse in={!isAvgAll}>
              <Alert severity="warning">
                <AlertTitle>Cập nhật lại mục tiêu</AlertTitle>
                Môn học <Label>{name}</Label> đã được tinh chỉnh cho từng bài kiểm tra, khi bạn thay
                đổi điểm số thì các mục tiêu của mỗi bài kiểm tra sẽ được trở lại thành điểm trung
                bình cộng.
              </Alert>
            </Collapse>
          </Collapse>
          <Collapse in={tabs[1] === tab} mountOnEnter unmountOnExit>
            {examTypeMap && <ViewTabDetail examTypeMap={examTypeMap} checkField={checkField} />}
          </Collapse>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button color="inherit" onClick={onClose}>
          Đóng
        </Button>
        <Button variant="contained">Cập nhật</Button>
      </DialogActions>
    </Dialog>
  );
}
