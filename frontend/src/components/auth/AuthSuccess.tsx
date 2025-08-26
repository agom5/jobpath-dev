import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../ui/LoadingSpinner.tsx';
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

  return <LoadingSpinner message="Completing Google sign-in..." />;
}
