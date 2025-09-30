import { useLiveQuery } from 'dexie-react-hooks';

import { useParams } from 'src/utils/use-params';

import { db } from 'src/schema/schema';

import { searchArray } from '../../../components/hightlight';

export function useSubject() {
  const [{ search, category }] = useParams({ search: '', category: '' });
  return (
    useLiveQuery(async () => {
      const subject = await (
        category ? db.subjects.where('category').equalsIgnoreCase(category) : db.subjects
      ).toArray();
      return searchArray(subject, search, ['category', 'name', 'admissionGroups']);
    }, [search, category]) || []
  );
}
