import type { BoxProps } from '@mui/material';

import { forwardRef } from 'react';

import { yellow } from '@mui/material/colors';
import { Box, Zoom, Stack, Avatar, CircularProgress } from '@mui/material';

import { Iconify } from 'src/components/iconify';

import { getColorScore } from '../utils/util-color-score';

type ViewScoreCicleProps = BoxProps & {
  score: number;
  size?: number;
};

const ViewCircularScore = forwardRef<HTMLDivElement, ViewScoreCicleProps>(
  function ViewCircularScore({ score, size = 100, ...props }, ref) {
    const space = (size * 20) / 100;
    const bgcolor = getColorScore(score);

    return (
      <Stack ref={ref} alignItems="center" justifyContent="center" {...props}>
        <Box position="relative" p={`${space}px`}>
          <Avatar
            variant="circular"
            sx={{
              boxShadow: 10,
              width: size,
              height: size,
              fontWeight: 900,
              bgcolor,
              color: 'white',
              textShadow: '0 5px 10px #0005',
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
      </Stack>
    );
  }
);

export default ViewCircularScore;
