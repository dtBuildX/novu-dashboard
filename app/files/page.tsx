"use client";

import { Upload, Download, Trash2, Filter } from "lucide-react";
import { Card, Avatar, Button } from "@/components/ui";
import { FILES, getMember } from "@/lib/data";
import { useAppStore } from "@/store/useAppStore";

const TYPE_COLORS: Record<string, string> = {
  figma: "#6366f1", pdf: "#ef4444", excel: "#22c55e",
  zip: "#f59e0b", image: "#3b82f6", word: "#3b82f6",
};

const TYPE_LABELS: Record<string, string> = {
  figma: "✦", pdf: "PDF", excel: "XLS", zip: "ZIP", image: "IMG", word: "DOC",
};

export default function FilesPage() {
  const { addToast } = useAppStore();

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Files</h2>
        <Button icon={Upload} onClick={() => addToast("Upload started!", "success")}>
          Upload File
        </Button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          ["Total Files",  "47"],
          ["Total Size",   "512 MB"],
          ["Shared",       "23"],
          ["Recent (7d)",  "8"],
        ].map(([label, value]) => (
          <Card key={label} className="p-4">
            <p className="text-xs text-gray-500 mb-1">{label}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
          </Card>
        ))}
      </div>

      <Card>
        <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">All Files</h3>
          <Button variant="secondary" size="sm" icon={Filter}>Filter</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800">
                {["Name","Type","Size","Modified","Uploaded by",""].map((h) => (
                  <th key={h} className="text-left text-xs font-medium text-gray-500 px-4 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {FILES.map((f, i) => {
                const m     = getMember(f.user);
                const color = TYPE_COLORS[f.type] || "#6b7280";
                return (
                  <tr key={i} className="border-b border-gray-50 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/30 group">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0" style={{ backgroundColor: color }}>
                          {TYPE_LABELS[f.type]}
                        </div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{f.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ color, backgroundColor: color + "20" }}>
                        {f.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-500">{f.size}</td>
                    <td className="px-4 py-3 text-xs text-gray-500">{f.modified}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Avatar seed={m?.avatar} size="xs" />
                        <span className="text-xs text-gray-600 dark:text-gray-400">{m?.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => addToast(`${f.name} downloaded!`, "success")} className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-gray-400 hover:text-gray-600"><Download size={13} /></button>
                        <button className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-gray-400 hover:text-red-600"><Trash2 size={13} /></button>
                      </div>
                    </td>
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
