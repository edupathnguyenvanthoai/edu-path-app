import { useDebounce } from 'ahooks';
import { useWatch } from 'react-hook-form';
import { useRef, useState, useEffect, useCallback, useDeferredValue } from 'react';

import { Alert, Stack, Button, Collapse, AlertTitle } from '@mui/material';

import { SliderScore } from './slider-score';
import ViewScoreCicle from './view-circular-score';
import { Iconify } from '../../../components/iconify';
import { GoalConfigFormControl } from '../context/goal-config-form-control';

type ViewTabOverviewProps = {
  defaultScore: number;
};

const changeFormAvgScore = (score: number) => {
  const goal = GoalConfigFormControl.getValues('goals');

  GoalConfigFormControl.setValue(
    'goals',
    goal.map((item) => ({
      ...item,
      targetScore: score,
    }))
  );
};

export function ViewTabOverview({ defaultScore: _defaultScore }: ViewTabOverviewProps) {
  const [score, _setScore] = useState(_defaultScore);
  const [isAvgAll, setAvgAll] = useState(false);
  const isManualChange = useRef(false);
  const _score = useDebounce(score, { wait: 100 });
  const defaultScore = useDeferredValue(_defaultScore);
  const [goals] = useWatch({
    control: GoalConfigFormControl.control,
    name: ['goals'],
  });
  useEffect(() => {
    if (goals) {
      const [first, ...rest] = goals;
      setAvgAll(!rest.every((goal) => goal.targetScore === first.targetScore));
    }
  }, [goals]);
  useEffect(() => {
    if (_score.toFixed(2) !== defaultScore.toFixed(2)) {
      if (isManualChange.current) {
        isManualChange.current = false;
        changeFormAvgScore(_score);
      } else {
        _setScore(defaultScore);
      }
    }
  }, [_score, defaultScore]);

  const setScore = useCallback((s: number) => {
    isManualChange.current = true;
    _setScore(s);
  }, []);

  return (
    <>
      <Stack spacing={2} mt={3}>
        <ViewScoreCicle score={score} size={130} sx={{ mx: 'auto' }} />
        <SliderScore disabled={isAvgAll} value={score} onChange={setScore} />
      </Stack>
      <Collapse in={isAvgAll} mountOnEnter unmountOnExit>
        <Alert severity="warning">
          <AlertTitle>Cập nhật lại mục tiêu</AlertTitle>
          Môn học đã được tinh chỉnh cho từng bài kiểm tra, khi bạn thay đổi điểm số thì các mục
          tiêu của mỗi bài kiểm tra sẽ được trở lại thành điểm trung bình cộng.
          <Button
            size="small"
            onClick={() => setAvgAll(false)}
            color="inherit"
            startIcon={<Iconify icon="solar:shield-keyhole-bold-duotone" />}
          >
            Bắt đầu cập nhật
          </Button>
        </Alert>
      </Collapse>
    </>
  );
}
