import { useState, ReactNode } from 'react';
import { User } from '@/types/index.ts';
import Header from './Header.tsx';
import Sidebar from './Sidebar.tsx';

interface MainLayoutProps {
  user: User;
  children: ReactNode;
  activeView: string;
  onViewChange: (view: string) => void;
  onAddNew: () => void;
  onOpenSettings: () => void;
  onLogout: () => void;
}

export default function MainLayout({
  user,
  children,
  activeView,
  onViewChange,
  onAddNew,
  onOpenSettings,
  onLogout,
}: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Sidebar */}
      <Sidebar
        user={user}
        isOpen={sidebarOpen}
        onClose={handleCloseSidebar}
        activeView={activeView}
        onViewChange={onViewChange}
        onAddNew={onAddNew}
        onOpenSettings={onOpenSettings}
        onLogout={onLogout}
      />

      {/* Main content area */}
      <div className="lg:ml-72">
        {/* Header */}
        <Header
          user={user}
          onLogout={onLogout}
          onOpenSettings={onOpenSettings}
          onAddNew={onAddNew}
          onToggleSidebar={handleToggleSidebar}
          showMenuButton={true}
        />

        {/* Content */}
        <main className="px-4 sm:px-6 lg:px-8 py-8">{children}</main>
      </div>
    </div>
  );
}
