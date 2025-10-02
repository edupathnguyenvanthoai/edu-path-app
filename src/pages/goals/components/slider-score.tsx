import type { Theme, SxProps } from '@mui/material';

import { Box, Slider } from '@mui/material';

import { rangScore, getColorScore } from '../utils/util-color-score';

type SliderScoreProps = {
  defaultValue?: number;
  value: number;
  onChange?: (value: number) => void;
  height?: number;
  sx?: SxProps<Theme>;
  disabled?: boolean;
};

const marks = rangScore.map((v) => ({
  value: v,
  label: v.toFixed(1),
}));

export function SliderScore({ value, onChange, height = 12, disabled, sx }: SliderScoreProps) {
  return (
    <Box
      sx={{
        px: 2,
        ...sx,
      }}
    >
      <Slider
        disabled={disabled}
        min={0}
        max={10}
        value={value}
        step={0.25}
        marks={marks}
        className="slider-score"
        onChange={(_, v) => onChange?.(v)}
        sx={{
          color: getColorScore(value),
          height,
        }}
      />
    </Box>
  );
}
