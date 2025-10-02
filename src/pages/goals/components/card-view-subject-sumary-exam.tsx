import { Card, Avatar, CardHeader, CardActions } from '@mui/material';

import { Label } from '../../../components/label';
import { Iconify } from '../../../components/iconify';
import { getTextColor } from '../../../utils/action-theme';

import type { LabelProps } from '../../../components/label';

const Mapcolor: Record<number, LabelProps['color']> = ['default', 'info', 'success', 'warning'];

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
  return (
    <Card sx={{ my: 2 }}>
      <CardHeader
        avatar={
          <Avatar
            variant="circular"
            sx={{
              bgcolor: color,
              color: getTextColor(color),
            }}
          >
            <Iconify icon={icon as any} />
          </Avatar>
        }
        title={name}
        subheader="Tổng quan số lượng bài kiểm tra."
      />
      <CardActions disableSpacing sx={{ justifyContent: 'end', p: 2, flexWrap: 'wrap', gap: 1 }}>
        {Array.from(examTypeMap.values()).map((e) => (
          <Label key={e.id} color={Mapcolor[checkField[e.id!]] ?? 'error'}>
            {e.name}: {checkField[e.id!]}
          </Label>
        ))}
      </CardActions>
    </Card>
  );
}
