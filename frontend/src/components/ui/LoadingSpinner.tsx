interface LoadingSpinnerProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function LoadingSpinner({
  message = 'Loading...',
  size = 'md',
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center transition-colors duration-300">
      <div className="text-center">
        <div className="flex justify-center mb-7">
          <img
            src="/logo-sign.png"
            alt="JobPath Logo"
            className="h-10 w-auto object-contain"
          />
        </div>
        <div
          className={`animate-spin rounded-full ${sizeClasses[size]} border-b-2 border-blue-600 dark:border-blue-400 mx-auto mb-4`}
        ></div>
        <p className="text-gray-600 dark:text-gray-300 font-medium">
          {message}
        </p>
      </div>
    </div>
  );
}
