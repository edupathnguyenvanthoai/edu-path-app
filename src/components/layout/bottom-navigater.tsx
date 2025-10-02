import { toast } from 'sonner';
import { memo, useMemo, useEffect } from 'react';

import { Tab, Tabs, Container } from '@mui/material';

import { Iconify } from '../iconify';
import { TAB_ITEMS } from '../../schema/constant';
import { useRouter, usePathname } from '../../routes/hooks';

export default memo(BottomNavigater);

function BottomNavigater({ bottom }: { bottom: number }) {
  const pathname = usePathname();
  const router = useRouter();
  const pathnameTab = useMemo(() => {
    const key = pathname.split('/')[1];
    return TAB_ITEMS.get(key) ? key : 'subjects';
  }, [pathname]);

  useEffect(() => {
    localStorage.setItem('pathname', pathname);
    toast.dismiss();
  }, [pathname]);

  return (
    <Container
      maxWidth="xs"
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backdropFilter: 'blur(4px)',
        pb: bottom,
        zIndex: 50,
      }}
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
        {Array.from(TAB_ITEMS.values()).map((item) => (
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
