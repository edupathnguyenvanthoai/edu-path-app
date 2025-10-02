import { useWatch } from 'react-hook-form';

import { Box, Card, Stack, Avatar, Typography } from '@mui/material';

import { Iconify } from '../../../components/iconify';
import { getTextColor } from '../../../utils/action-theme';
import { Label, type LabelProps } from '../../../components/label';
import { GoalConfigFormControl } from '../context/goal-config-form-control';

const Mapcolor: Record<number, LabelProps['color']> = ['default', 'info', 'success', 'warning'];
import newIcon from '../assets/new.png';

export type CardViewSubjectSumaryExamProps = {
  name: string;
  icon: string;
  color: string;
  checkField: Record<number, number>;
  examTypeMap: Map<number, ExamType>;
};
export function CardViewSubjectSumaryExam({
  name,
  icon,
  color,
  checkField,
  examTypeMap,
}: CardViewSubjectSumaryExamProps) {
  const [isGoal] = useWatch({ control: GoalConfigFormControl.control, name: ['subject.isGoal'] });
  return (
    <Card
      sx={{ my: 2, p: 2 }}
      component={Stack}
      direction="row"
      spacing={2}
      alignItems="center"
    >
      <Avatar
        variant="circular"
        sx={{
          bgcolor: color,
          color: getTextColor(color),
        }}
      >
        <Iconify icon={icon as any} />
      </Avatar>
      <Stack flex={1}>
        <Typography variant="h6">{name}</Typography>
        <Box display="flex" flexWrap="wrap" gap={0.5}>
          {Array.from(examTypeMap.values())
            .filter((e) => (checkField[e.id!] ?? 0) > 0)
            .map((e) => (
              <Label key={e.id} color={Mapcolor[checkField[e.id!]] ?? 'error'}>
                {e.name}: {checkField[e.id!]}
              </Label>
            ))}
        </Box>
      </Stack>
      {!isGoal && (
        <Box
          component="img"
          src={newIcon}
          sx={{
            width: 32,
            height: 32,
            rotate: '20deg',
            alignSelf: 'flex-start',
          }}
        />
      )}
    </Card>
  );
}
