// ── Save this as: app/kanban/loading.tsx ──────────────────────────
export default function KanbanLoading() {
  const cols = [1, 2, 3, 4, 5];
  return (
    <div className="p-6 animate-pulse">
      <div className="flex items-center justify-between mb-5">
        <div className="space-y-2">
          <div className="h-6 w-36 bg-gray-200 dark:bg-gray-800 rounded-lg" />
          <div className="h-3 w-48 bg-gray-100 dark:bg-gray-800 rounded" />
        </div>
        <div className="h-9 w-28 bg-gray-200 dark:bg-gray-800 rounded-lg" />
      </div>
      <div className="flex gap-4 overflow-hidden">
        {cols.map((c) => (
          <div key={c} className="flex-shrink-0 w-72 bg-gray-50 dark:bg-gray-800/50 rounded-xl p-3">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2.5 h-2.5 rounded-full bg-gray-300 dark:bg-gray-600" />
              <div className="h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-5 w-6 bg-gray-200 dark:bg-gray-700 rounded-full" />
            </div>
            <div className="space-y-2.5">
              {Array.from({ length: c % 2 === 0 ? 3 : 2 }).map((_, i) => (
                <div key={i} className="bg-white dark:bg-gray-900 rounded-xl p-3.5 border border-gray-200 dark:border-gray-700 space-y-2.5">
                  <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded" />
                  <div className="h-3 w-3/4 bg-gray-100 dark:bg-gray-800 rounded" />
                  <div className="flex gap-1">
                    <div className="h-5 w-14 bg-gray-100 dark:bg-gray-800 rounded-full" />
                    <div className="h-5 w-14 bg-gray-100 dark:bg-gray-800 rounded-full" />
                  </div>
                  <div className="h-1 w-full bg-gray-100 dark:bg-gray-800 rounded-full" />
                  <div className="flex items-center justify-between">
                    <div className="flex gap-3">
                      <div className="h-3 w-6 bg-gray-100 dark:bg-gray-800 rounded" />
                      <div className="h-3 w-6 bg-gray-100 dark:bg-gray-800 rounded" />
                    </div>
                    <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
