import { useEffect } from 'react';
import { Device } from '@capacitor/device';
import { StatusBar } from '@capacitor/status-bar';

// ---------------------------------------------------------------------- //
// Cài đặt capacitor.js giúp đóng gói webview thành app cho android và ios

export default function useConfigCapacitor() {
  useEffect(() => {
    (async () => {
      const info = await Device.getInfo();
      if (info.platform !== 'web') {
        await StatusBar.hide();
      }
    })();
  }, []);
}
