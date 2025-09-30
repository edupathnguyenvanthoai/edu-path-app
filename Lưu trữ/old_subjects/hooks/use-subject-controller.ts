import type { AxiosRequestConfig } from 'axios';

import axios from 'axios';
import { useLiveQuery } from 'dexie-react-hooks';
import { useSearchParams } from 'react-router-dom';
import { useState, useCallback, useDeferredValue } from 'react';

import { db } from 'src/schema/schema';

import { searchArray } from '../../../components/hightlight';

export type SubjectListData = Subject & {
  exams: (ExamType & {
    count: number;
  })[];
};

export const useSubjectController = () => {
  const [status, setStatus] = useState<
    'pulling' | 'pushing' | 'creating' | 'updating' | 'deleting' | 'idle'
  >('idle');
  const [search] = useSearchParams();

  const _category = search.get('category') || '';
  const _searchText = search.get('search') || '';

  const _listData = useLiveQuery(async () => {
    const subjects = await (
      _category ? db.subjects.where('category').equalsIgnoreCase(_category) : db.subjects
    ).toArray();

    const lst = searchArray(subjects, _searchText, ['category', 'name', 'admissionGroups']);
    const exams = await db.examTypes.toArray();
    const subjectLinks = new Map(
      (
        await db.subjectExamTypeLinks
          .where('subjectId')
          .anyOf(lst.map((i) => i.id!))
          .toArray()
      ).map((i) => [i.examTypeId, i])
    );

    return lst.map((s) => ({
      ...s,
      exams: exams.map((e) => ({
        ...e,
        count: subjectLinks.get(e.id!)?.count || 0,
      })),
    })) as SubjectListData[];
  }, [_category, _searchText]);

  const create = useCallback(async (data: SubjectListData) => {
    setStatus('creating');
    await db.transaction('rw', db.subjects, db.subjectExamTypeLinks, async () => {
      const { exams, ...subject } = data;
      const id = await db.subjects.add(subject);
      await Promise.all(
        exams
          ?.filter((i) => i.count)
          .map(async (exam) => {
            await db.subjectExamTypeLinks.add({
              examTypeId: exam.id,
              subjectId: id,
              count: exam.count,
            });
          })
      );
    });
    setStatus('idle');
    return true;
  }, []);

  const update = useCallback(
    async (data?: SubjectListData) =>
      await db.transaction('rw', db.subjects, db.subjectExamTypeLinks, async () => {
        if (data && data.id) {
          const { id, exams, ...subject } = data;
          await db.subjects.update(id, subject);
          await db.subjectExamTypeLinks.where('subjectId').equals(id).delete();
          await Promise.all(
            exams
              ?.filter((i) => i.count)
              .map(async (exam) => {
                await db.subjectExamTypeLinks.add({
                  examTypeId: exam.id,
                  subjectId: id,
                  count: exam.count,
                });
              })
          );
          return true;
        }
        return false;
      }),
    []
  );

  const remove = useCallback(async (id: number) => {
    await db.transaction('rw', db.subjects, db.subjectExamTypeLinks, async () => {
      await db.subjects.delete(id);
      await db.subjectExamTypeLinks.where('subjectId').equals(id).delete();
      return true;
    });
  }, []);

  const listData = useDeferredValue(_listData ?? [], []);

  return { listData, create, update, remove, status };
};
