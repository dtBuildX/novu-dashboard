"use client";

import { Filter } from "lucide-react";
import {
  FolderKanban, CheckSquare, MessageSquare, Paperclip,
  Rocket, AlertCircle, Users, BarChart3, RefreshCw, Activity,
} from "lucide-react";
import { Card, Avatar, Badge, Button } from "@/components/ui";
import { ACTIVITIES, getMember } from "@/lib/data";

const TYPE_ICONS: Record<string, React.ElementType> = {
  project: FolderKanban,
  task:    CheckSquare,
  comment: MessageSquare,
  file:    Paperclip,
  deploy:  Rocket,
  bug:     AlertCircle,
  member:  Users,
  report:  BarChart3,
  update:  RefreshCw,
};

const TYPE_COLORS: Record<string, string> = {
  project: "#6366f1",
  task:    "#22c55e",
  comment: "#3b82f6",
  file:    "#f59e0b",
  deploy:  "#8b5cf6",
  bug:     "#ef4444",
  member:  "#ec4899",
  report:  "#14b8a6",
  update:  "#f97316",
};

export default function ActivityPage() {
  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Activity Feed</h2>
        <Button variant="secondary" icon={Filter}>Filter</Button>
      </div>

      <div className="max-w-2xl space-y-4">
        {ACTIVITIES.map((a, idx) => {
          const m     = getMember(a.user);
          const Icon  = TYPE_ICONS[a.type] || Activity;
          const color = TYPE_COLORS[a.type] || "#6366f1";
          return (
            <div key={a.id} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: color + "20" }}>
                  <Icon size={15} style={{ color }} />
                </div>
                {idx < ACTIVITIES.length - 1 && (
                  <div className="w-px flex-1 bg-gray-200 dark:bg-gray-800 mt-2" />
                )}
              </div>
              <Card className="flex-1 p-4 mb-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-3">
                    <Avatar seed={m?.avatar} size="sm" />
                    <div>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        <span className="font-semibold text-gray-900 dark:text-white">{m?.name}</span>{" "}
                        <span>{a.action}</span>{" "}
                        <span className="font-medium text-indigo-600 dark:text-indigo-400">{a.target}</span>
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">{a.time}</p>
                    </div>
                  </div>
                  <Badge>{a.type}</Badge>
                </div>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}
