import 'src/global.css';

import { type PropsWithChildren } from 'react';

import Container from '@mui/material/Container';

import { ThemeProvider } from './theme/theme-provider';
import BottomNavigater from './components/layout/bottomNavigater';

// ----------------------------------------------------------------------

export default function App({ children }: PropsWithChildren) {
  return (
    <ThemeProvider>
      <Container maxWidth="xs" sx={{ minHeight: '100dvh', mb: 8, position: 'relative' }}>
        {children}
        <BottomNavigater />
      </Container>
    </ThemeProvider>
  );
}
