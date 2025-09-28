import { useSearchParams } from 'react-router-dom';
import { useWatch, useFormState } from 'react-hook-form';

import {
  Tab,
  Box,
  Stack,
  Dialog,
  Button,
  Collapse,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

import { formControl } from './formControl';
import { Iconify } from '../../components/iconify';
import ContentStructExams from './content-struct-exams';
import ButtonDelete from '../../components/button-delete';
import ButtonTabsGroup from '../../components/button-tabs-group';
import useDialogHandleSubject from './use-dialog-handle-subject';
import ContentStructInformation from './content-struct-information';

export function DialogHandleSubject() {
  const [search, setSearch] = useSearchParams();
  const tab = search.get('tab-subject-config') || 'information';
  const state = useFormState({ control: formControl.control });
  const { open, closeDialog, handleSubject } = useDialogHandleSubject();
  const [id] = useWatch({ name: ['id'], control: formControl.control });
  const title = id ? 'Cập nhật' : 'Tạo mới';
  const okText = id ? 'Cập nhật' : 'Lưu lại';

  return (
    <Dialog
      open={open}
      scroll="body"
      sx={{ overflow: 'unset' }}
      slotProps={{
        transition: {
          unmountOnExit: true,
          mountOnEnter: true,
        },
      }}
    >
      <DialogTitle display="flex" alignItems="center">
        <Box flex={1}>{title}</Box>
        {id && <ButtonDelete onDelete={() => {}} />}
      </DialogTitle>
      <DialogContent sx={{ overflow: 'unset' }}>
        <Stack direction="row" mb={2} alignItems="center" justifyContent="end">
          <ButtonTabsGroup
            value={tab}
            onChange={(_, v) => {
              setSearch(
                (e) => {
                  if (v === 'information') e.delete('tab-subject-config');
                  else e.set('tab-subject-config', v);
                  return e;
                },
                { replace: true }
              );
            }}
          >
            <Tab value="information" label="Thông tin" />
            <Tab value="exams" label="Bài kiểm tra" />
          </ButtonTabsGroup>
        </Stack>

        <Collapse in={tab === 'information'}>
          <ContentStructInformation />
        </Collapse>
        <Collapse in={tab === 'exams'}>
          <ContentStructExams />
        </Collapse>
      </DialogContent>
      <DialogActions>
        <Button
          color="inherit"
          sx={{ mr: 'auto' }}
          disabled={!state.isDirty}
          startIcon={<Iconify icon="solar:restart-bold" />}
          onClick={() => formControl.reset()}
        >
          Trở lại
        </Button>
        <Button disabled={state.isLoading} color="inherit" onClick={closeDialog}>
          Đóng
        </Button>
        <Button
          variant="contained"
          disabled={!state.isDirty}
          loading={state.isSubmitting}
          startIcon={<Iconify icon="solar:diskette-bold" />}
          onClick={handleSubject}
        >
          {okText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
