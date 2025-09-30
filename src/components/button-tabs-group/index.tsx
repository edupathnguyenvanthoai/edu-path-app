import type { TabsProps } from '@mui/material/Tabs';

import Tabs from '@mui/material/Tabs';

export type ButtonTabsGroupProps = TabsProps;
export default function ButtonTabsGroup(props: ButtonTabsGroupProps) {
  return (
    <Tabs
      {...props}
      sx={{
        width: 'fit-content',
        bgcolor: (t) => t.vars.palette.background.neutral,
        borderRadius: 1,
        p: 0.5,
        minHeight: 'unset',
        '& .MuiTabs-scroller': {
          borderRadius: 0.75,
        },
        '& .MuiTabs-list': {
          justifyContent: 'flex-start',
        },
        '& .MuiTab-root': {
          p: (t) => t.spacing(1),
          zIndex: 2,
        },
        '& .MuiTabs-indicator': {
          height: 1,
          bgcolor: (t) => t.vars.palette.background.paper,
          borderRadius: 0.75,
        },
        ...props.sx,
      }}
    />
  );
}
