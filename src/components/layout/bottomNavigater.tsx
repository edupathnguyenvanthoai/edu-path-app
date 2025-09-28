import { memo, useEffect } from 'react';

import { Tab, Tabs, Container } from '@mui/material';

import { Iconify } from '../iconify';
import { useRouter, usePathname } from '../../routes/hooks';

export default memo(BottomNavigater);
const TAB_ITEMS = [
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
];
function BottomNavigater() {
  const pathname = usePathname();
  const router = useRouter();
  const pathnameTab = pathname.split('/')[1] ?? '/schedule';

  useEffect(() => {
    localStorage.setItem('pathname', pathname);
  }, [pathname]);

  return (
    <Container
      maxWidth="xs"
      sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, backdropFilter: 'blur(4px)' }}
    >
      <Tabs
        value={pathnameTab}
        onChange={(_, value) => router.replace('/' + value)}
        sx={{
          p: 1,
          mx: -2,
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
        {TAB_ITEMS.map((item) => (
          <Tab
            iconPosition="top"
            icon={<Iconify width={24} icon={item.icon as any} />}
            key={item.value}
            value={item.value}
            label={item.label}
          />
        ))}
      </Tabs>
    </Container>
  );
}
