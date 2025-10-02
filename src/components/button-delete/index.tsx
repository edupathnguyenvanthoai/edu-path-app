import type { ButtonProps } from '@mui/material';

import { useState, useCallback } from 'react';

import { Button, Collapse, Typography, ClickAwayListener } from '@mui/material';

import { Iconify } from '../iconify';

export type ButtonDeleteProps = ButtonProps & {
  onDelete?: () => Promise<void> | void;
  show?: boolean;
};
export default function ButtonDelete({ onDelete, show = true, ...props }: ButtonDeleteProps) {
  const [delIndex, setDelIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const onClick = useCallback(async () => {
    if (delIndex !== -1) {
      setIsLoading(true);
      await onDelete?.();
      setDelIndex(-1);
      setIsLoading(false);
    } else setDelIndex(1);
  }, [delIndex, onDelete]);

  if (!show) return null;
  return (
    <ClickAwayListener onClickAway={() => delIndex !== -1 && setDelIndex(-1)}>
      <Button
        {...props}
        loading={isLoading}
        color={delIndex !== -1 ? 'error' : 'inherit'}
        onClick={onClick}
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
