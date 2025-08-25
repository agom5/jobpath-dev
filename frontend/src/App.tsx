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
import LoadingSpinner from '@/components/ui/LoadingSpinner.tsx';

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
    return <LoadingSpinner message="Loading JobPath..." />;
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
