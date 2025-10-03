import { create } from 'zustand';

type useSubjectDataView = {
  subjectMap: Map<number, Subject>;
  setSubjectMap: (subjectMap: Map<number, Subject>) => void;
};

export const useSubjectDataView = create<useSubjectDataView>((set) => ({
  subjectMap: new Map(),
  setSubjectMap: (subjectMap: Map<number, Subject>) => set({ subjectMap }),
}));
