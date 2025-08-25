import { LucideIcon } from 'lucide-react';
import MiniChart from './MiniChart.tsx';

interface StatCardProps {
  label: string;
  value: number;
  icon: LucideIcon;
  color: string;
  trend?: 'up' | 'down' | 'stable';
  chartType?: 'area' | 'bar' | 'line';
  historicalData?: number[];
}

export default function StatCard({
  label,
  value,
  icon: Icon,
  color,
  trend = 'stable',
  chartType = 'area',
  historicalData = [],
}: StatCardProps) {
  const getColorClasses = (colorName: string) => {
    const colorMap: Record<string, string> = {
      blue: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
      yellow:
        'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400',
      green:
        'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400',
      red: 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400',
    };
    return (
      colorMap[colorName] ||
      'bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
    );
  };

  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return 'text-green-500';
      case 'down':
        return 'text-red-500';
      default:
        return 'text-gray-500 dark:text-gray-400';
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return '↗';
      case 'down':
        return '↘';
      default:
        return '→';
    }
  };

  const chartData =
    historicalData.length > 0
      ? historicalData
      : Array.from({ length: 7 }, () =>
          Math.max(0, value + Math.random() * 4 - 2)
        );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md dark:hover:shadow-lg transition-all duration-200 group">
      <div className="flex items-start justify-between mb-3 sm:mb-4">
        <div className="flex-1 min-w-0">
          <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm font-medium mb-1 truncate">
            {label}
          </p>
          <div className="flex items-baseline gap-1 sm:gap-2">
            <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              {value}
            </p>
            <span className={`text-xs ${getTrendColor()} flex items-center`}>
              {getTrendIcon()}
            </span>
          </div>
        </div>
        <div
          className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center ${getColorClasses(color)} transition-transform group-hover:scale-110 flex-shrink-0`}
        >
          <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
      </div>

      {/* Mini Chart */}
      <div className="flex items-end justify-between">
        <div className="text-xs text-gray-500 dark:text-gray-400">
          <span className="hidden sm:inline">Last 7 days</span>
          <span className="sm:hidden">7d</span>
        </div>
        <div className="opacity-70 group-hover:opacity-100 transition-opacity">
          <MiniChart data={chartData} color={color} type={chartType} />
        </div>
      </div>
    </div>
  );
}
