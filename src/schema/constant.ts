import type { Dayjs as DayjsLib } from 'dayjs';

declare global {
  type Dayjs = DayjsLib;
}

export const CATEGORY = ['Tất cả', 'Tự nhiên', 'Xã hội', 'Tự chọn'] as const;

export const TAB_ITEMS = new Map(
  [
    {
      value: 'subjects',
      icon: 'solar:book-2-bold-duotone',
      label: 'Môn Học',
    },
    {
      value: 'goals',
      icon: 'solar:target-bold-duotone',
      label: 'Mục Tiêu',
    },
    {
      value: 'schedule',
      icon: 'solar:calendar-bold-duotone',
      label: 'Lịch Học',
    },
    {
      value: 'progress',
      icon: 'solar:chart-square-bold-duotone',
      label: 'Tiến Độ',
    },
    {
      value: 'settings',
      icon: 'solar:settings-minimalistic-bold-duotone',
      label: 'Cài Đặt',
    },
  ].map((x) => [x.value, x] as const)
);
