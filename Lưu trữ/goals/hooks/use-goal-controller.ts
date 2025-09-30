import { useDeferredValue } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { useSearchParams } from 'react-router-dom';

import { db } from 'src/schema/schema';

import { searchArray } from '../../../src/components/hightlight';

export type GoalItem = Omit<ExamType & Goal, 'subjectId'> & {
  goalId: number | undefined;
};

export type SubjectGoalData = Subject & {
  isGoal: boolean;
  goals: GoalItem[];
};

const useGoalController = () => {
  const [search] = useSearchParams();

  const category = search.get('category') || '';
  const searchText = search.get('search') || '';

  const _listData =
    useLiveQuery(async () => {
      const goalAll = await db.goals.toArray();
      const examMap = new Map((await db.examTypes.toArray()).map((e) => [e.id, e]));

      const _subjects = await (
        category ? db.subjects.where('category').equalsIgnoreCase(category) : db.subjects
      ).toArray();
      const subjects = searchArray(_subjects, searchText, ['category', 'name', 'admissionGroups']);

      return await Promise.all(
        subjects.map(async (s) => {
          const goals = new Map(
            goalAll.filter((g) => g.subjectId === s.id).map((g) => [g.examTypeId!, g])
          );

          const links = await db.subjectExamTypeLinks.where('subjectId').equals(s.id!).toArray();
          const examsForSubject = links.flatMap((link) => {
            const exam = examMap.get(link.examTypeId)!;
            return Array.from(
              { length: link.count },
              (): GoalItem => ({
                goalId: goals.get(link.examTypeId!)?.id,
                name: exam.name,
                examTypeId: exam.id!,
                targetScore: goals.get(link.examTypeId!)?.targetScore || 0,
                weight: exam.weight,
                config: exam.config,
              })
            );
          });

          return {
            ...s,
            isGoal: goals.size > 0,
            goals: examsForSubject,
          } as SubjectGoalData;
        })
      );
    }, [category, searchText]) ?? [];

  return useDeferredValue(_listData);
};

export default useGoalController;

export const updateGoals = async (s: SubjectGoalData) => {
  await db.transaction('rw', db.goals, async () => {
    const subjectId = s.id!;
    const goals = s.goals.map(
      (g): Goal => ({
        id: g.goalId,
        subjectId,
        examTypeId: g.examTypeId,
        targetScore: g.targetScore,
      })
    );

    await db.goals.bulkPut(goals);
  });
};
