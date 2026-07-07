export default function AnalyticsLoading() {
  return (
    <div className="p-6 space-y-5 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-6 w-24 bg-gray-200 dark:bg-gray-800 rounded-lg" />
          <div className="h-3 w-56 bg-gray-100 dark:bg-gray-800 rounded" />
        </div>
        <div className="h-9 w-36 bg-gray-200 dark:bg-gray-800 rounded-lg" />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5">
            <div className="flex items-start justify-between mb-4">
              <div className="space-y-2">
                <div className="h-3 w-20 bg-gray-200 dark:bg-gray-800 rounded" />
                <div className="h-8 w-16 bg-gray-200 dark:bg-gray-800 rounded-lg" />
                <div className="h-3 w-24 bg-gray-100 dark:bg-gray-800 rounded" />
              </div>
              <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-xl" />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5">
            <div className="h-4 w-40 bg-gray-200 dark:bg-gray-800 rounded mb-1" />
            <div className="h-3 w-56 bg-gray-100 dark:bg-gray-800 rounded mb-4" />
            <div className="h-52 bg-gray-50 dark:bg-gray-800/50 rounded-xl" />
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5">
        <div className="h-4 w-48 bg-gray-200 dark:bg-gray-800 rounded mb-4" />
        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 py-2 border-b border-gray-50 dark:border-gray-800">
              <div className="flex items-center gap-2 flex-1">
                <div className="w-2.5 h-2.5 rounded-full bg-gray-200 dark:bg-gray-700" />
                <div className="h-4 w-48 bg-gray-200 dark:bg-gray-800 rounded" />
              </div>
              <div className="h-5 w-20 bg-gray-100 dark:bg-gray-800 rounded-full" />
              <div className="w-24 h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full" />
              <div className="h-3 w-10 bg-gray-100 dark:bg-gray-800 rounded" />
              <div className="h-3 w-20 bg-gray-100 dark:bg-gray-800 rounded" />
              <div className="h-5 w-16 bg-gray-100 dark:bg-gray-800 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
