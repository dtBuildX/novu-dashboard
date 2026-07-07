export default function TeamLoading() {
  return (
    <div className="p-6 space-y-5 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-6 w-16 bg-gray-200 dark:bg-gray-800 rounded-lg" />
          <div className="h-3 w-24 bg-gray-100 dark:bg-gray-800 rounded" />
        </div>
        <div className="h-9 w-32 bg-gray-200 dark:bg-gray-800 rounded-lg" />
      </div>

      <div className="h-9 w-64 bg-gray-100 dark:bg-gray-800 rounded-lg" />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-28 bg-gray-200 dark:bg-gray-800 rounded" />
                <div className="h-3 w-24 bg-gray-100 dark:bg-gray-800 rounded" />
                <div className="h-3 w-32 bg-gray-100 dark:bg-gray-800 rounded" />
                <div className="flex gap-1.5">
                  <div className="h-5 w-14 bg-gray-100 dark:bg-gray-800 rounded-full" />
                  <div className="h-5 w-20 bg-gray-100 dark:bg-gray-800 rounded-full" />
                </div>
              </div>
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between">
                <div className="h-3 w-16 bg-gray-100 dark:bg-gray-800 rounded" />
                <div className="h-3 w-8 bg-gray-100 dark:bg-gray-800 rounded" />
              </div>
              <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-800 rounded-full" />
            </div>
            <div className="space-y-1.5">
              <div className="h-3 w-20 bg-gray-100 dark:bg-gray-800 rounded" />
              <div className="flex flex-wrap gap-1">
                <div className="h-5 w-24 bg-gray-100 dark:bg-gray-800 rounded-full" />
                <div className="h-5 w-20 bg-gray-100 dark:bg-gray-800 rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
