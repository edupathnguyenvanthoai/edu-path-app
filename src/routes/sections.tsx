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

const SubjectsPage = lazy(() => import('src/pages/subjects/page'));
const GoalsPage = lazy(() => import('src/pages/goals/page'));
const SettingsPage = lazy(() => import('src/pages/settings/page'));
const IconsPage = lazy(() => import('./icons'));

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
        Component: SubjectsPage,
      },
      {
        path: 'goals',
        Component: GoalsPage,
      },
      {
        path: 'settings',
        Component: SettingsPage,
      },
    ],
  },
  {
    path: 'icons',
    Component: IconsPage,
  },
  {
    path: '*',
    Component: () => <div>Not Found</div>,
  },
];
