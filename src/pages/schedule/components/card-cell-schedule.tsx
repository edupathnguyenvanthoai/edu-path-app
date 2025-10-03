import { Stack, Avatar, Typography, ButtonBase } from '@mui/material';

import { abbreviate } from '../util/view-list';
import { Iconify } from '../../../components/iconify';
import { getTextColor } from '../../../utils/action-theme';
import { useSubjectDataView } from '../context/subject-data-view';

export const DAY = Array.from({ length: 7 }, (_, i) => i + 1);
DAY[6] = 0;

type CardCellScheduleProps = {
  subject: Subject;
  onAction?: () => void;
  active?: boolean;
};

export function CardCellSchedule({ subject, onAction, active }: CardCellScheduleProps) {
  const { subjectMap } = useSubjectDataView();
  const exams = subjectMap.get(Math.floor(Math.random() * 15) + 1)!;

  return (
    <ButtonBase sx={{ flex: 1, display: 'flex' }}>
      <Stack
        direction="row"
        sx={{
          p: 1,
          gap: 0.5,
          border: 0.5,
          flex: 1,
          overflow: 'hidden',
          alignItems: 'start',
          borderColor: 'divider',
          justifyContent: 'start',
        }}
        onClick={onAction}
      >
        <Avatar
          sx={{
            width: 24,
            height: 24,
            bgcolor: exams.config.color,
            color: getTextColor(exams.config.color),
          }}
        >
          <Iconify width={0.6} icon={exams.config.icon as any} />
        </Avatar>
        <Typography
          variant="body2"
          maxWidth={1}
          sx={{
            textAlign: 'left',
            flex: 1,
            whiteSpace: 'normal',
            wordBreak: 'break-word',
            fontWeight: active ? 'bold' : 'normal',
          }}
        >
          {abbreviate(exams.name, 12)}
        </Typography>
      </Stack>
    </ButtonBase>
  );
}
