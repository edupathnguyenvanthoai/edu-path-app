import { red, lime, amber, green, orange, yellow, lightGreen } from '@mui/material/colors';

import type { GoalItem } from '../hooks/use-goal-controller';

export const SCORE_DEFAULT = 8.0;

export const mapColor: [number, string][] = [
  [0, red[500]],
  [3.5, orange[800]],
  [5, amber[600]],
  [6.5, lime[600]],
  [8.0, lightGreen[700]],
  [10, green[700]],
];

export const getScoreColor = (score: number) => {
  if (score === 10) return yellow[600];
  for (let i = mapColor.length - 1; i >= 0; i--) {
    if (score >= mapColor[i][0]) {
      return mapColor[i][1];
    }
  }
  return yellow[600];
};

export const changeScrore = (score: string | number, mode: number = 0) => {
  if (typeof score === 'string' && score.endsWith('.')) return score;
  let scoreNumber = Number(score);
  if (isNaN(scoreNumber)) {
    return 0;
  }
  scoreNumber += mode;
  if (scoreNumber > 10) {
    return 10;
  }
  if (scoreNumber < 0) {
    return 0;
  }
  return scoreNumber;
};

export const getScore = (goals: GoalItem[]) =>
  goals.reduce(
    (t, x) => ({
      totalScore: t.totalScore + x.targetScore * x.weight,
      totalCount: t.totalCount + x.weight,
    }),
    { totalScore: 0, totalCount: 0 }
  );

export const getAvgScore = (goals: GoalItem[]) => {
  const { totalScore, totalCount } = getScore(goals);
  return Math.round((totalScore / totalCount) * 10) / 10;
};

export const checkAvgScore = (goals: GoalItem[]) => {
  if (!goals.length || goals.length === 1) return true;
  const [first, ...lst] = goals;
  return lst.every((x) => Math.round(x.targetScore * 100) === Math.round(first.targetScore * 100));
};



/*
function sortGoalItemDefault<T>(input: T[][]): T[] {
  const k = input[3].length;
  const result: T[] = [];
  for (let group = 0; group < k; group++) {
    for (const sub of input) {
      const n = sub.length;
      const base = Math.floor(n / k);
      const r = n % k;
      const size = group < k - r ? base : base + 1;
      if (size === 0) continue;
      let cum = 0;
      for (let g = 0; g < group; g++) {
        const sz = g < k - r ? base : base + 1;
        cum += sz;
      }
      result.push(...sub.slice(cum, cum + size));
    }
  }
  return result;
}
*/
