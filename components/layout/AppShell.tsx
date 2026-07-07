"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { CommandPalette } from "@/components/layout/CommandPalette";
import { NotificationsPanel } from "@/components/layout/NotificationsPanel";
import { ToastContainer } from "@/components/ui";
import { useAppStore } from "@/store/useAppStore";

const PAGE_TITLES: Record<string, string> = {
  "/dashboard":       "Dashboard",
  "/projects":        "Projects",
  "/kanban":          "Kanban Board",
  "/tasks":           "Tasks",
  "/calendar":        "Calendar",
  "/team":            "Team",
  "/analytics":       "Analytics",
  "/activity":        "Activity Feed",
  "/files":           "Files",
  "/settings":        "Settings",
  "/profile":         "My Profile",
};

interface AppShellProps {
  children: React.ReactNode;
  authRoutes?: string[];
}

export function AppShell({ children, authRoutes = [] }: AppShellProps) {
  const pathname = usePathname();
  const { dark, sidebarCollapsed, toasts, removeToast } = useAppStore();
  const [showCommand,       setShowCommand]       = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // Apply dark class to <html>
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  // ⌘K shortcut
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setShowCommand((v) => !v);
      }
      if (e.key === "Escape") {
        setShowCommand(false);
        setShowNotifications(false);
      }
    };
    window.addEventListener("keydown", down);
    return () => window.removeEventListener("keydown", down);
  }, []);

  // Auth routes: render page only, no shell
  const isAuthRoute = authRoutes.some((r) => pathname.startsWith(r));
  if (isAuthRoute) {
    return <>{children}</>;
  }

  const title = PAGE_TITLES[pathname] ?? "Dashboard";

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950 overflow-hidden">
      <Sidebar collapsed={sidebarCollapsed} />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar
          title={title}
          onSearch={() => setShowCommand(true)}
          onNotifications={() => setShowNotifications((v) => !v)}
        />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>

      <CommandPalette
        open={showCommand}
        onClose={() => setShowCommand(false)}
      />
      <NotificationsPanel
        open={showNotifications}
        onClose={() => setShowNotifications(false)}
      />
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}
