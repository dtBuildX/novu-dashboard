// ── app/calendar/page.tsx ─────────────────────────────────────────
"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui";
import { TASKS } from "@/lib/data";
import { PRIORITY_CONFIG } from "@/constants";

const MONTH_NAMES = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAYS_OF_WEEK = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

export default function CalendarPage() {
  const [current, setCurrent] = useState(new Date(2026, 5, 1));
  const year  = current.getFullYear();
  const month = current.getMonth();

  const firstDay     = new Date(year, month, 1).getDay();
  const daysInMonth  = new Date(year, month + 1, 0).getDate();

  const getTasksForDay = (day: number) => {
    const date = `${year}-${String(month + 1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;
    return TASKS.filter((t) => t.dueDate === date);
  };

  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <div className="p-6 space-y-5">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">Calendar</h2>
      <Card className="p-5">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">
            {MONTH_NAMES[month]} {year}
          </h3>
          <div className="flex items-center gap-2">
            <button onClick={() => setCurrent(new Date(year, month - 1, 1))} className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-gray-500 transition-colors"><ChevronLeft size={16} /></button>
            <button onClick={() => setCurrent(new Date(2026, 5, 1))} className="text-xs font-medium px-3 py-1.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg">Today</button>
            <button onClick={() => setCurrent(new Date(year, month + 1, 1))} className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-gray-500 transition-colors"><ChevronRight size={16} /></button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-px bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
          {DAYS_OF_WEEK.map((d) => (
            <div key={d} className="bg-gray-50 dark:bg-gray-800 text-center text-xs font-medium text-gray-500 py-2">{d}</div>
          ))}
          {cells.map((day, i) => {
            const tasks   = day ? getTasksForDay(day) : [];
            const isToday = day === 27 && month === 5 && year === 2026;
            return (
              <div key={i} className={`bg-white dark:bg-gray-900 min-h-[80px] p-1.5 ${!day ? "bg-gray-50 dark:bg-gray-800/50" : "hover:bg-indigo-50/30 dark:hover:bg-indigo-900/10 cursor-pointer"}`}>
                {day && (
                  <>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium mb-1 ${isToday ? "bg-indigo-600 text-white" : "text-gray-700 dark:text-gray-300"}`}>
                      {day}
                    </div>
                    <div className="space-y-0.5">
                      {tasks.slice(0, 2).map((t) => (
                        <div key={t.id} className="text-[10px] px-1.5 py-0.5 rounded-md font-medium truncate" style={{ backgroundColor: PRIORITY_CONFIG[t.priority].bg, color: PRIORITY_CONFIG[t.priority].color }}>
                          {t.title}
                        </div>
                      ))}
                      {tasks.length > 2 && <div className="text-[10px] text-gray-400 font-medium">+{tasks.length - 2} more</div>}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
