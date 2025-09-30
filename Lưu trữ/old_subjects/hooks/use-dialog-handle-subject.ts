import { toast } from 'sonner';
import { useEffect, useCallback } from 'react';
import { useFormState } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';

import { formControl } from '../context/formControl';
import { useSubjectController } from './use-subject-controller';
import { solarIcons } from '../../../components/iconify/icon-solar';
import { COLOR_LIST } from '../../../components/color-utils/color-set';

import type { SubjectListData } from './use-subject-controller';

const solarIconsName = Object.keys(solarIcons);

export default function useDialogHandleSubject() {
  const [search, setSearch] = useSearchParams();
  const exams = formControl.watch('exams');
  const open = search.get('open-dialog') === 'dialog-subject' && Boolean(exams);
  const { isSubmitSuccessful } = useFormState({ control: formControl.control });
  const { update, create, remove } = useSubjectController();

  const openDialog = useCallback(
    (defaultValues?: SubjectListData) => {
      setSearch((e) => {
        e.set('open-dialog', 'dialog-subject');
        return e;
      });
      formControl.reset(
        defaultValues ?? {
          config: {
            color: COLOR_LIST[Math.floor(Math.random() * COLOR_LIST.length)],
            icon: solarIconsName[Math.floor(Math.random() * solarIconsName.length)],
          },
          category: search.get('category') || 'Tự chọn',
          admissionGroups: search.get('admissionGroups')?.split(',').filter(Boolean) || [],
          exams: [],
        }
      );
    },
    [search, setSearch]
  );

  const closeDialog = useCallback(() => {
    setSearch((e) => {
      e.delete('open-dialog');
      return e;
    });
  }, [setSearch]);

  const handleSubject = useCallback(
    () =>
      formControl.handleSubmit(async (data) => {
        if (data.id) {
          if (await update(data)) {
            toast.success(`Cập nhật môn học "${data.name}" thành công!`);
          } else {
            toast.error(`Cập nhật môn học "${data.name}" thất bại!`);
            throw new Error();
          }
        } else {
          if (await create(data)) {
            toast.success(`Tạo môn học "${data.name}" thành công!`);
          } else {
            toast.error(`Tạo môn học "${data.name}" thất bại!`);
            throw new Error();
          }
        }
      })(),
    [create, update]
  );

  const handleRemove = useCallback(() => {
    const id = formControl.getValues('id');
    if (id !== undefined) {
      remove(id)
        .then(() => {
          toast.success(`Xoá môn học "${formControl.getValues('name')}" thành công!`);
          closeDialog();
        })
        .catch(() => {
          toast.error(`Xoá môn học "${formControl.getValues('name')}" thất bại!`);
        });
    }
  }, [closeDialog, remove]);

  useEffect(() => {
    if (isSubmitSuccessful) closeDialog();
  }, [closeDialog, isSubmitSuccessful]);

  return { open, openDialog, closeDialog, handleSubject, handleRemove };
}
