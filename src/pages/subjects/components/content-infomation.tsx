import { Controller } from 'react-hook-form';
import { useLiveQuery } from 'dexie-react-hooks';

import { Stack, MenuItem, TextField, Autocomplete } from '@mui/material';

import { db } from '../../../schema/schema';
import { CATEGORY } from '../../../schema/constant';
import subjectFormControl from '../context/subject-form-control';

const [, ...CATEGORY_LIST] = CATEGORY;
export function ContentInfomation() {
  const admissionGroups =
    useLiveQuery(
      async () => [...new Set((await db.subjects.toArray()).flatMap((x) => x.admissionGroups))],
      []
    ) || [];

  return (
    <Stack spacing={2} mt={2}>
      <Controller
        control={subjectFormControl.control}
        name="name"
        render={({ field }) => <TextField {...field} label="Tên môn học" required />}
      />
      <Stack direction="row" spacing={2}>
        <Controller
          control={subjectFormControl.control}
          name="category"
          render={({ field }) => (
            <TextField {...field} label="Tổ hợp" select fullWidth>
              {CATEGORY_LIST.map((category) => (
                <MenuItem value={category} key={category}>
                  {category}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
        <Controller
          control={subjectFormControl.control}
          name="weight"
          defaultValue={1}
          render={({ field }) => (
            <TextField {...field} label="Hệ số môn" select fullWidth>
              {Array.from({ length: 2 }, (_e, i) => (
                <MenuItem value={i + 1} key={i}>
                  Hệ số {i + 1}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
      </Stack>
      <Controller
        control={subjectFormControl.control}
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
                {...params}
                sx={{
                  '& input': {
                    textTransform: 'uppercase',
                  },
                }}
                label="Nhóm xét tuyển"
              />
            )}
          />
        )}
      />
    </Stack>
  );
}
