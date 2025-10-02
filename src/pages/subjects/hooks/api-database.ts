import { toast } from 'sonner';

import { db } from '../../../schema/schema';
import subjectFormControl from '../context/subject-form-control';

export async function AddUpdateSubject(s: Subject) {
  // kiểm tra trùng tên
  const checked = await db.subjects.where('name').equalsIgnoreCase(s.name).first();
  if (checked && checked.id !== s.id) {
    subjectFormControl.setError('name', { message: 'Tên môn học đã tồn tại' });
    throw new Error('Tên môn học đã tồn tại');
  } else {
    if (s.id) {
      // cập nhật môn học
      await db.subjects.update(s.id, s);
      toast.success('Cập nhật môn học thành công', { id: 'subject-msg' });
    } else {
      // thêm môn học
      await db.subjects.add(s);
      toast.success('Thêm môn học thành công', { id: 'subject-msg' });
    }
  }
}

export async function DeleteSubject(id: number | undefined) {
  if (!id) throw new Error('Không tìm thấy môn học');
  // xoá môn học
  await db.subjects.delete(id);
  toast.success('Xoá môn học thành công', { id: 'subject-msg' });
}
