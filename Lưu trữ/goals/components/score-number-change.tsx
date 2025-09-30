import { useId } from 'react';

import { Stack, IconButton, OutlinedInput } from '@mui/material';

import { Iconify } from '../../../src/components/iconify';
import { changeScrore, getScoreColor } from '../utils/score';

export type ScoreNumberChangeProps = {
  value: number | string;
  onChange: (value: number | string) => void;
};

export default function ScoreNumberChange({ value, onChange }: ScoreNumberChangeProps) {
  const id = useId();

  return (
    <Stack direction="row" alignItems="center" spacing={0.5} mr={-1}>
      <IconButton
        tabIndex={-1}
        disabled={value === 0}
        onClick={() => onChange(changeScrore(value, -0.25))}
        size="small"
        color="inherit"
        sx={{ borderRadius: 1 }}
      >
        <Iconify scale={-1} icon="eva:arrow-ios-forward-fill" />
      </IconButton>
      <OutlinedInput
        value={value}
        name={`score-${id}`}
        onChange={(e) => onChange(changeScrore(e.target.value))}
        onFocus={(e) => e.target.select()}
        onBlur={(e) => onChange(Math.floor(Number(e.target.value) * 4) / 4)}
        sx={{
          height: 32,
          width: 50,
          '& input': {
            px: 0,
            textAlign: 'center',
          },
        }}
      />
      <IconButton
        tabIndex={-1}
        disabled={value === 10}
        onClick={() => onChange(changeScrore(value, 0.25))}
        size="small"
        color="inherit"
        sx={{ borderRadius: 1 }}
      >
        <Iconify icon="eva:arrow-ios-forward-fill" />
      </IconButton>
    </Stack>
  );
}
