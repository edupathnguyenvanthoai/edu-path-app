import { Box, Stack } from '@mui/material';

import { DAY, CardCellSchedule } from './card-cell-schedule';

export function CardScheduleRow({ times, index, onAction, mode, day }: CardScheduleRowProps) {
  return (
    <>
      <Stack direction="row" position="relative">
        {DAY.map((e) => (
          <CardCellSchedule
            key={e}
            active={day === e}
            subject={{} as Subject}
            onAction={() => onAction?.(index, e)}
          />
        ))}
      </Stack>
      {mode === 'Tất cả' && [4, 9].includes(index) && <Box height={(t) => t.spacing(4)} />}
    </>
  );
}

type CardScheduleRowProps = {
  times: readonly [string, number];
  index: number;
  onAction?: (index: number, day: number) => void;
  mode: string;
  day: number;
};
