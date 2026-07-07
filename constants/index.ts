import type { Priority, Status } from "@/types";

export const PRIORITY_CONFIG: Record<Priority, { label: string; color: string; bg: string; icon: string }> = {
  urgent: { label: "Urgent", color: "#ef4444", bg: "#fef2f2", icon: "🔴" },
  high:   { label: "High",   color: "#f59e0b", bg: "#fffbeb", icon: "🟠" },
  medium: { label: "Medium", color: "#3b82f6", bg: "#eff6ff", icon: "🔵" },
  low:    { label: "Low",    color: "#22c55e", bg: "#f0fdf4", icon: "🟢" },
};

export const STATUS_CONFIG: Record<Status, { label: string; color: string; bg: string }> = {
  backlog:     { label: "Backlog",     color: "#6b7280", bg: "#f9fafb" },
  todo:        { label: "Todo",        color: "#3b82f6", bg: "#eff6ff" },
  "in-progress": { label: "In Progress", color: "#f59e0b", bg: "#fffbeb" },
  review:      { label: "Review",      color: "#8b5cf6", bg: "#f5f3ff" },
  done:        { label: "Done",        color: "#22c55e", bg: "#f0fdf4" },
};

export const AVATAR_COLORS = [
  "bg-violet-500","bg-blue-500","bg-emerald-500",
  "bg-amber-500","bg-pink-500","bg-indigo-500",
  "bg-rose-500","bg-cyan-500",
];

export const NAV_ITEMS = [
  { id: "dashboard",  label: "Dashboard",     href: "/dashboard"  },
  { id: "projects",   label: "Projects",      href: "/projects"   },
  { id: "kanban",     label: "Kanban",        href: "/kanban"     },
  { id: "tasks",      label: "Tasks",         href: "/tasks"      },
  { id: "calendar",   label: "Calendar",      href: "/calendar"   },
  { id: "team",       label: "Team",          href: "/team"       },
  { id: "analytics",  label: "Analytics",     href: "/analytics"  },
  { id: "activity",   label: "Activity",      href: "/activity"   },
  { id: "files",      label: "Files",         href: "/files"      },
] as const;

export const BOTTOM_NAV_ITEMS = [
  { id: "settings", label: "Settings", href: "/settings" },
  { id: "profile",  label: "Profile",  href: "/profile"  },
] as const;
