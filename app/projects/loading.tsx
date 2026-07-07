export default function ProjectsLoading() {
  return (
    <div className="p-6 space-y-5 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-6 w-24 bg-gray-200 dark:bg-gray-800 rounded-lg" />
          <div className="h-3 w-36 bg-gray-100 dark:bg-gray-800 rounded" />
        </div>
        <div className="h-9 w-32 bg-gray-200 dark:bg-gray-800 rounded-lg" />
      </div>

      {/* Filter bar */}
      <div className="flex gap-3">
        <div className="flex-1 h-9 bg-gray-100 dark:bg-gray-800 rounded-lg" />
        <div className="h-9 w-64 bg-gray-100 dark:bg-gray-800 rounded-lg" />
        <div className="h-9 w-20 bg-gray-100 dark:bg-gray-800 rounded-lg" />
      </div>

      {/* Project cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-4 h-4 rounded-full bg-gray-200 dark:bg-gray-700" />
                <div className="h-4 w-36 bg-gray-200 dark:bg-gray-800 rounded" />
              </div>
            </div>
            <div className="h-3 w-full bg-gray-100 dark:bg-gray-800 rounded" />
            <div className="h-3 w-3/4 bg-gray-100 dark:bg-gray-800 rounded" />
            <div className="flex gap-1.5">
              <div className="h-5 w-16 bg-gray-100 dark:bg-gray-800 rounded-full" />
              <div className="h-5 w-16 bg-gray-100 dark:bg-gray-800 rounded-full" />
              <div className="h-5 w-20 bg-gray-100 dark:bg-gray-800 rounded-full" />
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between">
                <div className="h-3 w-20 bg-gray-100 dark:bg-gray-800 rounded" />
                <div className="h-3 w-10 bg-gray-100 dark:bg-gray-800 rounded" />
              </div>
              <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-800 rounded-full" />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex -space-x-1.5">
                {Array.from({ length: 3 }).map((_, j) => (
                  <div key={j} className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 border-2 border-white dark:border-gray-900" />
                ))}
              </div>
              <div className="h-3 w-24 bg-gray-100 dark:bg-gray-800 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
