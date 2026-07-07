"use client";

import { useState } from "react";
import { Plus, Search, Check, Clock, MessageSquare, Paperclip, Edit, Trash2, X } from "lucide-react";
import { Card, PriorityBadge, StatusBadge, Avatar, Button } from "@/components/ui";
import { TASKS, getMember, getProject } from "@/lib/data";
import { useAppStore } from "@/store/useAppStore";
import { Badge } from "@/components/ui";
import type { Priority, Task } from "@/types";

const PRIORITY_FILTERS: { value: Priority | "all"; label: string }[] = [
  { value: "all",    label: "All"    },
  { value: "urgent", label: "Urgent" },
  { value: "high",   label: "High"   },
  { value: "medium", label: "Medium" },
  { value: "low",    label: "Low"    },
];

export default function TasksPage() {
  const { addToast } = useAppStore();
  const [search,   setSearch]   = useState("");
  const [priority, setPriority] = useState<Priority | "all">("all");
  const [selected, setSelected] = useState<Task | null>(null);

  const filtered = TASKS.filter((t) => {
    if (priority !== "all" && t.priority !== priority) return false;
    if (search && !t.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Tasks</h2>
        <Button icon={Plus} onClick={() => addToast("Task created!", "success")}>New Task</Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-52">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tasks..."
            className="w-full pl-9 pr-3 py-2 text-sm bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
          />
        </div>
        <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
          {PRIORITY_FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setPriority(f.value)}
              className={`text-xs px-3 py-1.5 rounded-md font-medium transition-all ${priority === f.value ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm" : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"}`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Task list */}
        <div className="xl:col-span-2 space-y-2">
          {filtered.map((task) => {
            const m = getMember(task.assignee);
            const p = getProject(task.projectId);
            return (
              <Card
                key={task.id}
                className={`p-4 cursor-pointer transition-all ${selected?.id === task.id ? "ring-2 ring-indigo-500" : ""}`}
                hover
                onClick={() => setSelected(selected?.id === task.id ? null : task)}
              >
                <div className="flex items-start gap-3">
                  <button
                    onClick={(e) => { e.stopPropagation(); addToast("Task marked complete!", "success"); }}
                    className={`mt-0.5 w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center transition-all ${task.status === "done" ? "bg-emerald-500 border-emerald-500" : "border-gray-300 hover:border-indigo-400"}`}
                  >
                    {task.status === "done" && <Check size={10} className="text-white" />}
                  </button>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className={`text-sm font-medium ${task.status === "done" ? "line-through text-gray-400" : "text-gray-900 dark:text-white"}`}>
                        {task.title}
                      </h3>
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        <PriorityBadge priority={task.priority} />
                        <StatusBadge status={task.status} />
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5 truncate">{p?.title}</p>
                    <div className="mt-2 flex items-center gap-4 text-xs text-gray-400 flex-wrap">
                      <span className="flex items-center gap-1"><Clock size={11} />{task.dueDate}</span>
                      <span className="flex items-center gap-1"><MessageSquare size={11} />{task.comments}</span>
                      <span className="flex items-center gap-1"><Paperclip size={11} />{task.attachments}</span>
                      {task.tags.slice(0, 2).map((tag) => <Badge key={tag}>#{tag}</Badge>)}
                      <Avatar seed={m?.avatar} size="xs" className="ml-auto" />
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Detail panel */}
        {selected && (
          <Card className="p-5 h-fit sticky top-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Task Detail</h3>
              <button onClick={() => setSelected(null)} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-gray-400">
                <X size={14} />
              </button>
            </div>
            <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-2">{selected.title}</h2>
            <p className="text-xs text-gray-500 mb-4">{selected.description}</p>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Status</span>
                <StatusBadge status={selected.status} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Priority</span>
                <PriorityBadge priority={selected.priority} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Assignee</span>
                <div className="flex items-center gap-1.5">
                  <Avatar seed={getMember(selected.assignee)?.avatar} size="xs" />
                  <span className="text-gray-700 dark:text-gray-300">{getMember(selected.assignee)?.name}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Due Date</span>
                <span className="text-gray-700 dark:text-gray-300">{selected.dueDate}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Project</span>
                <span className="text-gray-700 dark:text-gray-300 truncate ml-8">
                  {getProject(selected.projectId)?.title}
                </span>
              </div>
            </div>

            {selected.subtasks.length > 0 && (
              <div className="mt-4">
                <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Subtasks ({selected.subtasks.filter((s) => s.done).length}/{selected.subtasks.length})
                </p>
                <div className="space-y-1.5">
                  {selected.subtasks.map((s, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs">
                      <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center flex-shrink-0 ${s.done ? "bg-emerald-500 border-emerald-500" : "border-gray-300"}`}>
                        {s.done && <Check size={9} className="text-white" />}
                      </div>
                      <span className={s.done ? "line-through text-gray-400" : "text-gray-700 dark:text-gray-300"}>
                        {s.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-4 flex gap-2">
              <Button variant="secondary" size="sm" className="flex-1" icon={Edit}>Edit</Button>
              <Button
                variant="danger"
                size="sm"
                icon={Trash2}
                onClick={() => { setSelected(null); addToast("Task deleted", "success"); }}
              >
                Delete
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
