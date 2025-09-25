import 'src/global.css';

import { type PropsWithChildren, useEffect } from 'react';

import { usePathname } from 'src/routes/hooks';
import { ThemeProvider } from './theme/theme-provider';

// ----------------------------------------------------------------------

export default function App({ children }: PropsWithChildren) {
  useScrollToTop();
  return <ThemeProvider>{children}</ThemeProvider>;
}

// ----------------------------------------------------------------------

function useScrollToTop(): void {
  const pathname = usePathname();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
}
