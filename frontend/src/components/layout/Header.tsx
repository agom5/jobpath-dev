import { User, LogOut, Settings, Menu, Plus } from 'lucide-react';
import { User as UserType } from '@/types/index.ts';
import { getAvatarUrl, hasAvatar } from '@/utils/avatar.ts';

interface HeaderProps {
  user: UserType;
  onLogout: () => void;
  onOpenSettings: () => void;
  onAddNew: () => void;
  onToggleSidebar?: () => void;
  showMenuButton?: boolean;
}

export default function Header({
  user,
  onLogout,
  onOpenSettings,
  onAddNew,
  onToggleSidebar,
  showMenuButton = false,
}: HeaderProps) {
  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-white/20 dark:border-gray-700/50 sticky top-0 z-40 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex justify-between items-center w-full lg:hidden">
            {showMenuButton && onToggleSidebar && (
              <button
                onClick={onToggleSidebar}
                className="p-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                title="Open menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            )}

            <div className="flex items-center justify-center">
              <img
                src="/jobpath-logo.png"
                alt="JobPath Logo"
                className="h-10 w-auto object-contain"
              />
            </div>

            <button
              onClick={onAddNew}
              className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
              title="Add Job Application"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          {/* Large Screen Layout */}
          <div className="hidden lg:flex justify-end w-full">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                <button
                  onClick={onOpenSettings}
                  className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center overflow-hidden hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors cursor-pointer"
                  title="Open Profile Settings"
                >
                  {hasAvatar(user.avatar) ? (
                    <img
                      src={getAvatarUrl(user.avatar)!}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-4 h-4" />
                  )}
                </button>
              </div>

              <button
                onClick={onOpenSettings}
                className="p-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                title="Settings"
              >
                <Settings className="w-5 h-5" />
              </button>

              <button
                onClick={onLogout}
                className="p-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
