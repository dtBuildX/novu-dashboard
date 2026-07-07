import Link from "next/link";
import { Home, Search, ArrowLeft } from "lucide-react";

export default function NotFound() {
  const QUICK_LINKS = [
    { label: "Dashboard",  href: "/dashboard"  },
    { label: "Projects",   href: "/projects"   },
    { label: "Tasks",      href: "/tasks"      },
    { label: "Team",       href: "/team"       },
    { label: "Analytics",  href: "/analytics"  },
    { label: "Settings",   href: "/settings"   },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-6">
      <div className="text-center max-w-lg">
        {/* Big 404 */}
        <div className="relative mb-8">
          <p className="text-[140px] font-black text-gray-100 dark:text-gray-800 leading-none select-none">
            404
          </p>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 bg-indigo-100 dark:bg-indigo-900/40 rounded-2xl flex items-center justify-center">
              <Search size={32} className="text-indigo-500" />
            </div>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          Page not found
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-8 leading-relaxed">
          The page you're looking for doesn't exist or has been moved.
          Here are some helpful links instead:
        </p>

        {/* Quick links */}
        <div className="grid grid-cols-3 gap-2 mb-8">
          {QUICK_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-200 dark:hover:border-indigo-800 transition-all font-medium"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center justify-center gap-3">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition-all"
          >
            <Home size={15} />
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
