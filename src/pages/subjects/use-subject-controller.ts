import type { FuseResult } from 'fuse.js';
import type { AxiosRequestConfig } from 'axios';

import axios from 'axios';
import { useLiveQuery } from 'dexie-react-hooks';
import { useSearchParams } from 'react-router-dom';
import { useMemo, useState, useCallback, useDeferredValue } from 'react';

import { db } from 'src/schema/schema';

import { searchWithFuse } from '../../components/hightlight';

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

  const _category = search.get('category') || 'All';
  const _searchText = search.get('search') || '';
  const _admissionGroups = (search.get('admissionGroups') || '').split(',').filter(Boolean);

  const category = useDeferredValue(_category);
  const searchText = useDeferredValue(_searchText);
  const admissionGroups = useDeferredValue(_admissionGroups);

  const _rawSubjects = useLiveQuery(() => db.subjects.toArray(), []);
  const _rawExams = useLiveQuery(() => db.examTypes.toArray(), []);
  const _rawSubjectExams = useLiveQuery(() => db.subjectExamTypeLinks.toArray(), []);

  const _listData: FuseResult<SubjectListData>[] = useMemo(() => {
    if (_rawSubjects && _rawExams && _rawSubjectExams) {
      return searchWithFuse(
        _rawSubjects
          .filter((subject) => subject.category === category || category === 'All')
          .filter(
            (subject) =>
              admissionGroups.some((admissionGroup) =>
                subject.admissionGroups.includes(admissionGroup)
              ) || admissionGroups.length === 0
          )
          .map((subject) => ({
            ...subject,
            exams: _rawSubjectExams
              .filter((x) => x.subjectId === subject.id)
              .map((x) => ({
                ..._rawExams.find((e) => e.id === x.examTypeId)!,
                count: x.count,
              })),
          })),
        searchText,
        ['name', 'category', 'admissionGroups']
      );
    }
    return [];
  }, [_rawExams, _rawSubjectExams, _rawSubjects, admissionGroups, category, searchText]);

  const create = useCallback(async (data: SubjectListData) => {
    setStatus('creating');
    await db.transaction('rw', db.subjects, db.subjectExamTypeLinks, async () => {
      const { exams, ...subject } = data;
      const id = await db.subjects.add(subject);
      await Promise.all(
        exams
          .filter((i) => i.count)
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
              .filter((i) => i.count)
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

  const pullData = useCallback((url: string, config?: AxiosRequestConfig<any>) => {
    setStatus('pulling');
    axios
      .get<SubjectListData[]>(url, config)
      .then(async (res) => {
        db.transaction('rw', db.subjects, db.subjectExamTypeLinks, db.examTypes, async () => {
          await db.subjects.bulkPut(
            res.data.map((x) => ({
              id: x.id,
              name: x.name,
              category: x.category,
              admissionGroups: x.admissionGroups,
              config: x.config,
              weight: x.weight,
            }))
          );
          await Promise.all(
            res.data
              .filter((x) => x.exams?.length)
              .map(async (x) => {
                await db.examTypes.bulkPut(
                  x.exams.map((y) => ({
                    id: y.id,
                    name: y.name,
                    weight: y.weight,
                    config: y.config,
                  }))
                );
                const links = await db.subjectExamTypeLinks
                  .where('subjectId')
                  .equals(x.id!)
                  .toArray();
                await Promise.all(
                  links.map(async (link) => {
                    await db.subjectExamTypeLinks.delete(link.id!);
                  })
                );

                await Promise.all(
                  x.exams.map(async (exams) => {
                    await db.subjectExamTypeLinks.add({
                      examTypeId: exams.id,
                      subjectId: x.id!,
                      count: exams.count,
                    });
                  })
                );
              })
          );
        });
      })
      .finally(() => {
        setStatus('idle');
      });
  }, []);

  const listData = useDeferredValue(_listData, []);

  return { listData, create, update, remove, pullData, status };
};
