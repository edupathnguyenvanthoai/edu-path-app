import { create } from 'zustand/react';
import { useWatch, Controller } from 'react-hook-form';

import {
  Box,
  Card,
  Stack,
  Avatar,
  Select,
  Button,
  Divider,
  MenuItem,
  Collapse,
  Typography,
  IconButton,
  CardActions,
} from '@mui/material';

import { SliderScore } from './slider-score';
import { Label } from '../../../components/label';
import { Iconify } from '../../../components/iconify';
import ViewCircularScore from './view-circular-score';
import { getTextColor } from '../../../utils/action-theme';
import ButtonDelete from '../../../components/button-delete';
import { DEFAULT_GOAL_SCORE, GoalConfigFormControl } from '../context/goal-config-form-control';

export const useExpand = create<useExpandType>((set) => ({
  idx: -1,
  onToggle: (id: number) => set((state) => ({ idx: state.idx === id ? -1 : id })),
  setFalse: () => set({ idx: -1 }),
}));

export function CardItemGoalView({
  examType,
  index,
  isDel,
  onCopy,
  onDelete,
}: CardItemGoalViewProps) {
  const { idx, onToggle } = useExpand();
  const [targetScore, examTypeId] = useWatch({
    control: GoalConfigFormControl.control,
    name: [`goals.${index}.targetScore`, `goals.${index}.examTypeId`],
  });

  return (
    <Card>
      <Stack direction="row" alignItems="center" spacing={1} p={1.5}>
        <Controller
          control={GoalConfigFormControl.control}
          name={`goals.${index}.examTypeId`}
          render={({ field: { value, onChange } }) => (
            <SelectExample
              value={value ?? DEFAULT_GOAL_SCORE}
              onChange={onChange}
              index={index}
              idx={idx}
              examType={examType}
            />
          )}
        />
        <IconButton onClick={() => onToggle(index)} sx={{ p: 0 }}>
          <ViewCircularScore size={28} score={targetScore} />
        </IconButton>
      </Stack>
      <Collapse in={idx === index}>
        <Divider style={{ borderStyle: 'dashed' }} />
        <Controller
          control={GoalConfigFormControl.control}
          name={`goals.${index}.targetScore`}
          render={({ field: { value, onChange } }) => (
            <SliderScore
              value={value}
              onChange={onChange}
              height={4}
              sx={{
                width: 1,
                px: 4,
                mt: 2,
              }}
            />
          )}
        />
        <CardActions>
          <ButtonDelete
            show={isDel}
            onDelete={() => {
              onDelete();
              onToggle(-1);
            }}
          />
          <Box flex={1} />
          <Button
            color="inherit"
            startIcon={<Iconify icon="solar:copy-bold" />}
            onClick={() => {
              onCopy();
              onToggle(index + 1);
            }}
          >
            Thêm kiểm tra {examType.get(examTypeId ?? -1)?.name.toLowerCase()}
          </Button>
        </CardActions>
      </Collapse>
    </Card>
  );
}

// --------------------------------------------------------------------------------

const SelectExample = ({
  examType,
  index,
  idx,
  value,
  onChange,
}: {
  examType: Map<number, ExamType>;
  index: number;
  idx: number;
  value: number;
  onChange: (value: number) => void;
}) => (
  <Select
    readOnly={idx === index}
    fullWidth
    value={value}
    IconComponent={null as any}
    onChange={(e) => onChange(e.target.value)}
    sx={{
      '& .MuiSelect-select': {
        overflow: 'visible',
        display: 'flex',
        alignItems: 'center',
        p: 0,
      },
      '& fieldset': { border: 'none' },
    }}
  >
    {Array.from(examType.values()).map((e) => (
      <MenuItem key={e.id} value={e.id}>
        <Avatar
          sx={{
            width: 36,
            height: 36,
            borderRadius: 0.75,
            bgcolor: e.config.bgcolor,
            color: getTextColor(e.config.bgcolor),
          }}
        >
          <Iconify icon={e.config.icon as any} />
        </Avatar>
        <Stack alignItems="flex-start" ml={1.5}>
          <Typography fontWeight={800}>{e.name}</Typography>
          <Label sx={{ fontSize: 12, opacity: 0.8 }}>
            Điểm hệ số {e?.weight}
          </Label>
        </Stack>
      </MenuItem>
    ))}
  </Select>
);

type CardItemGoalViewProps = {
  examType: Map<number, ExamType>;
  index: number;
  isDel: boolean;
  onDelete: () => void;
  onCopy: () => void;
};

type useExpandType = {
  idx: number;
  onToggle: (n: number) => void;
  setFalse: () => void;
};
