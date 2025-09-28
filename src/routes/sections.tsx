import type { RouteObject } from 'react-router';

import { lazy, Suspense } from 'react';
import { varAlpha } from 'minimal-shared/utils';
import { Outlet, Navigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

// ----------------------------------------------------------------------

export const renderFallback = () => (
  <Box
    sx={{
      display: 'flex',
      flex: '1 1 auto',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
    }}
  >
    <LinearProgress
      sx={{
        width: 1,
        maxWidth: 320,
        bgcolor: (theme) => varAlpha(theme.vars.palette.text.primaryChannel, 0.16),
        [`& .${linearProgressClasses.bar}`]: { bgcolor: 'text.primary' },
      }}
    />
  </Box>
);

export const routesSection: RouteObject[] = [
  {
    element: (
      <Suspense fallback={renderFallback()}>
        <Outlet />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: <Navigate replace to={localStorage.getItem('pathname') || '/schedule'} />,
      },
      {
        path: 'subjects',
        Component: lazy(() => import('src/pages/subjects/list')),
      },
      {
        path: 'settings',
        Component: lazy(()=>import("src/pages/settings/settings-page")),
      },
      {
        path: 'icons',
        Component: lazy(() => import('./icons')),
      },
    ],
  },
  {
    path: '*',
    Component: () => <div>Not Found</div>,
  },
];
