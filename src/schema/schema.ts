import type { Table } from 'dexie';

import Dexie from 'dexie';

export class AppDB extends Dexie {
  subjects!: Table<Subject, number>;
  examTypes!: Table<ExamType, number>;
  subjectExamTypeLinks!: Table<SubjectExamTypeLink, number>;
  goals!: Table<Goal, number>;
  scores!: Table<Score, number>;
  materials!: Table<Material, number>;
  schedules!: Table<Schedule, number>;
  notes!: Table<Note, number>;

  constructor() {
    super('EdupathApp');

    this.version(1).stores({
      subjects:'++id,&name,config,weight,category,admissionGroups',
      examTypes: '++id,&name,weight,config',
      subjectExamTypeLinks: '++id,subjectId,examTypeId,count',
      goals: '++id,subjectId,examType,targetScore,dueDate',
      scores: '++id,goalId,score,createdAt,updatedAt',
      materials: '++id,subjectId,name,size,url,mimeType,createdAt,updatedAt',
      schedules: '++id,subjectId,title,type,startTime,endTime,recurring',
      notes: '++id,title,content,label,checked,createdAt,updatedAt',
    });
  }
}

export const db = new AppDB();
