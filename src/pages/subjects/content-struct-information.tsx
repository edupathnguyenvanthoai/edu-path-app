import { Controller } from 'react-hook-form';
import { useLiveQuery } from 'dexie-react-hooks';

import {
  Box,
  Stack,
  Badge,
  Avatar,
  Divider,
  MenuItem,
  TextField,
  Typography,
  Autocomplete,
  InputAdornment,
} from '@mui/material';

import { db } from '../../schema/schema';
import { formControl } from './formControl';
import { CATEGORY } from '../../schema/constant';
import { Iconify } from '../../components/iconify';

export default function ContentStructInformation() {
  const [color, icon, exams] = formControl.watch(['config.color', 'config.icon', 'exams']);

  const admissionGroups =
    useLiveQuery(
      async () => [...new Set((await db.subjects.toArray()).map((x) => x.admissionGroups).flat())],
      []
    ) || [];

  return (
    <Stack spacing={2} mt={2}>
      <Controller
        name="name"
        control={formControl.control}
        defaultValue=""
        rules={{
          required: 'Vui lòng nhập tên môn học',
          validate: async (value) => {
            const subject = await db.subjects.where('name').equalsIgnoreCase(value).first();
            return subject && subject.id !== formControl.getValues('id')
              ? `Môn học "${value}" bị trùng tên`
              : true;
          },
        }}
        render={({ field, fieldState: { error, invalid } }) => (
          <TextField
            {...field}
            required
            label="Tên môn học"
            placeholder="Vui lòng nhập tên môn học"
            error={invalid}
            helperText={error?.message}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <Avatar sx={{
                      borderRadius: 1,
                      mr: -0.5,
                      bgcolor: color,
                      color: (t) => t.palette.getContrastText(color),
                    }}>
                      <Iconify width={0.55} icon={icon as any} />
                    </Avatar>
                  </InputAdornment>
                ),
              },
            }}
          />
        )}
      />

      <Stack direction="row" spacing={2}>
        <Controller
          name="category"
          control={formControl.control}
          defaultValue="Tự chọn"
          render={({ field }) => (
            <TextField {...field} label="Danh mục môn học" select fullWidth>
              {Object.entries(CATEGORY)
                .filter((x) => x[1])
                .map(([category]) => (
                  <MenuItem key={category} value={category}>
                    <Typography variant="subtitle2">{category}</Typography>
                  </MenuItem>
                ))}
            </TextField>
          )}
        />
        <Controller
          control={formControl.control}
          name="weight"
          defaultValue={1}
          render={({ field }) => (
            <TextField {...field} label="Hệ số môn" select fullWidth>
              {[
                { value: 1, label: 'Môn hệ số 1' },
                { value: 2, label: 'Môn hệ số 2' },
              ].map((x) => (
                <MenuItem key={x.value} value={x.value}>
                  {x.label}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
      </Stack>

      <Controller
        control={formControl.control}
        name="admissionGroups"
        defaultValue={[]}
        render={({ field }) => (
          <Autocomplete
            {...field}
            multiple
            freeSolo
            options={admissionGroups}
            value={field.value || []}
            slotProps={{
              chip: {
                size: 'small',
              },
            }}
            onChange={(_, newValue) => field.onChange(newValue.map((v) => v.toUpperCase()))}
            renderInput={(params) => (
              <TextField
                sx={{
                  '& input': {
                    textTransform: 'uppercase',
                  },
                }}
                {...params}
                label="Nhóm xét tuyển"
              />
            )}
          />
        )}
      />
      <Divider
        sx={{
          typography: 'caption',
          textTransform: 'uppercase',
          color: 'text.secondary',
          borderStyle: 'dashed',
        }}
      >
        Tổng quan kiểm tra
      </Divider>
      <Stack direction="row" justifyContent="space-around">
        {exams?.map((x) => (
          <Badge
            key={x.id}
            overlap="rectangular"
            badgeContent={
              <Box
                sx={{
                  bgcolor: 'background.neutral',
                  p: 0.5,
                  width: 20,
                  textAlign: 'center',
                  borderRadius: 0.6,
                  boxShadow: 5,
                  aspectRatio: '1 / 1',
                }}
              >
                {x.count}
              </Box>
            }
          >
            <Stack alignItems="center" position="relative" width={40}>
              <Avatar
                sx={{
                  borderRadius: 1,
                  height: 36,
                  width: 36,
                  bgcolor: x.config.bgcolor,
                  color: (t) => t.palette.getContrastText(x.config.bgcolor),
                }}
              >
                <Iconify icon={x.config.icon as any} sx={{ width: 0.8 }} />
              </Avatar>
              <Typography variant="caption" noWrap>
                {x.name}
              </Typography>
            </Stack>
          </Badge>
        ))}
      </Stack>
    </Stack>
  );
}
