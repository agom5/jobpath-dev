import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth.ts';
import { useTheme } from '@/hooks/useTheme.ts';

import AuthContainer from '@/components/auth/AuthContainer.tsx';
import AuthSuccess from '@/components/auth/AuthSuccess.tsx';
import AuthError from '@/components/auth/AuthError.tsx';
import MainApp from '@/components/MainApp.tsx';
import Skeleton from '@/components/ui/Skeleton.tsx';

export default function App() {
  useTheme();

  const {
    user,
    loading: authLoading,
    error: authError,
    login,
    register,
  } = useAuth();

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <img
            src="/logo-sign.png"
            alt="JobPath Logo"
            className="h-12 w-auto mx-auto mb-6"
          />
          <Skeleton className="w-48 h-4 mx-auto mb-2" />
          <Skeleton className="w-32 h-3 mx-auto" />
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Auth routes */}
        <Route
          path="/login"
          element={
            user ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <AuthContainer
                onLogin={login}
                onRegister={register}
                loading={authLoading}
                error={authError}
              />
            )
          }
        />
        <Route
          path="/register"
          element={
            user ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <AuthContainer
                onLogin={login}
                onRegister={register}
                loading={authLoading}
                error={authError}
              />
            )
          }
        />
        <Route path="/auth/success" element={<AuthSuccess />} />
        <Route path="/auth/error" element={<AuthError />} />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={user ? <MainApp /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/applications"
          element={user ? <MainApp /> : <Navigate to="/login" replace />}
        />

        {/* Default route */}
        <Route
          path="/"
          element={
            user ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Catch all route */}
        <Route
          path="*"
          element={
            user ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}
