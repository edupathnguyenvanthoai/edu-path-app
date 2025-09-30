import type { ButtonProps } from '@mui/material';

import { useState } from 'react';

import { Button, Collapse, Typography, ClickAwayListener } from '@mui/material';

import { Iconify } from '../iconify';

export type ButtonDeleteProps = ButtonProps & {
  onDelete: () => void;
  show?: boolean;
};
export default function ButtonDelete({ onDelete, show = true, ...props }: ButtonDeleteProps) {
  const [delIndex, setDelIndex] = useState(-1);
  if (!show) return null;
  return (
    <ClickAwayListener onClickAway={() => delIndex !== -1 && setDelIndex(-1)}>
      <Button
        {...props}
        color={delIndex !== -1 ? 'error' : 'inherit'}
        onClick={() => (delIndex !== -1 ? onDelete() : setDelIndex(1))}
      >
        <Iconify icon="solar:trash-bin-trash-bold" />
        <Collapse in={delIndex !== -1} orientation="horizontal">
          <Typography variant="button" ml={1} noWrap>
            Nhấn để xoá
          </Typography>
        </Collapse>
      </Button>
    </ClickAwayListener>
  );
}
