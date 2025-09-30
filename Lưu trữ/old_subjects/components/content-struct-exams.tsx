import { Controller } from 'react-hook-form';
import { useLiveQuery } from 'dexie-react-hooks';

import { Card, Stack, Avatar, Button, Typography } from '@mui/material';

import { db } from 'src/schema/schema';

import { Iconify } from 'src/components/iconify';

import { formControl } from '../context/formControl';

export default function ContentStructExams() {
  const exams = useLiveQuery(() => db.examTypes.toArray(), []);
  return (
    <Stack spacing={2}>
      {exams?.map((x, index) => (
        <Controller
          key={x.id}
          name={`exams.${index}`}
          control={formControl.control}
          defaultValue={{
            ...x,
            count: 0,
          }}
          render={({ field }) => (
            <Card component={Stack} direction="row" p={2} alignItems="center">
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  mr: 1,
                  bgcolor: field.value.config.bgcolor,
                  color: (t) => t.palette.getContrastText(field.value.config.bgcolor),
                }}
              >
                <Iconify icon={field.value.config.icon as any} />
              </Avatar>
              <Typography
                color={field.value.count === 0 ? 'text.disabled' : 'text.primary'}
                flex={1}
                variant="h6"
              >
                {field.value.name}
              </Typography>
              <Button
                color="inherit"
                disabled={field.value.count === 0}
                sx={{ minWidth: 'unset', p: 0.75, bgcolor: 'background.neutral' }}
                onClick={() => field.onChange({ ...field.value, count: field.value.count - 1 })}
              >
                <Iconify sx={{ scale: -1 }} icon="eva:arrow-ios-forward-fill" />
              </Button>
              <Typography variant="subtitle2" px={1} width={30} textAlign="center">
                {field.value.count}
              </Typography>
              <Button
                color="inherit"
                disabled={field.value.count === 10}
                sx={{ minWidth: 'unset', p: 0.75, bgcolor: 'background.neutral' }}
                onClick={() => field.onChange({ ...field.value, count: field.value.count + 1 })}
              >
                <Iconify icon="eva:arrow-ios-forward-fill" />
              </Button>
            </Card>
          )}
        />
      ))}
    </Stack>
  );
}
