"use client";

import { Bell, Menu, Moon, Search, Sun } from "lucide-react";
import { Avatar } from "@/components/ui";
import { useAppStore } from "@/store/useAppStore";

interface TopbarProps {
  title: string;
  onSearch: () => void;
  onNotifications: () => void;
}

export function Topbar({ title, onSearch, onNotifications }: TopbarProps) {
  const { dark, setDark, toggleSidebar, notifications } = useAppStore();
  const unread = notifications.filter((n) => !n.read).length;

  return (
    <header className="flex items-center justify-between h-16 px-6 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 flex-shrink-0">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-gray-500 transition-colors"
        >
          <Menu size={18} />
        </button>
        <h1 className="text-base font-semibold text-gray-900 dark:text-white">{title}</h1>
      </div>

      <div className="flex items-center gap-2">
        {/* Search trigger */}
        <button
          onClick={onSearch}
          className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg text-sm text-gray-500 transition-colors"
        >
          <Search size={14} />
          <span className="hidden sm:inline">Search</span>
          <kbd className="hidden sm:inline text-xs bg-gray-200 dark:bg-gray-700 px-1.5 py-0.5 rounded text-gray-400">
            ⌘K
          </kbd>
        </button>

        {/* Dark mode */}
        <button
          onClick={() => setDark(!dark)}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-gray-500 transition-colors"
        >
          {dark ? <Sun size={17} /> : <Moon size={17} />}
        </button>

        {/* Notifications */}
        <button
          onClick={onNotifications}
          className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-gray-500 transition-colors"
        >
          <Bell size={17} />
          {unread > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-indigo-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
              {unread}
            </span>
          )}
        </button>

        <Avatar seed="AR" size="sm" className="cursor-pointer" />
      </div>
    </header>
  );
}
