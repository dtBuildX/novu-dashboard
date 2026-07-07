"use client";

import { Card, Avatar, Badge, ProgressBar } from "@/components/ui";
import { TEAM_MEMBERS, TASKS, PROJECTS } from "@/lib/data";

export default function ProfilePage() {
  const user         = TEAM_MEMBERS[0];
  const userTasks    = TASKS.filter((t) => t.assignee === "u1");
  const userProjects = PROJECTS.filter((p) => p.members.includes("u1"));

  const ACHIEVEMENTS = [
    { emoji: "🚀", title: "First Deploy",   desc: "Deployed to production"    },
    { emoji: "⚡", title: "Speed Demon",    desc: "10 tasks in one day"       },
    { emoji: "🎯", title: "On Target",      desc: "100% sprint completion"    },
    { emoji: "💎", title: "Quality First",  desc: "Zero bugs reported"        },
    { emoji: "🔥", title: "Hot Streak",     desc: "30-day login streak"       },
    { emoji: "🤝", title: "Team Player",    desc: "Helped 5 colleagues"       },
  ];

  return (
    <div className="p-6 space-y-5 max-w-4xl">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">My Profile</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Profile card */}
        <Card className="p-6 text-center">
          <Avatar seed={user.avatar} size="xl" online={user.status} className="mx-auto mb-4" />
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">{user.name}</h3>
          <p className="text-sm text-gray-500">{user.role}</p>
          <p className="text-xs text-gray-400">{user.email}</p>
          <div className="flex items-center justify-center gap-2 mt-3">
            <Badge variant="success">{user.status}</Badge>
            <Badge variant="brand">{user.dept}</Badge>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 grid grid-cols-3 gap-2 text-center">
            <div>
              <p className="text-xl font-bold text-gray-900 dark:text-white">{userTasks.length}</p>
              <p className="text-xs text-gray-500">Tasks</p>
            </div>
            <div>
              <p className="text-xl font-bold text-gray-900 dark:text-white">{userProjects.length}</p>
              <p className="text-xs text-gray-500">Projects</p>
            </div>
            <div>
              <p className="text-xl font-bold text-gray-900 dark:text-white">4.8</p>
              <p className="text-xs text-gray-500">Rating</p>
            </div>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          {/* Projects */}
          <Card className="p-5">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">My Projects</h3>
            <div className="space-y-3">
              {userProjects.map((p) => (
                <div key={p.id} className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: p.color }} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-900 dark:text-white truncate">{p.title}</span>
                      <span className="text-xs text-gray-400 ml-2 flex-shrink-0">{p.progress}%</span>
                    </div>
                    <ProgressBar value={p.progress} color={p.color} height={4} />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Achievements */}
          <Card className="p-5">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Achievements</h3>
            <div className="grid grid-cols-3 gap-3">
              {ACHIEVEMENTS.map(({ emoji, title, desc }) => (
                <div key={title} className="text-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                  <div className="text-2xl mb-1.5">{emoji}</div>
                  <p className="text-xs font-medium text-gray-700 dark:text-gray-300">{title}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{desc}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
