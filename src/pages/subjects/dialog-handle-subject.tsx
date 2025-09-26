import { Controller } from 'react-hook-form';

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
import { SUBJECT_CATEGORIES } from '../../db/schema';
import ColorField from '../../components/color-utils/color-field';

type DialogHandleSubjectProps = {
  open: boolean;
  setFalse: () => void;
};

export function DialogHandleSubject({ open, setFalse }: DialogHandleSubjectProps) {
  return (
    <Dialog open={open} scroll="body">
      <DialogTitle>Thêm Môn Học</DialogTitle>
      <Stack component={DialogContent} overflow="visible" spacing={3}>
        <Controller
          name="name"
          control={formControl.control}
          rules={{ required: 'Vui lòng nhập tên môn học' }}
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
          defaultValue={SUBJECT_CATEGORIES[0]}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Phân loại"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
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
          defaultValue="#2196f3"
          render={({ field }) => (
            <ColorField value={field.value} onChange={(color) => field.onChange(color)} />
          )}
        />
      </Stack>

      <DialogActions>
        <Button onClick={() => setFalse()}>Huỷ</Button>
        <Button variant="contained">Xác nhận</Button>
      </DialogActions>
    </Dialog>
  );
}
