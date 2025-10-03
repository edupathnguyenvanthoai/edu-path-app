import { Avatar, ButtonBase, Typography } from '@mui/material';

import { abbreviate } from '../util/view-list';
import { Iconify } from '../../../components/iconify';
import { getTextColor } from '../../../utils/action-theme';
import { useSubjectDataView } from '../context/subject-data-view';

export const DAY = Array.from({ length: 7 }, (_, i) => i + 1);
DAY[6] = 0;

type CardCellScheduleProps = {
  subject: Subject;
  onAction?: () => void;
};

export function CardCellSchedule({ subject, onAction }: CardCellScheduleProps) {
  const { subjectMap } = useSubjectDataView();
  const exams = subjectMap.get(Math.floor(Math.random() * 15) + 1)!;
  // console.log(exams);
  
  return (
    <ButtonBase
      sx={{
        flex: 1,
        px: 0.5,
        py: 1,
        flexDirection: 'column',
        justifyContent: 'start',
        overflow: 'hidden',
        alignItems: 'center',
        border: 0.5,
        borderColor: 'divider',
      }}
      onClick={onAction}
    >
      <Avatar
        sx={{
          width: 28,
          height: 28,
          my: 1,
          bgcolor: exams.config.color,
          color: getTextColor(exams.config.color),
        }}
      >
        <Iconify width={0.6} icon={exams?.config?.icon as any} />
      </Avatar>
      <Typography
        textAlign="center"
        variant="body2"
        maxWidth={1}
        sx={{
          whiteSpace: 'normal',
          wordBreak: 'break-word',
        }}
      >
        {abbreviate(exams.name, 12)}
      </Typography>
    </ButtonBase>
  );
}
