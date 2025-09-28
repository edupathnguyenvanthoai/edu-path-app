import { create } from 'zustand';
import { useEffect } from 'react';
import { Device } from '@capacitor/device';
import { Style, StatusBar } from '@capacitor/status-bar';

import { useColorScheme } from '@mui/material';
// ---------------------------------------------------------------------- //
// Cài đặt capacitor.js giúp đóng gói webview thành app cho android và ios

const MapMode = {
  light: Style.Light,
  dark: Style.Dark,
  system: Style.Default,
};
type Padding = {
  top: number;
  bottom: number;
  setPadding: (top: number, bottom: number) => void;
};
export const usePadding = create<Padding>((set) => ({
  top: 2,
  bottom: 0,
  setPadding: (top: number, bottom: number) => set({ top, bottom }),
}));

export default function useConfigCapacitor() {
  const { mode } = useColorScheme();
  const { setPadding, bottom, top } = usePadding();

  useEffect(() => {
    (async () => {
      const info = await Device.getInfo();
      if (info.platform !== 'web' && mode) {
        await StatusBar.setOverlaysWebView({ overlay: true });
        await StatusBar.setStyle({
          style: MapMode[mode],
        });
        if (info.platform === 'ios') {
          setPadding(8, 4);
        }
        if(info.platform === 'android') {
          setPadding(5, 1);
        }
      }
    })();
  }, [mode, setPadding]);

  return { top, bottom };
}
