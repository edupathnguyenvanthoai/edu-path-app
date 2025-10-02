import { useMemo, useEffect } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { useWatch, useFormState } from 'react-hook-form';

import {
  Tab,
  Box,
  Stack,
  Dialog,
  Button,
  Collapse,
  Typography,
  DialogContent,
  DialogActions,
} from '@mui/material';

import { db } from '../../../schema/schema';
import { getGoals } from '../hooks/use-goals';
import { ViewTabDetail } from './view-tab-detail';
import { useExpand } from './card-item-goal-view';
import { useParams } from '../../../utils/use-params';
import { ViewTabOverview } from './view-tab-overview';
import ViewCircularScore from './view-circular-score';
import { tabs } from '../hooks/use-dialog-config-goal';
import ButtonTabsGroup from '../../../components/button-tabs-group';
import { CardViewSubjectSumaryExam } from './card-view-subject-sumary-exam';
import {
  onUpdateSubmit,
  handleScoreChange,
  GoalConfigFormControl,
} from '../context/goal-config-form-control';

export function DialogConfigGoals() {
  const { isSubmitting, isSubmitSuccessful } = useFormState(GoalConfigFormControl);
  const { setFalse } = useExpand();
  const examTypeMap = useLiveQuery(
    async () => new Map((await db.examTypes.toArray()).map((e) => [e.id!, e]))
  );

  const [{ subjectId, tab }, setParams] = useParams({
    tab: tabs[0],
    subjectId: -1,
  });

  const [color, icon, name, goals = []] = useWatch({
    control: GoalConfigFormControl.control,
    name: ['subject.config.color', 'subject.config.icon', 'subject.name', 'goals'],
  });

  const { checkField, avgScore } = useMemo(() => {
    const _checkField = goals.reduce(
      (prev, current) => {
        prev[current.examTypeId!] = (prev[current.examTypeId!] ?? 0) + 1;
        return prev;
      },
      {} as Record<number, number>
    );

    const _avgScore = handleScoreChange.getAvgScore(examTypeMap ?? new Map(), goals);
    return {
      checkField: _checkField,
      avgScore: _avgScore,
    };
  }, [examTypeMap, goals]);

  useEffect(() => {
    if (subjectId !== -1 && typeof subjectId === 'number') {
      getGoals(subjectId).then(GoalConfigFormControl.reset);
    }
  }, [subjectId]);

  useEffect(() => {
    if (isSubmitSuccessful && subjectId !== -1) {
      setParams();
      GoalConfigFormControl.reset();
    }
  }, [isSubmitSuccessful, setParams, subjectId]);

  return (
    <Dialog open={subjectId !== -1}>
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
                setParams({ tab: v });
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
        {examTypeMap && (
          <CardViewSubjectSumaryExam
            name={name}
            icon={icon}
            color={color}
            checkField={checkField}
            examTypeMap={examTypeMap}
          />
        )}
        <Box>
          <Collapse in={tabs[0] === tab} mountOnEnter unmountOnExit>
            <ViewTabOverview defaultScore={avgScore} />
          </Collapse>
          <Collapse in={tabs[1] === tab}>
            <ViewTabDetail examTypeMap={examTypeMap!} />
          </Collapse>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button disabled={isSubmitting} color="inherit" onClick={() => setParams()}>
          Đóng
        </Button>
        <Button loading={isSubmitting} variant="contained" onClick={onUpdateSubmit}>
          Cập nhật
        </Button>
      </DialogActions>
    </Dialog>
  );
}
