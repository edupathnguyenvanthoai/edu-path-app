import { Stack } from '@mui/material';

import Header from '../../components/layout/header';
import { ButtonAddScore } from './components/button-add';
import { SearchCalender } from './components/content-search';
import { ContentScheduleList } from './components/content-schedule-list';

export default function SchedulePage() {
  return (
    <Stack spacing={2}>
      <Header title="Lịch học" action={<ButtonAddScore />} />
      <SearchCalender />
      <ContentScheduleList />
    </Stack>
  );
}
