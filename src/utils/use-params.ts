import { useSearchParams } from 'react-router-dom';
import { useRef, useMemo, useState, useEffect, useCallback } from 'react';

export default function useStateParams(name: string, defaultValue?: string) {
  const [params, setParams] = useSearchParams();
  const key = useMemo(() => toKebabCase(name), [name]);
  const value = useMemo(() => params.get(key) || defaultValue || '', [params, key, defaultValue]);
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
            e.delete(key);
            return e;
          }
          e.set(key, data || '');
          return e;
        },
        { replace: true }
      );
      isChange.current = false;
    }
  }, [value, setParams, key, data, defaultValue]);

  return [data, setter] as const;
}
type Params = Record<string, string | number | boolean>;
export function useParams(defaultValue: Params = {}) {
  const [search, setSearch] = useSearchParams();
  const data = useMemo(
    () =>
      Object.entries(defaultValue ?? {}).reduce((acc, [key, value]) => {
        let val: number | string | boolean = search.get(toKebabCase(key)) || value;
        if (typeof value === 'boolean') val = val === 'true';
        if (typeof value === 'number') val = Number(val);
        if (typeof value === 'string') val = String(val);
        return { ...acc, [key]: val };
      }, {} as Params),
    [defaultValue, search]
  );

  const setData = useCallback(
    (newData?: Record<string, string | number | boolean>) => {
      setSearch(
        (e) => {
          if (!newData) {
            Object.keys(defaultValue).map((k) => e.delete(toKebabCase(k)));
            return e;
          }
          Object.entries(newData).map(([k, v]) => {
            const value = v.toString();
            if (value === defaultValue[k].toString()) e.delete(toKebabCase(k));
            else e.set(toKebabCase(k), value);
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

function toKebabCase(str: string): string {
  return str
    .trim()
    .replace(/([a-z])([A-Z])/g, '$1-$2') // tách camelCase
    .replace(/\s+/g, '-') // thay khoảng trắng bằng -
    .toLowerCase();
}
