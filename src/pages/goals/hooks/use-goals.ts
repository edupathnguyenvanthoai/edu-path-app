import { useLiveQuery } from 'dexie-react-hooks';

import { db } from '../../../schema/schema';
import { useParams } from '../../../utils/use-params';
import { searchArray } from '../../../components/hightlight';

export type SubjectCheckGoal = Subject & {
  isGoal: boolean;
};

export function useGoals() {
  const [{ search, category }] = useParams({ search: '', category: '' });

  const result = useLiveQuery(async () => {
    // lấy danh sách subject và exam tyoe ra
    const subjects = await (
      category ? db.subjects.where('category').equalsIgnoreCase(category) : db.subjects
    ).toArray();
    // tìm kiểm subject trước
    const filteredSubjects = searchArray(subjects, search, ['category', 'name', 'admissionGroups']);
    const subjectIds = filteredSubjects.map((s) => s.id!);
    // lọc ra goals dựa trên subject
    const goals = subjectIds.length
      ? await db.goals.where('subjectId').anyOf(subjectIds).toArray()
      : [];
    const goalsMap = goals.reduce((prev, current) => {
      const list = prev.get(current.subjectId!) ?? [];
      list.push(current);
      prev.set(current.subjectId!, list);
      return prev;
    }, new Map<number, Goal[]>());
    // trả về danh sách subject dựa trên goals
    return {
      subjects: filteredSubjects.map((subject) => ({
        ...subject,
        isGoal: goalsMap.has(subject.id!),
      })) as SubjectCheckGoal[],
      goalsMap,
    };
  }, [search, category]);

  return {
    subjects: result?.subjects || [],
    goalsMap: (result?.goalsMap as Map<number, Goal[]>) || new Map(),
  };
}
