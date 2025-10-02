import { create } from 'zustand';

export const tabs = ['Tổng quan', 'Chi tiết'] as const;
type Tab = (typeof tabs)[number];

type useDialogConfigGoalResponse = {
  open: boolean;
  tab: Tab;
  setTab: (tab: Tab) => void;
  onOpen: (tab?: Tab) => void;
  onClose: () => void;
};

export const useDialogConfigGoal = create<useDialogConfigGoalResponse>((set) => ({
  open: false,
  tab: tabs[0],
  setTab: (tab) => set({ tab }),
  onOpen: (tab) => set({ open: true, tab: tab || tabs[0] }),
  onClose: () => set({ open: false }),
}));
