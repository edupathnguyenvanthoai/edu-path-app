import React from 'react';

import { Grid, Typography } from '@mui/material';

type InfomationProps = {
  data: Record<string, React.ReactNode>;
  sx?: React.CSSProperties;
  labelView?: Record<string, React.ReactNode>;
  header?: React.ReactNode;
};

export default function Infomation({header,  data, labelView: label = {}, sx }: InfomationProps) {
  return (
    <Grid container spacing={1} px={3} sx={sx}>
      {header && <Grid size={12}>{header}</Grid>}
      {Object.entries(data).map(([key, value]) => (
        <React.Fragment key={key}>
          <Grid size={4} display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="subtitle1" sx={{ opacity: 0.8 }}>
              {label[key] ?? key}
            </Typography>
            <span>:</span>
          </Grid>
          <Grid size={8}>
            <Typography variant="body1">{value}</Typography>
          </Grid>
        </React.Fragment>
      ))}
    </Grid>
  );
}
