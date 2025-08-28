import { useState, useEffect } from 'react';
import { User, LoginCredentials } from '@/types/index.ts';
import { api, handleApiError, RegistrationData } from '@/utils/api.ts';
import { LOCAL_STORAGE_KEYS } from '@/utils/constants.ts';

interface UseAuthReturn {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  register: (data: RegistrationData) => Promise<boolean>;
  logout: () => Promise<void>;
  updateProfile: (updates: {
    name?: string;
    avatar?: string;
  }) => Promise<boolean>;
  deleteAccount: () => Promise<boolean>;
  clearError: () => void;
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(() => {
    const cached = localStorage.getItem(LOCAL_STORAGE_KEYS.USER_DATA);
    return cached ? JSON.parse(cached) : null;
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
        if (token) {
          const cachedUser = localStorage.getItem(LOCAL_STORAGE_KEYS.USER_DATA);
          if (cachedUser) {
            setLoading(false);
          }

          const userData = await api.getCurrentUser();
          setUser(userData);
        }
      } catch (err) {
        console.error('Auth initialization error:', err);
        localStorage.removeItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
        localStorage.removeItem(LOCAL_STORAGE_KEYS.USER_DATA);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.login(credentials);
      localStorage.setItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN, response.token);
      localStorage.setItem(
        LOCAL_STORAGE_KEYS.USER_DATA,
        JSON.stringify(response.user)
      );
      setUser(response.user);
      return true;
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: RegistrationData): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.register(data);
      localStorage.setItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN, response.token);
      localStorage.setItem(
        LOCAL_STORAGE_KEYS.USER_DATA,
        JSON.stringify(response.user)
      );
      setUser(response.user);
      return true;
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await api.logout();
    } catch (err) {
      console.error('Logout API error:', err);
    }

    setUser(null);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.USER_DATA);

    setTimeout(() => {
      window.location.replace('/login');
    }, 0);
  };
  const updateProfile = async (updates: {
    name?: string;
    avatar?: string;
  }): Promise<boolean> => {
    try {
      setError(null);
      const updatedUser = await api.updateProfile(updates);

      localStorage.setItem(
        LOCAL_STORAGE_KEYS.USER_DATA,
        JSON.stringify(updatedUser)
      );
      setUser(updatedUser);
      return true;
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
      return false;
    }
  };

  const clearError = () => {
    setError(null);
  };

  const deleteAccount = async (): Promise<boolean> => {
    try {
      setError(null);
      await api.deleteAccount();

      localStorage.removeItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
      localStorage.removeItem(LOCAL_STORAGE_KEYS.USER_DATA);
      setUser(null);

      return true;
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
      return false;
    }
  };

  return {
    user,
    loading,
    error,
    login,
    register,
    logout,
    updateProfile,
    deleteAccount,
    clearError,
  };
}
