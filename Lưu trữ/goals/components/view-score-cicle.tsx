import { memo, forwardRef } from 'react';

import { yellow } from '@mui/material/colors';
import { Box, Zoom, Avatar, CircularProgress } from '@mui/material';

import { Iconify } from '../../../src/components/iconify';
import { getTextColor } from '../../../src/utils/action-theme';

type ViewScoreCicleProps = {
  bgcolor?: string;
  score: number;
  size?: number;
};

const ViewScoreCicle = forwardRef<HTMLDivElement, ViewScoreCicleProps>(function ViewScoreCicle(
  { bgcolor, score, size = 100 },
  ref
) {
  const space = (size * 20) / 100;
  return (
    <Box ref={ref} position="relative" p={`${space}px`}>
      <Avatar
        variant="circular"
        sx={{
          boxShadow: 10,
          width: size,
          height: size,
          fontWeight: 900,
          bgcolor,
          color: getTextColor(bgcolor),
          fontSize: size / 2.5,
        }}
      >
        {score.toFixed(1)}
      </Avatar>
      <CircularProgress
        size={size + space * 2}
        variant="determinate"
        value={score * 10}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          '& svg circle': { stroke: bgcolor, strokeLinecap: 'round' },
        }}
      />
      <Zoom in={score === 10} timeout={400}>
        <Iconify
          width={space * 2}
          sx={{
            rotate: '-45deg',
            position: 'absolute',
            top: -space,
            left: -(space * 0.5),
            transformOrigin: 'center bottom',
            color: yellow[600],
          }}
          icon="solar:crown-line-line-duotone"
        />
      </Zoom>
    </Box>
  );
});

export default memo(ViewScoreCicle);
