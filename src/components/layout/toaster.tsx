import { Toaster as ToasterSonner } from 'sonner';

import { useTheme } from '@mui/material';

import { Iconify } from '../iconify';
import { usePadding } from '../../config-capacitor';

export default function Toaster() {
  const theme = useTheme();
  const { top } = usePadding();

  return (
    <ToasterSonner
      position="top-center"
      icons={{
        info: <Iconify icon="solar:info-square-bold" color={theme.vars.palette.info.main} />,
        success: (
          <Iconify icon="solar:check-circle-bold-duotone" color={theme.vars.palette.success.main} />
        ),
        error: (
          <Iconify
            icon="solar:danger-triangle-bold-duotone"
            color={theme.vars.palette.error.main}
          />
        ),
        warning: (
          <Iconify
            icon="solar:danger-triangle-bold-duotone"
            color={theme.vars.palette.warning.main}
          />
        ),
      }}
      gap={Number(theme.shape.borderRadius) * 0.5}
      style={{
        marginTop: theme.spacing(top - 2),
      }}
      toastOptions={{
        style: {
          width: 'fix-content',
          padding: theme.spacing(1, 1.5),
          borderRadius: Number(theme.shape.borderRadius) * 2,
          background: theme.vars.palette.background.default,
          color: theme.vars.palette.text.primary,
          borderColor: theme.vars.palette.divider,
        },
      }}
    />
  );
}
