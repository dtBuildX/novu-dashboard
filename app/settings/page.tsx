"use client";

import { useState } from "react";
import { User, Bell, Sun, Shield, CreditCard, Users, Settings } from "lucide-react";
import { Card, Avatar, Button } from "@/components/ui";
import { useAppStore } from "@/store/useAppStore";

const TABS = [
  { id: "profile",       label: "Profile",          icon: User       },
  { id: "notifications", label: "Notifications",    icon: Bell       },
  { id: "appearance",    label: "Appearance",       icon: Sun        },
  { id: "security",      label: "Security",         icon: Shield     },
  { id: "billing",       label: "Billing",          icon: CreditCard },
  { id: "permissions",   label: "Team Permissions", icon: Users      },
];

export default function SettingsPage() {
  const { dark, setDark, addToast } = useAppStore();
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="p-6 max-w-5xl">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Settings</h2>

      <div className="flex gap-6">
        {/* Sidebar tabs */}
        <nav className="w-52 flex-shrink-0 space-y-0.5">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === t.id ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400" : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"}`}
            >
              <t.icon size={16} />
              {t.label}
            </button>
          ))}
        </nav>

        {/* Content */}
        <div className="flex-1">
          {activeTab === "profile" && (
            <Card className="p-6 space-y-6">
              <h3 className="text-base font-semibold text-gray-900 dark:text-white">Profile Settings</h3>
              <div className="flex items-center gap-5">
                <Avatar seed="AR" size="xl" />
                <div>
                  <Button variant="secondary" size="sm">Change photo</Button>
                  <p className="text-xs text-gray-400 mt-1.5">JPG, GIF or PNG. Max size 2MB.</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[["First Name","Alex"],["Last Name","Rivera"],["Email","alex@novu.io"],["Role","Product Manager"]].map(([label, val]) => (
                  <div key={label}>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">{label}</label>
                    <input
                      defaultValue={val}
                      className="w-full px-3 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
                    />
                  </div>
                ))}
              </div>
              <Button onClick={() => addToast("Profile saved!", "success")}>Save Changes</Button>
            </Card>
          )}

          {activeTab === "appearance" && (
            <Card className="p-6 space-y-5">
              <h3 className="text-base font-semibold text-gray-900 dark:text-white">Appearance</h3>
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Theme</p>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Light",  active: !dark, action: () => setDark(false) },
                    { label: "Dark",   active: dark,  action: () => setDark(true)  },
                    { label: "System", active: false, action: () => {}             },
                  ].map((opt) => (
                    <button
                      key={opt.label}
                      onClick={opt.action}
                      className={`p-3 rounded-xl border text-xs font-medium transition-all ${opt.active ? "border-indigo-500 text-indigo-600" : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300"}`}
                    >
                      <div className={`w-full h-12 rounded-lg mb-2 ${opt.label === "Light" ? "bg-white border border-gray-200" : opt.label === "Dark" ? "bg-gray-950" : "bg-gradient-to-br from-white to-gray-950"}`} />
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </Card>
          )}

          {activeTab === "security" && (
            <Card className="p-6 space-y-4">
              <h3 className="text-base font-semibold text-gray-900 dark:text-white">Security</h3>
              {[
                ["Change Password",            "Update your account password"],
                ["Two-Factor Authentication",  "Add an extra layer of security"],
                ["Active Sessions",            "Manage devices with account access"],
                ["API Keys",                   "Manage API keys for integrations"],
              ].map(([title, desc]) => (
                <div key={title} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{title}</p>
                    <p className="text-xs text-gray-500">{desc}</p>
                  </div>
                  <Button variant="secondary" size="sm" onClick={() => addToast("Opening settings…", "info")}>
                    Manage
                  </Button>
                </div>
              ))}
            </Card>
          )}

          {(activeTab === "notifications" || activeTab === "billing" || activeTab === "permissions") && (
            <Card className="p-6">
              <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">
                {TABS.find((t) => t.id === activeTab)?.label}
              </h3>
              <div className="py-12 text-center">
                <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Settings size={20} className="text-indigo-600" />
                </div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Ready to configure</p>
                <p className="text-xs text-gray-500 mt-1">These settings can be customised for your workspace.</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
