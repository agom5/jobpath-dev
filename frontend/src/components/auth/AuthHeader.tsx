import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme.ts';

export default function AuthHeader() {
  const { theme, setTheme } = useTheme();

  const themeOptions = [
    { value: 'light' as const, icon: Sun, label: 'Light' },
    { value: 'dark' as const, icon: Moon, label: 'Dark' },
    { value: 'system' as const, icon: Monitor, label: 'System' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/10 dark:bg-black/20 backdrop-blur-sm border-b border-white/20 dark:border-gray-700/50 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src="/jobpath-logo.png"
              alt="JobPath"
              className="h-8 w-auto object-contain"
            />
          </div>

          {/* Navigation & Theme Toggle */}
          <div className="flex items-center gap-4">
            <div className="flex items-center bg-white/10 dark:bg-gray-800/50 rounded-lg p-1">
              {themeOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <button
                    key={option.value}
                    onClick={() => setTheme(option.value)}
                    className={`p-2 rounded-md transition-all duration-200 ${
                      theme === option.value
                        ? 'bg-white/20 dark:bg-gray-700 text-white shadow-sm'
                        : 'text-white/60 dark:text-gray-400 hover:text-white dark:hover:text-gray-200 hover:bg-white/10 dark:hover:bg-gray-700/50'
                    }`}
                    title={`Switch to ${option.label} theme`}
                  >
                    <Icon className="w-4 h-4" />
                  </button>
                );
              })}
            </div>

            {/* Navigation Links */}
            <nav className="hidden sm:flex items-center gap-6">
              <a
                href="#"
                className="text-white/80 dark:text-gray-300 hover:text-white dark:hover:text-white transition-colors text-sm font-medium"
              >
                About
              </a>
              <a
                href="#"
                className="text-white/80 dark:text-gray-300 hover:text-white dark:hover:text-white transition-colors text-sm font-medium"
              >
                Help
              </a>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
