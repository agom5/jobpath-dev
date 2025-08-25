import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LoginCredentials } from '@/types/index.ts';
import LoginForm from './LoginForm.tsx';
import RegisterForm from './RegisterForm.tsx';

interface RegistrationData {
  name: string;
  email: string;
  password: string;
}

interface AuthContainerProps {
  onLogin: (credentials: LoginCredentials) => Promise<boolean>;
  onRegister: (data: RegistrationData) => Promise<boolean>;
  loading: boolean;
  error: string | null;
}

export default function AuthContainer({
  onLogin,
  onRegister,
  loading,
  error,
}: AuthContainerProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const isLogin = location.pathname === '/login';
  const isRegister = location.pathname === '/register';

  const handleSwitchMode = (mode: 'login' | 'register') => {
    if ((mode === 'login' && isLogin) || (mode === 'register' && isRegister)) {
      return;
    }

    setIsTransitioning(true);

    setTimeout(() => {
      navigate(mode === 'login' ? '/login' : '/register');
      setIsTransitioning(false);
    }, 150);
  };

  return (
    <div
      className={`transition-opacity duration-150 ${isTransitioning ? 'opacity-50' : 'opacity-100'}`}
    >
      {isLogin && (
        <LoginForm
          onLogin={onLogin}
          loading={loading}
          error={error}
          onSwitchToRegister={() => handleSwitchMode('register')}
        />
      )}
      {isRegister && (
        <RegisterForm
          onRegister={onRegister}
          loading={loading}
          error={error}
          onSwitchToLogin={() => handleSwitchMode('login')}
        />
      )}
    </div>
  );
}
