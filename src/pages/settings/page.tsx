import { toast } from 'sonner';
import { useLiveQuery } from 'dexie-react-hooks';

import { Box, Stack, Button, useColorScheme } from '@mui/material';

import { db } from '../../schema/schema';
import { Iconify } from '../../components/iconify';
import Infomation from '../../components/infomation';
import { Subject, ExamType } from '../../schema/_mock-data';

export default function SettingPage() {
  const { mode, setMode } = useColorScheme();

  const handleGetDefault = async () =>
    await db.transaction('rw', db.subjects, db.examTypes, db.subjectExamTypeLinks, async () => {
      await db.subjects.bulkAdd(Subject);
      await db.examTypes.bulkAdd(ExamType);
      toast.success('Thêm dữ liệu thành công', { id: 'db' });
    });

  const handleUpdateDefault = async () =>
    await db.transaction('rw', db.subjects, db.examTypes, db.subjectExamTypeLinks, async () => {
      await db.subjects.bulkPut(Subject);
      await db.examTypes.bulkPut(ExamType);
      toast.success('Cập nhật dữ liệu thành công', { id: 'db' });
    });
  const clearAll = async () =>
    await db.transaction('rw', db.subjects, db.examTypes, db.subjectExamTypeLinks, async () => {
      await db.subjects.clear();
      await db.examTypes.clear();
      await db.subjectExamTypeLinks.clear();
      toast.success('Xoá dữ liệu thành công', { id: 'db' });
    });

  const data = useLiveQuery(async () => ({
    'Môn học': await db.subjects.count(),
    'Bài kiểm tra': await db.examTypes.count(),
  }));
  return (
    <Stack spacing={2}>
      {mode}
      <Button onClick={() => setMode('dark')}>Dark</Button>
      <Button onClick={() => setMode('light')}>Light</Button>
      <Button onClick={() => setMode('system')}>System</Button>

      <Button
        startIcon={<Iconify icon="mingcute:add-line" />}
        variant="contained"
        onClick={handleGetDefault}
      >
        Thêm dữ liệu mẫu
      </Button>

      <Button
        startIcon={<Iconify icon="solar:restart-bold" />}
        variant="contained"
        onClick={handleUpdateDefault}
      >
        Cập nhật dữ liệu mẫu
      </Button>

      <Button
        startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
        color="error"
        variant="contained"
        onClick={clearAll}
      >
        Xoá tất cả
      </Button>

      <Box pt={5}>
        <Infomation data={data ?? {}} />
      </Box>
    </Stack>
  );
}
