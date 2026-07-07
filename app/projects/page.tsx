"use client";

import { useState } from "react";
import { Plus, Search, Grid, List, Copy, Edit, Archive, Calendar } from "lucide-react";
import { Card, Badge, ProgressBar, PriorityBadge, StatusBadge, Avatar, Button } from "@/components/ui";
import { PROJECTS, getMember } from "@/lib/data";
import { useAppStore } from "@/store/useAppStore";
import type { Status } from "@/types";

const STATUS_FILTERS: { value: Status | "all"; label: string }[] = [
  { value: "all",         label: "All"         },
  { value: "in-progress", label: "In Progress" },
  { value: "review",      label: "Review"      },
  { value: "done",        label: "Done"        },
  { value: "backlog",     label: "Backlog"     },
];

export default function ProjectsPage() {
  const { addToast } = useAppStore();
  const [view,   setView]   = useState<"grid" | "list">("grid");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Status | "all">("all");

  const filtered = PROJECTS.filter((p) => {
    if (filter !== "all" && p.status !== filter) return false;
    if (search && !p.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="p-6 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Projects</h2>
          <p className="text-sm text-gray-500">{PROJECTS.length} total projects</p>
        </div>
        <Button icon={Plus} onClick={() => addToast("Project created!", "success")}>
          New Project
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-52">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects..."
            className="w-full pl-9 pr-3 py-2 text-sm bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
          />
        </div>

        <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
          {STATUS_FILTERS.map((s) => (
            <button
              key={s.value}
              onClick={() => setFilter(s.value)}
              className={`text-xs px-3 py-1.5 rounded-md font-medium transition-all ${filter === s.value ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm" : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"}`}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
          <button onClick={() => setView("grid")} className={`p-1.5 rounded-md transition-all ${view === "grid" ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm" : "text-gray-400"}`}><Grid size={15} /></button>
          <button onClick={() => setView("list")} className={`p-1.5 rounded-md transition-all ${view === "list" ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm" : "text-gray-400"}`}><List size={15} /></button>
        </div>
      </div>

      {/* Grid view */}
      {view === "grid" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((p) => (
            <Card key={p.id} className="p-5 group" hover>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: p.color }} />
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{p.title}</h3>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => addToast("Copied!", "success")} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-gray-400 hover:text-gray-600"><Copy size={13} /></button>
                  <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-gray-400 hover:text-gray-600"><Edit size={13} /></button>
                  <button onClick={() => addToast("Project archived", "success")} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-gray-400 hover:text-gray-600"><Archive size={13} /></button>
                </div>
              </div>
              <p className="text-xs text-gray-500 mb-3 line-clamp-2">{p.description}</p>
              <div className="flex flex-wrap gap-1 mb-3">
                {p.labels.map((l) => <Badge key={l}>{l}</Badge>)}
                <StatusBadge status={p.status} />
              </div>
              <div className="mb-3">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-gray-500">{p.completed}/{p.tasks} tasks</span>
                  <span className="font-medium text-gray-700 dark:text-gray-300">{p.progress}%</span>
                </div>
                <ProgressBar value={p.progress} color={p.color} />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex -space-x-1.5">
                  {p.members.slice(0, 4).map((mid) => {
                    const m = getMember(mid);
                    return m ? <Avatar key={mid} seed={m.avatar} size="xs" /> : null;
                  })}
                  {p.members.length > 4 && (
                    <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-[10px] text-gray-600 dark:text-gray-400 font-medium">
                      +{p.members.length - 4}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <Calendar size={11} />{p.dueDate}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* List view */}
      {view === "list" && (
        <Card>
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800">
                {["Project","Status","Priority","Progress","Team","Due Date",""].map((h) => (
                  <th key={h} className="text-left text-xs font-medium text-gray-500 px-4 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-b border-gray-50 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/30 group">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: p.color }} />
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{p.title}</p>
                        <p className="text-xs text-gray-500 truncate max-w-xs">{p.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3"><StatusBadge status={p.status} /></td>
                  <td className="px-4 py-3"><PriorityBadge priority={p.priority} /></td>
                  <td className="px-4 py-3 w-32">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-gray-500">{p.progress}%</span>
                    </div>
                    <ProgressBar value={p.progress} color={p.color} height={4} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex -space-x-1.5">
                      {p.members.slice(0, 3).map((mid) => {
                        const m = getMember(mid);
                        return m ? <Avatar key={mid} seed={m.avatar} size="xs" /> : null;
                      })}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-500">{p.dueDate}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-gray-400"><Edit size={13} /></button>
                      <button onClick={() => addToast("Project archived", "success")} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-gray-400"><Archive size={13} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  );
}
