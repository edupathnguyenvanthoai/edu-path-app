import { useLiveQuery } from 'dexie-react-hooks';

import { useParams } from 'src/utils/use-params';

import { db } from 'src/schema/schema';

import { searchArray } from '../../../components/hightlight';

export function useSubject() {
  const [{ search, category }] = useParams({ search: '', category: '' });
  return (
    useLiveQuery(async () => {
      const subject = await (
        category ? db.subjects.where('category').equalsIgnoreCase(category.toString()) : db.subjects
      ).toArray();
      const subjects = searchArray(subject, search.toString(), [
        'category',
        'name',
        'admissionGroups',
      ]);

      const scoreMap = (await db.scores.toArray()).reduce((prev, current) => {
        if (prev.has(current.goalId!)) {
          prev.get(current.goalId!)?.push(current);
        } else {
          prev.set(current.goalId!, [current]);
        }

        return prev;
      }, new Map<number, Score[]>());

      return {
        subjects,
        scoreMap,
      };
    }, [search, category]) || { subjects: [], scoreMap: new Map() }
  );
}
