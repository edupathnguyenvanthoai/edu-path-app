import type { Dayjs as DayjsLib } from 'dayjs';

import { blue, indigo, blueGrey } from '@mui/material/colors';

import type { IconifyName } from '../components/iconify';

declare global {
  type Dayjs = DayjsLib;
}

// để TypeScript nhận dạng module
export {};
export const CATEGORY: Record<string, { color: string; icon: IconifyName } | null> = {
  'Tất cả': null,
  'Tự nhiên': {
    color: blue[500],
    icon: 'solar:calculator-minimalistic-broken',
  },
  'Xã hội': {
    color: indigo[500],
    icon: 'solar:chat-square-arrow-bold',
  },
  'Tự chọn': {
    color: blueGrey[500],
    icon: 'solar:settings-bold-duotone',
  },
};
