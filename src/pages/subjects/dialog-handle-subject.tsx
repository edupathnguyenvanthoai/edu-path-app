import { useEffect } from 'react';
import { Controller, useFormState } from 'react-hook-form';

import {
  Stack,
  Dialog,
  Button,
  MenuItem,
  TextField,
  DialogTitle,
  DialogActions,
  DialogContent,
} from '@mui/material';

import { formControl } from './context-form';
import { LABEL_VIEW } from '../../db/mapping';
import { db, SUBJECT_CATEGORIES } from '../../db/schema';
import IconField from '../../components/iconify/icon-field';
import ColorField from '../../components/color-utils/color-field';

export function DialogHandleSubject() {
  const open = formControl.watch('_open');
  const id = formControl.watch('id');
  const bgcolor = formControl.watch('color');

  const handleAction = formControl.handleSubmit(async (data) => {
    if (id) {
      await db.subjects.update(id, data);
    } else {
      await db.subjects.add(data);
    }
  });
  const formState = useFormState(formControl);
  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      formControl.setValue('_open', false);
    }
  }, [formState.isSubmitSuccessful]);
  return (
    <Dialog disablePortal open={open} scroll="body">
      <DialogTitle>{id ? 'Cập nhật môn học' : 'Thêm môn học'}</DialogTitle>
      <Stack component={DialogContent} overflow="visible" spacing={3}>
        <Controller
          name="name"
          control={formControl.control}
          defaultValue=""
          rules={{
            required: 'Vui lòng nhập tên môn học',
            maxLength: { value: 16, message: 'Tên môn học nhiều nhất 16 ký tự' },
            minLength: { value: 2, message: 'Tên môn học phải nhất 2 ký tự' },
          }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Tên môn học"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              fullWidth
              required
            />
          )}
        />
        <Controller
          name="category"
          control={formControl.control}
          rules={{ required: 'Vui lòng chọn loại môn học' }}
          defaultValue={'' as any}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="Phân loại"
              error={!!error}
              helperText={error?.message}
              fullWidth
              select
            >
              {SUBJECT_CATEGORIES.map((category) => (
                <MenuItem key={category} value={category}>
                  {LABEL_VIEW[category]}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
        <Controller
          name="color"
          control={formControl.control}
          rules={{ required: 'Vui lòng chọn màu môn học' }}
          defaultValue={'' as any}
          render={({ field, fieldState: { error } }) => (
            <ColorField
              error={!!error}
              helperText={error?.message}
              value={field.value}
              onChange={(color) => field.onChange(color)}
            />
          )}
        />
        <Controller
          name="icon"
          control={formControl.control}
          rules={{ required: 'Vui lòng chọn biểu tượng môn học' }}
          defaultValue={'' as any}
          render={({ field, fieldState: { error } }) => (
            <IconField
              error={!!error}
              helperText={error?.message}
              value={field.value}
              onChange={(v) => field.onChange(v)}
              sx={{
                '& button.active': {
                  bgcolor,
                  color: (t) => bgcolor && t.palette.getContrastText(bgcolor),
                },
              }}
            />
          )}
        />
      </Stack>

      <DialogActions>
        <Button
          disabled={formState.isSubmitting}
          onClick={() => formControl.setValue('_open', false)}
        >
          Huỷ
        </Button>
        <Button loading={formState.isSubmitting} variant="contained" onClick={handleAction}>
          Lưu lại
        </Button>
      </DialogActions>
    </Dialog>
  );
}
