"use client";

import { useState } from "react";
import { Plus, MoreHorizontal, MessageSquare, Paperclip, Clock } from "lucide-react";
import { Avatar, Badge, PriorityBadge, ProgressBar, Button } from "@/components/ui";
import { STATUS_CONFIG } from "@/constants";
import { getMember, getProject } from "@/lib/data";
import { useAppStore } from "@/store/useAppStore";
import type { Status } from "@/types";

const COLUMNS: Status[] = ["backlog", "todo", "in-progress", "review", "done"];

export default function KanbanPage() {
  const { tasks, moveTask, addToast } = useAppStore();
  const [dragging, setDragging] = useState<string | null>(null);
  const [over,     setOver]     = useState<Status | null>(null);

  const handleDrop = (col: Status) => {
    if (dragging) {
      moveTask(dragging, col);
      addToast(`Task moved to ${STATUS_CONFIG[col].label}`, "success");
      setDragging(null);
      setOver(null);
    }
  };

  return (
    <div className="p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Kanban Board</h2>
          <p className="text-sm text-gray-500">Drag cards to update status</p>
        </div>
        <Button icon={Plus} onClick={() => addToast("Task created!", "success")}>
          Add Task
        </Button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 flex-1">
        {COLUMNS.map((col) => {
          const colTasks = tasks.filter((t) => t.status === col);
          const cfg      = STATUS_CONFIG[col];

          return (
            <div
              key={col}
              className={`flex-shrink-0 w-72 flex flex-col rounded-xl p-3 transition-all ${over === col ? "bg-indigo-50 dark:bg-indigo-900/20 ring-2 ring-indigo-300" : "bg-gray-50 dark:bg-gray-800/50"}`}
              onDragOver={(e) => { e.preventDefault(); setOver(col); }}
              onDragLeave={() => setOver(null)}
              onDrop={() => handleDrop(col)}
            >
              {/* Column header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cfg.color }} />
                  <h3 className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                    {cfg.label}
                  </h3>
                  <span className="text-xs font-medium bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full px-2 py-0.5 shadow-sm">
                    {colTasks.length}
                  </span>
                </div>
                <button
                  onClick={() => addToast("Task added!", "success")}
                  className="w-6 h-6 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>

              {/* Cards */}
              <div className="flex-1 space-y-2.5">
                {colTasks.map((task) => {
                  const m = getMember(task.assignee);
                  return (
                    <div
                      key={task.id}
                      draggable
                      onDragStart={() => setDragging(task.id)}
                      onDragEnd={() => { setDragging(null); setOver(null); }}
                      className={`bg-white dark:bg-gray-900 rounded-xl p-3.5 shadow-sm border cursor-grab active:cursor-grabbing group hover:shadow-md transition-all ${dragging === task.id ? "opacity-50 scale-95" : "border-gray-200 dark:border-gray-700 hover:border-indigo-200 dark:hover:border-indigo-700"}`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h4 className="text-xs font-semibold text-gray-900 dark:text-white leading-tight">
                          {task.title}
                        </h4>
                        <button className="opacity-0 group-hover:opacity-100 p-0.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-gray-400 flex-shrink-0 transition-opacity">
                          <MoreHorizontal size={13} />
                        </button>
                      </div>

                      {task.description && (
                        <p className="text-xs text-gray-500 mb-2.5 line-clamp-2">{task.description}</p>
                      )}

                      <div className="flex flex-wrap gap-1 mb-2.5">
                        <PriorityBadge priority={task.priority} />
                        {task.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag}>#{tag}</Badge>
                        ))}
                      </div>

                      {task.subtasks.length > 0 && (
                        <div className="mb-2.5">
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="text-gray-400">Subtasks</span>
                            <span className="text-gray-500">
                              {task.subtasks.filter((s) => s.done).length}/{task.subtasks.length}
                            </span>
                          </div>
                          <ProgressBar
                            value={Math.round(task.subtasks.filter((s) => s.done).length / task.subtasks.length * 100)}
                            color="#6366f1"
                            height={3}
                          />
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5 text-xs text-gray-400">
                          <span className="flex items-center gap-1"><MessageSquare size={11} />{task.comments}</span>
                          <span className="flex items-center gap-1"><Paperclip size={11} />{task.attachments}</span>
                          {task.dueDate && (
                            <span className="flex items-center gap-1"><Clock size={11} />{task.dueDate.slice(5)}</span>
                          )}
                        </div>
                        <Avatar seed={m?.avatar} size="xs" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
