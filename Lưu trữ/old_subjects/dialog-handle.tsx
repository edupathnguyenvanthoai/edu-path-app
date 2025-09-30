import { useState, useEffect } from 'react';
import { useWatch, useFormState } from 'react-hook-form';

import {
  Tab,
  Box,
  Dialog,
  Button,
  Collapse,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

import { Iconify } from '../../components/iconify';
import { formControl } from './context/formControl';
import ButtonDelete from '../../components/button-delete';
import ContentStructIcon from './components/content-struct-icon';
import ButtonTabsGroup from '../../components/button-tabs-group';
import ContentStructExams from './components/content-struct-exams';
import useDialogHandleSubject from './hooks/use-dialog-handle-subject';
import ContentStructInformation from './components/content-struct-information';

export function DialogHandleSubject() {
  const [tab, setTab] = useState<'exams' | 'information' | 'icon'>('information');
  const state = useFormState({ control: formControl.control });
  const { open, closeDialog, handleSubject, handleRemove } = useDialogHandleSubject();
  const [id] = formControl.watch(['id']);
  const title = id ? 'Cập nhật' : 'Tạo mới môn học';
  const okText = 'Lưu lại';

  useEffect(() => {
    if (!open) {
      setTab('information');
    }
  }, [open]);

  return (
    <Dialog open={open} scroll="body" sx={{ overflow: 'unset' }}>
      <DialogTitle display="flex" alignItems="center">
        <Box flex={1}>{title}</Box>
        {id && <ButtonDelete onDelete={handleRemove} />}
      </DialogTitle>
      <DialogContent sx={{ overflow: 'unset' }}>
        <ButtonTabsGroup value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 2 }}>
          <Tab value="information" label="Thông tin" />
          <Tab value="exams" label="Bài kiểm tra" />
          <Tab value="icon" label="Biểu tượng" />
        </ButtonTabsGroup>

        <Collapse in={tab === 'information'}>
          <ContentStructInformation />
        </Collapse>
        <Collapse in={tab === 'exams'}>
          <ContentStructExams />
        </Collapse>
        <Collapse in={tab === 'icon'} mountOnEnter unmountOnExit>
          <ContentStructIcon />
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
