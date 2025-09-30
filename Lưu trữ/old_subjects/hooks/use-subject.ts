import { useSearchParams } from 'react-router-dom';

export default function useSubject() {
  const [search] = useSearchParams();
  const category = search.get('category') || '';
  const searchText = search.get('search') || '';

  const listData = []
}
