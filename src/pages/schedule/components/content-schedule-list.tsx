import dayjs from 'dayjs';
import { useLiveQuery } from 'dexie-react-hooks';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useCallback, useDeferredValue } from 'react';

import {
  Box,
  Card,
  Stack,
  Typography,
  CardHeader,
  IconButton,
  CircularProgress,
  ClickAwayListener,
} from '@mui/material';

import { DAY } from './card-cell-schedule';
import { db } from '../../../schema/schema';
import { MAPPING_TIME } from '../context/config';
import { CardScheduleRow } from './card-schedule-row';
import { Iconify } from '../../../components/iconify';
import { useModeCalender } from '../context/mode-calender';
import { useSubjectDataView } from '../context/subject-data-view';
import { EmptyExpand } from '../../../components/empty/empty-expand';

export const TimeInDay = ['Tất cả', 'Sáng', 'Chiều', 'Tối'];

export function ContentScheduleList() {
  const [search] = useSearchParams();
  const timeInDay = search.get('time-in-day') || TimeInDay[0];
  const { setSubjectMap, subjectMap } = useSubjectDataView();
  const _subjectsMap = useLiveQuery(
    async () => new Map((await db.subjects.toArray()).map((x) => [x.id!, x]))
  );
  const { editMode, toggle } = useModeCalender();

  const day = dayjs().day();

  useEffect(() => {
    if (_subjectsMap) {
      setSubjectMap(_subjectsMap);
    }
  }, [_subjectsMap, setSubjectMap]);

  const onAction = useCallback((index: number, d: number) => {
    console.log(index, d);
  }, []);

  const TIMELIST = useDeferredValue(FilterTimeInday(MAPPING_TIME, timeInDay));

  return TIMELIST.length > 0 ? (
    <ClickAwayListener onClickAway={() => editMode && toggle()}>
      <Card
        sx={{ borderRadius: 1.5, outline: editMode ? 2 : 'none', outlineColor: 'primary.main' }}
      >
        <CardHeader
          title="Lịch học chính"
          action={
            <IconButton onClick={toggle}>
              <Iconify icon={editMode ? 'mingcute:close-line' : 'solar:pen-bold'} />
            </IconButton>
          }
          sx={{ color: 'primary.main' }}
        />
        <Box sx={{ overflow: 'auto', scrollSnapType: 'x mandatory', my: 2 }}>
          {subjectMap.size === 0 ? (
            <Stack py={5} alignItems="center" spacing={1}>
              <CircularProgress />
              <Typography variant="body1">Đang tải lịch học</Typography>
            </Stack>
          ) : (
            <Stack width={`calc(${(100 / 3) * 7}%)`}>
              <Stack direction="row">
                {DAY.map((e) => (
                  <Box
                    flex={1}
                    key={e}
                    py={1}
                    textAlign="center"
                    ref={(ref: HTMLDivElement) => {
                      if (ref && e === day) {
                        ref?.scrollIntoView({
                          behavior: 'smooth',
                          block: 'nearest',
                          inline: 'center',
                        });
                      }
                    }}
                    sx={{
                      scrollSnapAlign: 'start',
                      bgcolor: 'background.neutral',
                      borderBottom: e === day ? 2 : 0,
                      fontWeight: 600,
                    }}
                  >
                    {e === 0 ? 'Chủ nhật' : `Thứ ${e + 1}`}
                  </Box>
                ))}
              </Stack>
              {TIMELIST.map((time, i) => (
                <CardScheduleRow
                  key={time[0]}
                  times={time}
                  index={i}
                  onAction={onAction}
                  mode={timeInDay}
                  day={day}
                />
              ))}
            </Stack>
          )}
        </Box>
      </Card>
    </ClickAwayListener>
  ) : (
    <EmptyExpand in title="Thời gian rảnh không có lịch trình nào!" />
  );
}

export const FilterTimeInday = (times: [string, number][], timeInDay: string) =>
  times.filter((t) => {
    const [time] = t;
    if (timeInDay === 'Sáng') {
      return time < '12:00';
    }

    if (timeInDay === 'Chiều') {
      return time >= '12:00' && time < '18:00';
    }

    if (timeInDay === 'Tối') {
      return time >= '18:00';
    }

    return true;
  });
