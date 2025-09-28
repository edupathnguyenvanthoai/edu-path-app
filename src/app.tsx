import 'src/global.css';
import 'dayjs/locale/vi';

import { type PropsWithChildren } from 'react';

import Container from '@mui/material/Container';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import Toaster from './components/layout/toaster';
import ThemeProvider from './theme/theme-provider';
import BottomNavigater from './components/layout/bottomNavigater';
// ----------------------------------------------------------------------

export default function App({ children }: PropsWithChildren) {
  return (
    <ThemeProvider>
      <LocalizationProvider adapterLocale="vi" dateAdapter={AdapterDayjs}>
        <Container maxWidth="xs" sx={{ minHeight: '100vh', pb: 10, pt: 2, position: 'relative' }}>
          {children}
        </Container>
        <BottomNavigater />
        <Toaster />
      </LocalizationProvider>
    </ThemeProvider>
  );
}
