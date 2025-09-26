import { useBoolean } from 'ahooks';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { Dialog, Button, DialogTitle, DialogContent, DialogActions } from '@mui/material';

type ConformType<T = any> = {
  children: React.ReactElement<{ onClick?: React.MouseEventHandler }>;
  title: string;
  content: React.ReactNode;
  onConfirm: (p: T) => Promise<void>;
  defaultValues?: T;
  confirmText?: string;
  cancelText?: string;
};

export default function Conform({
  children,
  title,
  content,
  defaultValues,
  onConfirm,
  confirmText = 'Xác nhận',
  cancelText = 'Huỷ',
}: ConformType) {
  const [open, { setTrue, setFalse }] = useBoolean(false);
  const form = useForm<typeof defaultValues>({ defaultValues });
  const id = React.useId();
  const childWithProps = React.cloneElement(children, {
    ...children.props,
    onClick: (...e) => {
      setTrue();
      if (children.props.onClick) {
        children.props.onClick(...e);
      }
    },
  });

  useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      setFalse();
    }
  }, [form.formState.isSubmitSuccessful, setFalse]);

  return (
    <>
      {childWithProps}
      <Dialog id={`confirm-dialog-${id}`} open={open}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{content}</DialogContent>
        <DialogActions>
          <Button loading={form.formState.isSubmitting} color="inherit" onClick={() => setFalse()}>
            {cancelText}
          </Button>
          <Button
            loading={form.formState.isSubmitting}
            variant="contained"
            onClick={form.handleSubmit(onConfirm)}
          >
            {confirmText}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
