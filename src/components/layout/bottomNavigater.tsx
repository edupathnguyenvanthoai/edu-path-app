import { memo } from 'react';

import { Tab, Tabs } from '@mui/material';

import { Iconify } from '../iconify';
import { useRouter, usePathname } from '../../routes/hooks';

export default memo(BottomNavigater);
function BottomNavigater() {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <Tabs
      value={pathname}
      onChange={(_, value) => {
        router.replace(value);
        localStorage.setItem('pathname', value);
      }}
      sx={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        pb: 1,
        px: 0,
        '& .MuiTabs-list': {
          justifyContent: 'space-evenly',
        },
        '& button': {
          p: 1,
          width: 0.2,
          minWidth: 'unset',
          zIndex: 1,
          fontSize: 10,
          color: (t) => t.vars.palette.grey[500],
        },
        '& button.Mui-selected': {
          color: (t) => t.vars.palette.primary.contrastText,
        },
        '& .MuiTabs-indicator': {
          height: 1,
          zIndex: -1,
          bgcolor: (t) => t.vars.palette.primary.main,
          borderRadius: 1.25,
        },
      }}
    >
      <Tab
        iconPosition="top"
        icon={<Iconify width={24} icon="solar:book-2-bold-duotone" />}
        value="/subjects"
        label="Môn Học"
      />
      <Tab
        iconPosition="top"
        icon={<Iconify width={24} icon="solar:target-bold-duotone" />}
        value="/goals"
        label="Mục Tiêu"
      />
      <Tab
        iconPosition="top"
        icon={<Iconify width={24} icon="solar:calendar-bold-duotone" />}
        value="/schedule"
        label="Lịch Học"
      />
      <Tab
        iconPosition="top"
        icon={<Iconify width={24} icon="solar:chart-square-bold-duotone" />}
        value="/progress"
        label="Tiến Độ"
      />
      <Tab
        iconPosition="top"
        icon={<Iconify width={24} icon="solar:settings-minimalistic-bold-duotone" />}
        value="/settings"
        label="Cài Đặt"
      />
    </Tabs>
  );
}
