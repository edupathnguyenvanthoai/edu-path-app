import type { Theme, SxProps } from '@mui/material';

import { Zoom, Stack, ButtonBase } from '@mui/material';

import { Iconify } from './iconify';
import { getTextColor } from '../../utils/action-theme';

type IconPickerProps = {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  color?: string;
  size?: number;
};

const buttonSx = (size: number, color?: string): SxProps<Theme> => ({
  width: size,
  height: size,
  borderRadius: 1,
  overflow: 'hidden',
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  '& .effect': {
    position: 'absolute',
    left: 0,
    right: 0,
    width: size,
    height: size,
    borderRadius: 1,
    transition: 'all 0.3s ease-in-out',
    zIndex: 0,
    boxShadow: 10,
    ...(color
      ? {
          bgcolor: color,
          color: getTextColor(color),
        }
      : {
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
        }),
  },
});

export default function IconPicker({
  value,
  onChange,
  options = [],
  color,
  size = 36,
}: IconPickerProps) {
  const selectedSx = {
    color: getTextColor(color),
  };

  return (
    <Stack direction="row" flexWrap="wrap">
      {options.map((name) => {
        const isSelected = name === value;
        return (
          <ButtonBase
            key={name}
            sx={{ ...buttonSx(size, color), ...((isSelected && selectedSx) || {}) }}
            onClick={() => onChange(name)}
          >
            <Zoom in={isSelected} mountOnEnter unmountOnExit>
              <div className="effect" />
            </Zoom>
            <Iconify sx={{ zIndex: 2 }} icon={name as any} />
          </ButtonBase>
        );
      })}
    </Stack>
  );
}
