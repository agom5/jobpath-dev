import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';

export default function AuthError() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('Authentication failed');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const message = urlParams.get('message');

    if (message) {
      setErrorMessage(decodeURIComponent(message));
    }

    const timer = setTimeout(() => {
      navigate('/login');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-red-100 dark:bg-red-900/20 p-3 rounded-full">
            <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Authentication Failed
        </h1>

        <p className="text-gray-600 dark:text-gray-300 mb-6">{errorMessage}</p>

        <button
          onClick={() => navigate('/login')}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-xl font-medium transition-colors duration-200"
        >
          Back to Login
        </button>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
          Redirecting automatically in 5 seconds...
        </p>
      </div>
    </div>
  );
}
