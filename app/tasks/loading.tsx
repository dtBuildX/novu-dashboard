export default function TasksLoading() {
  return (
    <div className="p-6 space-y-5 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="h-6 w-16 bg-gray-200 dark:bg-gray-800 rounded-lg" />
        <div className="h-9 w-28 bg-gray-200 dark:bg-gray-800 rounded-lg" />
      </div>

      <div className="flex gap-3">
        <div className="flex-1 h-9 bg-gray-100 dark:bg-gray-800 rounded-lg" />
        <div className="h-9 w-72 bg-gray-100 dark:bg-gray-800 rounded-lg" />
      </div>

      <div className="space-y-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-4 h-4 rounded border border-gray-200 dark:border-gray-700 flex-shrink-0 mt-0.5" />
              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between gap-4">
                  <div className="h-4 w-52 bg-gray-200 dark:bg-gray-800 rounded" />
                  <div className="flex gap-1.5 flex-shrink-0">
                    <div className="h-5 w-16 bg-gray-100 dark:bg-gray-800 rounded-full" />
                    <div className="h-5 w-20 bg-gray-100 dark:bg-gray-800 rounded-full" />
                  </div>
                </div>
                <div className="h-3 w-32 bg-gray-100 dark:bg-gray-800 rounded" />
                <div className="flex items-center gap-4">
                  <div className="h-3 w-20 bg-gray-100 dark:bg-gray-800 rounded" />
                  <div className="h-3 w-6 bg-gray-100 dark:bg-gray-800 rounded" />
                  <div className="h-3 w-6 bg-gray-100 dark:bg-gray-800 rounded" />
                  <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 ml-auto" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
