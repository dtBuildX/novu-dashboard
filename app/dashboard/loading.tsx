export default function DashboardLoading() {
  return (
    <div className="p-6 space-y-6 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-7 w-56 bg-gray-200 dark:bg-gray-800 rounded-lg" />
          <div className="h-4 w-72 bg-gray-100 dark:bg-gray-800/60 rounded-lg" />
        </div>
        <div className="h-9 w-28 bg-gray-200 dark:bg-gray-800 rounded-lg" />
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5">
            <div className="flex items-start justify-between mb-4">
              <div className="space-y-2">
                <div className="h-3 w-20 bg-gray-200 dark:bg-gray-800 rounded" />
                <div className="h-8 w-12 bg-gray-200 dark:bg-gray-800 rounded-lg" />
                <div className="h-3 w-24 bg-gray-100 dark:bg-gray-800 rounded" />
              </div>
              <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-xl" />
            </div>
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 bg-gray-200 dark:bg-gray-800 rounded-full" />
              <div className="h-3 w-20 bg-gray-100 dark:bg-gray-800 rounded" />
            </div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="space-y-1.5">
              <div className="h-4 w-36 bg-gray-200 dark:bg-gray-800 rounded" />
              <div className="h-3 w-48 bg-gray-100 dark:bg-gray-800 rounded" />
            </div>
            <div className="h-5 w-20 bg-gray-100 dark:bg-gray-800 rounded-full" />
          </div>
          <div className="h-44 bg-gradient-to-b from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-800/30 rounded-xl" />
        </div>
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5">
          <div className="h-4 w-28 bg-gray-200 dark:bg-gray-800 rounded mb-4" />
          <div className="w-32 h-32 rounded-full bg-gray-100 dark:bg-gray-800 mx-auto mb-4" />
          <div className="space-y-2.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-gray-200 dark:bg-gray-700" />
                  <div className="h-3 w-20 bg-gray-100 dark:bg-gray-800 rounded" />
                </div>
                <div className="h-3 w-8 bg-gray-100 dark:bg-gray-800 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Projects + activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between">
            <div className="h-4 w-32 bg-gray-200 dark:bg-gray-800 rounded" />
            <div className="h-3 w-16 bg-gray-100 dark:bg-gray-800 rounded" />
          </div>
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-3 h-3 rounded-full bg-gray-200 dark:bg-gray-700 mt-1" />
                <div className="flex-1 space-y-2">
                  <div className="flex justify-between">
                    <div className="h-4 w-40 bg-gray-200 dark:bg-gray-800 rounded" />
                    <div className="h-5 w-16 bg-gray-100 dark:bg-gray-800 rounded-full" />
                  </div>
                  <div className="h-3 w-3/4 bg-gray-100 dark:bg-gray-800 rounded" />
                  <div className="flex items-center gap-4">
                    <div className="flex-1 h-2 bg-gray-100 dark:bg-gray-800 rounded-full" />
                    <div className="flex -space-x-1">
                      {Array.from({ length: 3 }).map((_, j) => (
                        <div key={j} className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 border-2 border-white dark:border-gray-900" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5">
          <div className="h-4 w-28 bg-gray-200 dark:bg-gray-800 rounded mb-5" />
          <div className="space-y-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-800 flex-shrink-0" />
                <div className="flex-1 space-y-1.5">
                  <div className="h-3 w-full bg-gray-100 dark:bg-gray-800 rounded" />
                  <div className="h-3 w-4/5 bg-gray-100 dark:bg-gray-800 rounded" />
                  <div className="h-2.5 w-12 bg-gray-100 dark:bg-gray-800 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
