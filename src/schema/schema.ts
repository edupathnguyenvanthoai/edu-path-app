import type { Table } from 'dexie';

import Dexie from 'dexie';

export class AppDB extends Dexie {
  subjects!: Table<Subject, number>;
  examTypes!: Table<ExamType, number>;
  goals!: Table<Goal, number>;
  scores!: Table<Score, number>;
  materials!: Table<Material, number>;
  schedules!: Table<Schedule, number>;
  notes!: Table<Note, number>;

  constructor() {
    super('EdupathApp');

    this.version(1).stores({
      subjects:'++id,name,category',
      examTypes: '++id,name',
      goals: '++id,subjectId,examTypeId',
      scores: '++id,goalId,subjectId,examTypeId,score,createdAt,updatedAt',
      materials: '++id,subjectId,name',
      schedules: '++id,subjectId,title,type,startTime,endTime,recurring',
      notes: '++id,title,content,label,checked,createdAt,updatedAt',
    });
  }
}

export const db = new AppDB();
