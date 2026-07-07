import { create } from "zustand";
import type { Notification, Task } from "@/types";
import { NOTIFICATIONS, TASKS } from "@/lib/data";

interface Toast {
  id: number;
  message: string;
  type: "success" | "error" | "info";
}

interface AppState {
  dark: boolean;
  setDark: (v: boolean) => void;
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  notifications: Notification[];
  markAllRead: () => void;
  toasts: Toast[];
  addToast: (message: string, type?: Toast["type"]) => void;
  removeToast: (id: number) => void;
  tasks: Task[];
  moveTask: (taskId: string, status: Task["status"]) => void;
}

export const useAppStore = create<AppState>()((set) => ({
  dark: false,
  setDark: (v) => set({ dark: v }),

  sidebarCollapsed: false,
  toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),

  notifications: NOTIFICATIONS,
  markAllRead: () =>
    set((s) => ({
      notifications: s.notifications.map((n) => ({ ...n, read: true })),
    })),

  toasts: [],
  addToast: (message, type = "success") => {
    const id = Date.now();
    set((s) => ({ toasts: [...s.toasts, { id, message, type }] }));
    setTimeout(
      () => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
      3500
    );
  },
  removeToast: (id) =>
    set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),

  tasks: TASKS,
  moveTask: (taskId, status) =>
    set((s) => ({
      tasks: s.tasks.map((t) => (t.id === taskId ? { ...t, status } : t)),
    })),
}));
