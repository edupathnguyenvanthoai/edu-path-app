import { useWatch, Controller } from 'react-hook-form';

import { Stack, Divider } from '@mui/material';

import { ColorPicker } from '../../../components/color-utils';
import subjectFormControl from '../context/subject-form-control';
import IconPicker from '../../../components/iconify/icon-picker';
import { COLOR_LIST } from '../../../components/color-utils/color-set';
import { solarIconsName } from '../../../components/iconify/icon-solar';

export function ContentIcons() {
  const color = useWatch({ control: subjectFormControl.control, name: 'config.color' });

  return (
    <Stack mt={3} spacing={1}>
      <Divider textAlign="left">Biểu tượng</Divider>
      <Controller
        control={subjectFormControl.control}
        name="config.icon"
        defaultValue=""
        render={({ field: { value, onChange } }) => (
          <IconPicker color={color} value={value} onChange={onChange} options={solarIconsName} />
        )}
      />
      <Divider textAlign="left">Màu nền</Divider>
      <Controller
        control={subjectFormControl.control}
        name="config.color"
        render={({ field: { value, onChange } }) => (
          <ColorPicker value={value} onChange={onChange} options={COLOR_LIST} />
        )}
      />
    </Stack>
  );
}
