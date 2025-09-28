import { useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { useLiveQuery } from 'dexie-react-hooks';

import { Stack, MenuItem, TextField, Typography, Autocomplete } from '@mui/material';

import { db } from '../../schema/schema';
import { formControl } from './formControl';
import { CATEGORY } from '../../schema/constant';
import IconField from '../../components/iconify/icon-field';
import { solarIcons } from '../../components/iconify/icon-solar';
import ColorField from '../../components/color-utils/color-field';
import { COLOR_LIST } from '../../components/color-utils/color-set';

const solarIconsName = Object.keys(solarIcons);

export default function ContentStructInformation() {
  const [color, icon] = formControl.watch(['config.color', 'config.icon']);
  const admissionGroups =
    useLiveQuery(
      async () => [...new Set((await db.subjects.toArray()).map((x) => x.admissionGroups).flat())],
      []
    ) || [];
  useEffect(() => {
    if (!color)
      formControl.setValue(
        'config.color',
        COLOR_LIST[Math.floor(Math.random() * COLOR_LIST.length)]
      );
    if (!icon)
      formControl.setValue(
        'config.icon',
        solarIconsName[Math.floor(Math.random() * solarIconsName.length)]
      );
  }, [color, icon]);

  return (
    <Stack spacing={2}>
      {/* 
        Cập nhật tên môn học
      */}
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
          />
        )}
      />
      {/* 
        Cập nhật danh mục môn học
      */}
      <Controller
        name="category"
        control={formControl.control}
        defaultValue="Tự chọn"
        render={({ field }) => (
          <TextField {...field} label="Danh mục môn học" select>
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
      {/* 
        Cập nhật hệ số môn
      */}
      <Controller
        control={formControl.control}
        name="weight"
        defaultValue={1}
        render={({ field }) => (
          <TextField {...field} label="Hệ số môn" select>
            {[
              { value: 1, label: 'Môn cơ bản (hệ số 1)' },
              { value: 2, label: 'Môn nâng cao (hệ số 2)' },
            ].map((x) => (
              <MenuItem key={x.value} value={x.value}>
                {x.label}
              </MenuItem>
            ))}
          </TextField>
        )}
      />

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

      <Controller
        control={formControl.control}
        name="config.color"
        defaultValue=""
        render={({ field, fieldState: { error, invalid } }) => (
          <ColorField
            error={invalid}
            helperText={error?.message}
            value={field.value}
            onChange={field.onChange}
            label="Chọn màu"
          />
        )}
      />
      <Controller
        control={formControl.control}
        name="config.icon"
        defaultValue=""
        render={({ field, fieldState: { error, invalid } }) => (
          <IconField
            error={invalid}
            helperText={error?.message}
            value={field.value as any}
            onChange={field.onChange}
            label="Chọn biểu tượng"
            sx={{
              ...(color && {
                '& button.active': {
                  bgcolor: color,
                  color: (t) => t.palette.getContrastText(color),
                },
              }),
            }}
          />
        )}
      />
    </Stack>
  );
}
