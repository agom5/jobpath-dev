import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LOCAL_STORAGE_KEYS } from '@/utils/constants.ts';

export default function AuthSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const user = urlParams.get('user');

    if (token) {
      localStorage.setItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN, token);

      if (user) {
        try {
          const userData = JSON.parse(decodeURIComponent(user));
          localStorage.setItem(
            LOCAL_STORAGE_KEYS.USER_DATA,
            JSON.stringify(userData)
          );
        } catch (err) {
          console.error('Error parsing user data:', err);
        }
      }

      window.history.replaceState({}, document.title, '/auth/success');
      setTimeout(() => {
        window.location.replace('/dashboard');
      }, 1500);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
      <div className="text-center">
        <img
          src="/logo-sign.png"
          alt="JobPath Logo"
          className="h-10 w-auto object-contain mx-auto mb-6"
        />
        <div className="flex flex-col items-center space-y-3">
          <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent"></div>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Signing you in...
          </p>
        </div>
      </div>
    </div>
  );
}
