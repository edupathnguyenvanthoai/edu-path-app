import dayjs from 'dayjs';
import { useEffect } from 'react';

import { Tab, Stack, Select, MenuItem, InputAdornment } from '@mui/material';

import { TimeInDay } from './content-schedule-list';
import { Iconify } from '../../../components/iconify';
import useStateParams from '../../../utils/use-params';
import ButtonTabsGroup from '../../../components/button-tabs-group';

const TABS = ['Ngày', 'Tuần', 'Tháng'];

export function SearchCalender() {
  const [tab, setTab] = useStateParams('tab', TABS[1]);
  const [timeInDay, setTimeInday] = useStateParams('time-in-day', TimeInDay[0]);

  useEffect(() => {
    const currentTime = dayjs().format('HH:mm');
    if (currentTime < '12:00') setTimeInday('Sáng');
    else if (currentTime < '18:00') setTimeInday('Chiều');
    else setTimeInday('Tối');
  }, [setTimeInday]);

  return (
    <Stack>
      <Select
        value={tab}
        onChange={(e) => setTab(e.target.value)}
        startAdornment={
          <InputAdornment position="start">
            <Iconify icon="solar:calendar-bold-duotone" />
          </InputAdornment>
        }
      >
        {TABS.map((t) => (
          <MenuItem key={t} value={t}>
            Xem theo {t}
          </MenuItem>
        ))}
      </Select>
      <ButtonTabsGroup
        value={timeInDay}
        onChange={(_, v) => setTimeInday(v)}
        variant="scrollable"
        sx={{ width: 1, mt: 1 }}
      >
        {TimeInDay.map((t) => (
          <Tab key={t} label={t} value={t} />
        ))}
      </ButtonTabsGroup>
    </Stack>
  );
}
