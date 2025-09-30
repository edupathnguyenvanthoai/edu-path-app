import { useSearchParams } from 'react-router-dom';
import { useRef, useMemo, useState, useEffect, useCallback } from 'react';

export default function useStateParams(name: string, defaultValue?: string) {
  const [params, setParams] = useSearchParams();
  const value = useMemo(() => params.get(name) || defaultValue || '', [params, name, defaultValue]);
  const [data, setData] = useState<string>(value);

  const isChange = useRef<boolean>(false);
  const setter = useCallback((val?: string) => {
    setData(val || '');
    isChange.current = true;
  }, []);

  useEffect(() => {
    if (!isChange.current) {
      setData((v) => {
        if (v !== value) {
          return value;
        }
        return v;
      });
    }
  }, [value]);

  useEffect(() => {
    if (isChange.current) {
      setParams(
        (e) => {
          if (!data || data === defaultValue) {
            e.delete(name);
            return e;
          }
          e.set(name, data || '');
          return e;
        },
        { replace: true }
      );
      isChange.current = false;
    }
  }, [value, setParams, name, data, defaultValue]);

  return [data, setter] as const;
}

export function useParams<T>(defaultValue: T) {
  const [search, setSearch] = useSearchParams();
  const data = useMemo(
    () =>
      Object.entries(defaultValue ?? {}).reduce(
        (acc, [key, value]) => ({ ...acc, [key]: search.get(key) || value }),
        {} as T
      ),
    [defaultValue, search]
  );

  const setData = useCallback(
    (newData: Record<string, string>) => {
      setSearch(
        (e) => {
          Object.keys(defaultValue ?? {}).forEach((key) => {
            if (newData[key] || newData[key] === defaultValue[key as keyof T]) e.delete(key);
            else e.set(key, newData[key]);
          });
          return e;
        },
        { replace: true }
      );
    },
    [setSearch, defaultValue]
  );

  return [data, setData] as const;
}
