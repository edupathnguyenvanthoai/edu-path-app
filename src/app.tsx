import 'src/global.css';
import 'dayjs/locale/vi';

import { type PropsWithChildren } from 'react';

import Container from '@mui/material/Container';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import Toaster from './components/layout/toaster';
import useConfigCapacitor from './config-capacitor';
import HeaderFilter from './components/layout/header-filter';
import BottomNavigater from './components/layout/bottom-navigater';

// ----------------------------------------------------------------------

export default function App({ children }: PropsWithChildren) {
  const { bottom, top } = useConfigCapacitor();
  return (
    <LocalizationProvider adapterLocale="vi" dateAdapter={AdapterDayjs}>
      <Container
        maxWidth="xs"
        sx={{ minHeight: '100vh', pb: 10 + bottom, pt: top, position: 'relative' }}
      >
        {children}
      </Container>

      <HeaderFilter top={top} />
      <BottomNavigater bottom={bottom} />
      <Toaster />
    </LocalizationProvider>
  );
}
