import { lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';

import { ErrorBoundary } from './routes/components';
import { routesSection, renderFallback } from './routes/sections';

const App = lazy(() => import('./app'));
const ThemeProvider = lazy(() => import('./theme/theme-provider'));
// ----------------------------------------------------------------------

const router = createBrowserRouter([
  {
    element: (
      <Suspense fallback={renderFallback()}>
        <App>
          <Outlet />
        </App>
      </Suspense>
    ),
    errorElement: <ErrorBoundary />,
    children: routesSection,
  },
]);

const root = createRoot(document.getElementById('root')!);

root.render(
  <ThemeProvider>
    <RouterProvider router={router} />
  </ThemeProvider>
);
