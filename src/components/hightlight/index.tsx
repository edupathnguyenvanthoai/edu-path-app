import type { RangeTuple, FuseResult, FuseOptionKey } from 'fuse.js';

import Fuse from 'fuse.js';
import { memo } from 'react';

export type HighlightTextProps<T = any> = { data: T; indices?: readonly RangeTuple[] };
function HighlightText({ data: text, indices = [] }: HighlightTextProps) {
  const str = (text as any).toString();
  let lastIndex = 0;
  const parts: React.ReactNode[] = [];
  indices.forEach(([start, end], i) => {
    parts.push(str.slice(lastIndex, start));
    parts.push(<mark key={i}>{str.slice(start, end + 1)}</mark>);
    lastIndex = end + 1;
  });

  parts.push(str.slice(lastIndex));
  return <>{parts}</>;
}

export default memo(HighlightText);

export function searchWithFuse<T = any>(
  list?: T[],
  search?: string,
  keys?: FuseOptionKey<T>[]
): FuseResult<T>[] {
  if (!list || !list.length) return [];
  if (search) {
    const fuse = new Fuse(list, {
      keys,
      includeMatches: true, // thêm vào sử lý hightlinght
      ignoreDiacritics: true, // bỏ dấu tiếng việt
      threshold: 0.3,
    });
    return fuse.search(search);
  }

  return list.map((x, i) => ({ item: x, refIndex: i }) as FuseResult<T>);
}

export function searchArray<T = any>(list?: T[], search?: string, keys?: FuseOptionKey<T>[]): T[] {
  if (!list || !list.length) return [];
  if (search) {
    const fuse = new Fuse(list, {
      keys,
      ignoreDiacritics: true, // bỏ dấu tiếng việt
      threshold: 0.4,
    });
    return fuse.search(search).map((x) => x.item);
  }

  return list;
}
