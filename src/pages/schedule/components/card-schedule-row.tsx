import { Stack } from '@mui/material';

import { DAY, CardCellSchedule } from './card-cell-schedule';

export function CardScheduleRow({ times, index, onAction }: CardScheduleRowProps) {
  return (
    <Stack direction="row" position="relative">
      {DAY.map((e) => (
        <CardCellSchedule key={e} subject={{} as Subject} onAction={() => onAction?.(index, e)} />
      ))}
    </Stack>
  );
}

type CardScheduleRowProps = {
  times: readonly [string, number];
  index: number;
  onAction?: (index: number, day: number) => void;
};
