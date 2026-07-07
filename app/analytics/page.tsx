"use client";

import { Download, TrendingUp, Target, Clock, Star } from "lucide-react";
import {
  BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { Card, StatCard, StatusBadge, ProgressBar, Badge, Button } from "@/components/ui";
import { PROJECTS, CHART_DATA } from "@/lib/data";
import { useAppStore } from "@/store/useAppStore";

export default function AnalyticsPage() {
  const { addToast } = useAppStore();

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Analytics</h2>
          <p className="text-sm text-gray-500">Performance insights for your workspace</p>
        </div>
        <Button variant="secondary" icon={Download} onClick={() => addToast("Report exported!", "success")}>
          Export Report
        </Button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Velocity"         value="61"   sub="tasks/week"    change={18}  icon={TrendingUp} color="#6366f1" />
        <StatCard label="Completion Rate"  value="87%"  sub="this month"    change={5}   icon={Target}     color="#22c55e" />
        <StatCard label="Avg Cycle Time"   value="3.2d" sub="per task"      change={-12} icon={Clock}      color="#f59e0b" />
        <StatCard label="Team Satisfaction" value="4.8★" sub="team survey"  change={3}   icon={Star}       color="#ec4899" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="p-5">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Monthly Task Volume</h3>
          <p className="text-xs text-gray-500 mb-4">Tasks created and projects launched per month</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={CHART_DATA.monthly} barSize={20}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis                 tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 12 }} />
              <Bar dataKey="tasks"    fill="#6366f1" radius={[4,4,0,0]} name="Tasks" />
              <Bar dataKey="projects" fill="#22c55e" radius={[4,4,0,0]} name="Projects" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-5">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Team Velocity Trend</h3>
          <p className="text-xs text-gray-500 mb-4">Weekly sprint velocity vs goal</p>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={CHART_DATA.trend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="week" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis                tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 12 }} />
              <Line type="monotone" dataKey="velocity" stroke="#6366f1" strokeWidth={2.5} dot={{ fill: "#6366f1", r: 4 }} name="Velocity" />
              <Line type="monotone" dataKey="goal"     stroke="#e5e7eb" strokeWidth={2} strokeDasharray="5 5" dot={false} name="Goal" />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card className="p-5">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Project Health Overview</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800">
                {["Project","Status","Progress","Tasks","Deadline","Health"].map((h) => (
                  <th key={h} className="text-left text-xs font-medium text-gray-500 pb-3 pr-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PROJECTS.map((p) => {
                const health      = p.progress >= 80 ? "On Track" : p.progress >= 50 ? "At Risk" : "Behind";
                const healthColor = p.progress >= 80 ? "success"  : p.progress >= 50 ? "warning" : "danger";
                return (
                  <tr key={p.id} className="border-b border-gray-50 dark:border-gray-800/50">
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.color }} />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{p.title}</span>
                      </div>
                    </td>
                    <td className="py-3 pr-4"><StatusBadge status={p.status} /></td>
                    <td className="py-3 pr-4 w-32">
                      <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{p.progress}%</span>
                      <ProgressBar value={p.progress} color={p.color} height={4} className="mt-1" />
                    </td>
                    <td className="py-3 pr-4 text-xs text-gray-500">{p.completed}/{p.tasks}</td>
                    <td className="py-3 pr-4 text-xs text-gray-500">{p.dueDate}</td>
                    <td className="py-3"><Badge variant={healthColor as any}>{health}</Badge></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
