"use client";

import Link from "next/link";
import {
  CheckSquare, AlertCircle, FolderKanban, Target,
  Clock, MessageSquare, Paperclip,
} from "lucide-react";
import {
  AreaChart, Area, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import {
  Card, StatCard, Badge, ProgressBar, PriorityBadge, Avatar, Button,
} from "@/components/ui";
import { PROJECTS, TASKS, ACTIVITIES, CHART_DATA, getMember, getProject } from "@/lib/data";
import { useAppStore } from "@/store/useAppStore";
import { Plus } from "lucide-react";

export default function DashboardPage() {
  const { addToast } = useAppStore();
  const activeTasks    = TASKS.filter((t) => t.status !== "done");
  const completedTasks = TASKS.filter((t) => t.status === "done");
  const overdueTasks   = TASKS.filter((t) => t.status !== "done" && new Date(t.dueDate) < new Date());

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Good morning, Alex 👋</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            Here's what's happening across your workspace today.
          </p>
        </div>
        <Button icon={Plus} onClick={() => addToast("Task created!", "success")}>
          New Task
        </Button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Active Tasks"  value={activeTasks.length}    change={12}  icon={CheckSquare}  color="#6366f1" sub="across all projects" />
        <StatCard label="Completed"     value={completedTasks.length} change={8}   icon={Target}       color="#22c55e" sub="this sprint" />
        <StatCard label="Overdue"       value={overdueTasks.length}   change={-15} icon={AlertCircle}  color="#ef4444" sub="need attention" />
        <StatCard label="Projects"      value={PROJECTS.length}       change={3}   icon={FolderKanban} color="#8b5cf6" sub="total active" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Area chart */}
        <Card className="p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Weekly Productivity</h3>
              <p className="text-xs text-gray-500">Tasks created vs completed</p>
            </div>
            <Badge variant="brand">This week</Badge>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={CHART_DATA.productivity}>
              <defs>
                <linearGradient id="gTasks" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#6366f1" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gDone" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#22c55e" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day"       tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis                     tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 12 }} />
              <Area type="monotone" dataKey="tasks"     stroke="#6366f1" fill="url(#gTasks)" strokeWidth={2} name="Created" />
              <Area type="monotone" dataKey="completed" stroke="#22c55e" fill="url(#gDone)"  strokeWidth={2} name="Completed" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Pie chart */}
        <Card className="p-5">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Team Workload</h3>
          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Pie data={CHART_DATA.workload} cx="50%" cy="50%" innerRadius={40} outerRadius={65} paddingAngle={3} dataKey="value">
                {CHART_DATA.workload.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {CHART_DATA.workload.map((w, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: w.color }} />
                  <span className="text-gray-600 dark:text-gray-400">{w.name}</span>
                </div>
                <span className="font-medium text-gray-700 dark:text-gray-300">{w.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Projects + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Active projects */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Active Projects</h3>
            <Link href="/projects" className="text-xs text-indigo-600 hover:text-indigo-700 font-medium">View all →</Link>
          </div>
          {PROJECTS.filter((p) => p.status !== "done").slice(0, 4).map((p) => (
            <Link key={p.id} href="/projects">
              <Card className="p-4 mt-3" hover>
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 rounded-full flex-shrink-0 mt-1" style={{ backgroundColor: p.color }} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">{p.title}</h4>
                      <PriorityBadge priority={p.priority} />
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5 truncate">{p.description}</p>
                    <div className="mt-2.5 flex items-center gap-4">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-gray-400">{p.completed}/{p.tasks} tasks</span>
                          <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{p.progress}%</span>
                        </div>
                        <ProgressBar value={p.progress} color={p.color} />
                      </div>
                      <div className="flex -space-x-1.5">
                        {p.members.slice(0, 3).map((mid) => {
                          const m = getMember(mid);
                          return m ? <Avatar key={mid} seed={m.avatar} size="xs" /> : null;
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* Activity feed */}
        <Card className="p-5">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {ACTIVITIES.slice(0, 6).map((a) => {
              const m = getMember(a.user);
              return (
                <div key={a.id} className="flex gap-3">
                  <Avatar seed={m?.avatar} size="sm" className="flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-700 dark:text-gray-300">
                      <span className="font-medium">{m?.name}</span>{" "}
                      <span className="text-gray-500">{a.action}</span>{" "}
                      <span className="font-medium text-indigo-600 dark:text-indigo-400">{a.target}</span>
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">{a.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <Link href="/activity" className="mt-4 block text-xs text-indigo-600 hover:text-indigo-700 font-medium">
            View all activity →
          </Link>
        </Card>
      </div>

      {/* Upcoming deadlines */}
      <Card className="p-5">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Upcoming Deadlines</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {TASKS.filter((t) => t.status !== "done").slice(0, 4).map((task) => {
            const m = getMember(task.assignee);
            const p = getProject(task.projectId);
            return (
              <div key={task.id} className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <div className="flex items-start justify-between gap-1 mb-2">
                  <h4 className="text-xs font-medium text-gray-900 dark:text-white leading-tight">{task.title}</h4>
                  <PriorityBadge priority={task.priority} />
                </div>
                <p className="text-xs text-gray-500 mb-2 truncate">{p?.title}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <Clock size={11} />{task.dueDate}
                  </div>
                  <Avatar seed={m?.avatar} size="xs" />
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
