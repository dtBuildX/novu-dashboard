"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Search, LayoutDashboard, FolderKanban, CheckSquare,
  Calendar, Users, BarChart3, Settings, Layers, ArrowRight,
} from "lucide-react";

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

const COMMANDS = [
  { label: "Go to Dashboard",  icon: LayoutDashboard, href: "/dashboard"  },
  { label: "Go to Projects",   icon: FolderKanban,    href: "/projects"   },
  { label: "Go to Kanban",     icon: Layers,          href: "/kanban"     },
  { label: "Go to Tasks",      icon: CheckSquare,     href: "/tasks"      },
  { label: "Go to Calendar",   icon: Calendar,        href: "/calendar"   },
  { label: "Go to Team",       icon: Users,           href: "/team"       },
  { label: "Go to Analytics",  icon: BarChart3,       href: "/analytics"  },
  { label: "Go to Settings",   icon: Settings,        href: "/settings"   },
];

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const filtered = COMMANDS.filter(
    (c) => !query || c.label.toLowerCase().includes(query.toLowerCase())
  );

  const navigate = (href: string) => {
    router.push(href);
    onClose();
    setQuery("");
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-start justify-center pt-24 px-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 dark:border-gray-800">
          <Search size={18} className="text-gray-400" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search or jump to..."
            className="flex-1 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 outline-none text-sm"
          />
          <kbd className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-500 px-2 py-0.5 rounded">ESC</kbd>
        </div>

        <div className="p-2 max-h-80 overflow-y-auto">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-sm text-gray-400">No results for "{query}"</div>
          ) : (
            filtered.map((item) => (
              <button
                key={item.href}
                onClick={() => navigate(item.href)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/20 text-left group transition-colors"
              >
                <item.icon size={16} className="text-gray-400 group-hover:text-indigo-500" />
                <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-300">
                  {item.label}
                </span>
                <ArrowRight size={14} className="ml-auto text-gray-300 group-hover:text-indigo-400 opacity-0 group-hover:opacity-100 transition-all" />
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
