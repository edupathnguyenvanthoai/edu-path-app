import type { Theme, SxProps } from '@mui/material';

import { Slider } from '@mui/material';

type SliderScoreProps = {
  value: number;
  onChange?: (value: number) => void;
  bgcolor?: string;
  height?: number;
  sx?: SxProps<Theme>;
};

const marks = [0, 3.5, 5, 6.5, 8, 10].map((v) => ({
  value: v,
  label: v.toFixed(1),
}));

export function SliderScore({ value, onChange, bgcolor, height = 10, sx }: SliderScoreProps) {
  return (
    <Slider
      step={0.25}
      min={0}
      max={10}
      defaultValue={0}
      value={value}
      onChange={(_, v) => onChange?.(v)}
      sx={{
        height,
        color: bgcolor,
        ...sx,
      }}
      marks={marks}
    />
  );
}
