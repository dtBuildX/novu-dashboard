"use client";

import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { Card, Avatar, Badge, ProgressBar, Button } from "@/components/ui";
import { TEAM_MEMBERS, PROJECTS } from "@/lib/data";

export default function TeamPage() {
  const [search, setSearch] = useState("");
  const filtered = TEAM_MEMBERS.filter(
    (m) => !search || m.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Team</h2>
          <p className="text-sm text-gray-500">{TEAM_MEMBERS.length} members</p>
        </div>
        <Button icon={Plus}>Invite Member</Button>
      </div>

      <div className="relative max-w-xs">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search team..."
          className="w-full pl-9 pr-3 py-2 text-sm bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((member) => {
          const memberProjects = PROJECTS.filter((p) => p.members.includes(member.id));
          return (
            <Card key={member.id} className="p-5" hover>
              <div className="flex items-start gap-4 mb-4">
                <Avatar seed={member.avatar} size="lg" online={member.status} />
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{member.name}</h3>
                  <p className="text-xs text-gray-500">{member.role}</p>
                  <p className="text-xs text-gray-400">{member.email}</p>
                  <div className="mt-1.5 flex items-center gap-2">
                    <Badge variant={member.status === "online" ? "success" : member.status === "away" ? "warning" : "default"}>
                      {member.status}
                    </Badge>
                    <Badge>{member.dept}</Badge>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-gray-500 font-medium">Workload</span>
                  <span className={`font-medium ${member.workload > 80 ? "text-red-600" : member.workload > 60 ? "text-amber-600" : "text-emerald-600"}`}>
                    {member.workload}%
                  </span>
                </div>
                <ProgressBar
                  value={member.workload}
                  color={member.workload > 80 ? "#ef4444" : member.workload > 60 ? "#f59e0b" : "#22c55e"}
                />
              </div>

              <div className="mt-3">
                <p className="text-xs text-gray-500 mb-1.5">Projects ({memberProjects.length})</p>
                <div className="flex flex-wrap gap-1">
                  {memberProjects.slice(0, 3).map((p) => (
                    <span key={p.id} className="flex items-center gap-1 text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-600 dark:text-gray-400">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: p.color }} />
                      {p.title.split(" ").slice(0, 2).join(" ")}
                    </span>
                  ))}
                  {memberProjects.length > 3 && (
                    <span className="text-xs text-gray-400">+{memberProjects.length - 3}</span>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
