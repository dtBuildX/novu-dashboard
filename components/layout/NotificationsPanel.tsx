"use client";

import { X, Bell, Clock, MessageSquare, User, FolderKanban, AtSign } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";

interface NotificationsPanelProps {
  open: boolean;
  onClose: () => void;
}

const TYPE_ICONS: Record<string, React.ElementType> = {
  mention:    AtSign,
  deadline:   Clock,
  comment:    MessageSquare,
  assignment: User,
  project:    FolderKanban,
};

const TYPE_COLORS: Record<string, string> = {
  mention:    "#6366f1",
  deadline:   "#f59e0b",
  comment:    "#3b82f6",
  assignment: "#22c55e",
  project:    "#8b5cf6",
};

export function NotificationsPanel({ open, onClose }: NotificationsPanelProps) {
  const { notifications, markAllRead } = useAppStore();

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className="fixed top-16 right-4 z-50 w-96 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-800">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Notifications</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={() => { markAllRead(); }}
              className="text-xs text-indigo-600 hover:text-indigo-700 font-medium"
            >
              Mark all read
            </button>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-gray-400"
            >
              <X size={14} />
            </button>
          </div>
        </div>

        {/* List */}
        <div className="max-h-[420px] overflow-y-auto">
          {notifications.map((n) => {
            const Icon = TYPE_ICONS[n.type] || Bell;
            const color = TYPE_COLORS[n.type] || "#6366f1";
            return (
              <div
                key={n.id}
                className={`flex items-start gap-3 px-4 py-3 border-b border-gray-50 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-colors ${!n.read ? "bg-indigo-50/50 dark:bg-indigo-900/10" : ""}`}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: color + "20" }}
                >
                  <Icon size={14} style={{ color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-900 dark:text-white">{n.title}</p>
                  <p className="text-xs text-gray-500">{n.body}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{n.time}</p>
                </div>
                {!n.read && (
                  <div className="w-2 h-2 rounded-full bg-indigo-500 flex-shrink-0 mt-1" />
                )}
              </div>
            );
          })}
        </div>

        <div className="px-4 py-3 text-center border-t border-gray-100 dark:border-gray-800">
          <button className="text-xs text-indigo-600 hover:text-indigo-700 font-medium">
            View all notifications
          </button>
        </div>
      </div>
    </>
  );
}
