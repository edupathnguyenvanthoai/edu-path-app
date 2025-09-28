import type { FuseResultMatch } from 'fuse.js';

import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

import Card from '@mui/material/Card';
import { Stack, Avatar, Divider, Typography, IconButton } from '@mui/material';

import { Label } from '../../components/label';
import { Iconify } from '../../components/iconify';
import useDialogHandleSubject from './use-dialog-handle-subject';

import type { SubjectListData } from './use-subject-controller';

export type CardViewSubjectProps = {
  subject: SubjectListData;
  matches?: readonly FuseResultMatch[];
};

export default function CardViewSubject({ subject }: CardViewSubjectProps) {
  const [search, setSearch] = useSearchParams();
  const admissionGroups = (search.get('admissionGroups') || '').split(',').filter(Boolean);
  const category = search.get('category') || '';
  const { openDialog } = useDialogHandleSubject();

  const handleEditSubject = useCallback((t: SubjectListData) => () => openDialog(t), [openDialog]);

  return (
    <Card component={Stack} direction="row" p={2} spacing={2} alignItems="center">
      <Avatar
        sx={{
          borderRadius: 1.25,
          background: subject.config.color,
          color: (t) => t.palette.getContrastText(subject.config.color),
        }}
      >
        <Iconify width={22} icon={subject.config.icon as any} />
      </Avatar>
      <Stack flex={1} overflow="hidden">
        <Typography noWrap flex={1} maxWidth="100%" variant="h6">
          {subject.name}
        </Typography>
        <Stack flexWrap="wrap" direction="row" gap={0.5}>
          <Label
            onClick={() => {
              setSearch((e) => {
                if (e.get('category') === subject.category) e.delete('category');
                else e.set('category', subject.category);
                return e;
              });
            }}
            color={category === subject.category ? 'info' : 'default'}
          >
            {subject.category}
          </Label>
          <Divider orientation="vertical" flexItem />
          {subject.admissionGroups.map((x) => (
            <Label
              key={x}
              onClick={() =>
                setSearch(
                  (e) => {
                    if (admissionGroups.includes(x)) {
                      if (admissionGroups.length === 1) e.delete('admissionGroups');
                      else
                        e.set('admissionGroups', admissionGroups.filter((i) => i !== x).join(','));
                    } else e.set('admissionGroups', admissionGroups.concat(x).join(','));
                    return e;
                  },
                  { replace: true }
                )
              }
              color={admissionGroups.includes(x) ? 'info' : 'default'}
            >
              {x}
            </Label>
          ))}
        </Stack>
      </Stack>
      <IconButton onClick={handleEditSubject(subject)}>
        <Iconify icon="solar:pen-bold" />
      </IconButton>
    </Card>
  );
}
