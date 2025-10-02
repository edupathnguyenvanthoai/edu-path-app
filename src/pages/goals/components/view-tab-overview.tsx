import { useDebounce } from 'ahooks';
import { useRef, useState, useEffect, useCallback } from 'react';

import { Stack } from '@mui/material';

import { SliderScore } from './slider-score';
import ViewScoreCicle from './view-circular-score';
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
  const isManualChange = useRef(false);
  const _score = useDebounce(score, { wait: 100 });
  const defaultScore = useDebounce(_defaultScore, { wait: 500 });

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
    <Stack mt={3} spacing={2}>
      <ViewScoreCicle score={score} size={130} sx={{ mx: 'auto' }} />
      <SliderScore value={score} onChange={setScore} />
    </Stack>
  );
}
