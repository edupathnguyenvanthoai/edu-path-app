import { useLiveQuery } from 'dexie-react-hooks';

import { db } from '../../../schema/schema';
import { useParams } from '../../../utils/use-params';
import { searchArray } from '../../../components/hightlight';
import { DEFAULT_GOAL_SCORE } from '../context/goal-config-form-control';

export type SubjectCheckGoal = Subject & {
  isGoal: boolean;
};

export function useGoals() {
  const [{ search, category }] = useParams({ search: '', category: '' });

  const result = useLiveQuery(async () => {
    // lấy danh sách subject và exam tyoe ra
    const subjects = await (
      category ? db.subjects.where('category').equalsIgnoreCase(category.toString()) : db.subjects
    ).toArray();
    // tìm kiểm subject trước
    const filteredSubjects = searchArray(subjects, search.toString(), [
      'category',
      'name',
      'admissionGroups',
    ]);
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

export async function getGoals(subjectId: number) {
  const goals = await db.goals.where('subjectId').equals(subjectId).toArray();
  if (goals.length === 0) {
    const goalsDefault = (await db.examTypes.toArray())?.map((x) => ({
      subjectId: subjectId!,
      examTypeId: x.id!,
      targetScore: DEFAULT_GOAL_SCORE,
    }));
    return {
      subject: { ...(await db.subjects.get(subjectId)), isGoal: false } as SubjectCheckGoal,
      goals: goalsDefault,
    };
  }
  return {
    subject: { ...(await db.subjects.get(subjectId)), isGoal: true } as SubjectCheckGoal,
    goals,
  };
}

export async function updateGoals(goals: Goal[], subjectId: number) {
  return await db.transaction('rw', db.goals, db.subjects, async () => {
    const lstIds = goals.map((x) => x.id).filter(Boolean);
    await db.goals
      .toCollection()
      .filter((x) => x.subjectId === subjectId && !lstIds.includes(x.id!))
      .delete();
    return await db.goals.bulkPut(goals);
  });
}
