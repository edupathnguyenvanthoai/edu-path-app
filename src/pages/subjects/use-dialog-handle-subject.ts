import { toast } from 'sonner';
import { useEffect, useCallback } from 'react';
import { useFormState } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';

import { formControl } from './formControl';
import { useSubjectController, type SubjectListData } from './use-subject-controller';

export default function useDialogHandleSubject() {
  const [search, setSearch] = useSearchParams();
  const open = search.get('open-dialog') === 'dialog-subject';
  const { isSubmitSuccessful } = useFormState({ control: formControl.control });
  const { update, create } = useSubjectController();

  const openDialog = useCallback(
    (defaultValues?: SubjectListData) => {
      setSearch((e) => {
        e.set('open-dialog', 'dialog-subject');
        return e;
      });
      formControl.reset(defaultValues ?? {});
    },
    [setSearch]
  );

  const closeDialog = useCallback(() => {
    setSearch({});
    formControl.reset({});
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

  useEffect(() => {
    if (isSubmitSuccessful) closeDialog();
  }, [closeDialog, isSubmitSuccessful]);

  return { open, openDialog, closeDialog, handleSubject };
}
