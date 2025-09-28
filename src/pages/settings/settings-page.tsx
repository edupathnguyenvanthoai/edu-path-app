import { Stack, Button, useColorScheme } from '@mui/material';

export default function SettingPage() {
  const { mode, setMode } = useColorScheme();
  return (
    <Stack spacing={1}>
      {mode}
      <Button onClick={() => setMode('dark')}>Dark</Button>
      <Button onClick={() => setMode('light')}>Light</Button>
      <Button onClick={() => setMode('system')}>System</Button>
    </Stack>
  );
}
