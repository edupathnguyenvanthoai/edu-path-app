import { useFormState } from 'react-hook-form';
import { useMemo, useState, useCallback } from 'react';

import {
  Tab,
  Button,
  Dialog,
  Collapse,
  DialogTitle,
  DialogActions,
  DialogContent,
} from '@mui/material';

import { ContentIcons } from './content-icons';
import { Iconify } from '../../../components/iconify';
import { ContentInfomation } from './content-infomation';
import ButtonDelete from '../../../components/button-delete';
import subjectFormControl from '../context/subject-form-control';
import ButtonTabsGroup from '../../../components/button-tabs-group';
import { DeleteSubject, AddUpdateSubject } from '../hooks/api-database';
import { useDialogActionSubject } from '../hooks/use-dialog-action-subject';

const tabs = ['Thông tin', 'Biểu tượng'];

export default function DialogActionSubject() {
  const { isLoading, isSubmitting } = useFormState(subjectFormControl);
  const [tab, setTab] = useState(tabs[0]);
  const { open, onClose } = useDialogActionSubject();
  const [id] = subjectFormControl.watch(['id']);
  const title = useMemo(() => (id ? 'Cập nhật môn học' : 'Thêm môn học'), [id]);

  const onDelete = useCallback(async () => {
    await DeleteSubject(id);
    onClose();
  }, [id, onClose]);

  const onSubmit = useCallback(async () => {
    await subjectFormControl.handleSubmit(AddUpdateSubject)();
    onClose();
  }, [onClose]);

  return (
    <Dialog open={open} scroll="body">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent dividers>
        <ButtonTabsGroup value={tab} onChange={(_, v) => setTab(v)}>
          {tabs.map((t) => (
            <Tab key={t} label={t} value={t} />
          ))}
        </ButtonTabsGroup>
        <Collapse in={tabs[0] === tab}>
          <ContentInfomation />
        </Collapse>
        <Collapse in={tabs[1] === tab}>
          <ContentIcons />
        </Collapse>
      </DialogContent>
      <DialogActions>
        <ButtonDelete show={Boolean(id)} sx={{ mr: 'auto' }} onDelete={onDelete} />
        <Button disabled={isSubmitting} onClick={onClose} color="inherit">
          Đóng
        </Button>
        <Button
          loading={isLoading}
          onClick={onSubmit}
          variant="contained"
          startIcon={<Iconify icon="solar:diskette-bold" />}
        >
          Lưu lại
        </Button>
      </DialogActions>
    </Dialog>
  );
}
