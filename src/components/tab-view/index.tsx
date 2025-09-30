import type { BoxProps, CollapseProps } from '@mui/material';

import { memo, useMemo, useContext, createContext } from 'react';

import { Box, Collapse } from '@mui/material';

const TabContext = createContext<number | string | undefined>(undefined);
const Provider = TabContext.Provider;

export const TabView = memo(function TabView({
  tab,
  children,
  ...props
}: BoxProps & { tab?: number | string }) {
  const mapData: Record<number | string, number> = useMemo(() => {
    if (!Array.isArray(children)) return {};
    return children.reduce((i, e, index) => {
      i[e.props.value] = index;
      return i;
    }, {});
  }, [children]);

  return (
    <Box
      {...props}
      sx={{
        width: 1,
        display: 'flex',
        alignItems: 'flex-start',
        transform: `translateX(-${(mapData[tab!] || 0) * 100}%)`,
        transition: (t) =>
          t.transitions.create('transform', {
            duration: t.transitions.duration.standard,
          }),
        willChange: 'transform',
        '& > *': { flex: '0 0 100%' },
        ...props.sx,
      }}
    >
      <Provider value={tab}>{children}</Provider>
    </Box>
  );
});

export const TabViewItem = memo(function TabViewItem({
  value,
  children,
  ...props
}: CollapseProps & { value: number | string }) {
  const tab = useContext(TabContext);
  return (
    <Box>
      <Collapse in={tab === value} {...props}>
        {children}
      </Collapse>
    </Box>
  );
});
