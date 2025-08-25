import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts';
import { PieChart as PieChartIcon } from 'lucide-react';
import { Job } from '@/types/index.ts';
import { STATUS_CONFIG } from '@/utils/constants.ts';

interface JobStatusChartProps {
  jobs: Job[];
}

interface ChartDataItem {
  name: string;
  value: number;
  color: string;
  percentage: number;
}

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: ChartDataItem;
  }>;
}

interface LegendProps {
  payload?: Array<{
    value: string;
    color: string;
  }>;
}

export default function JobStatusChart({ jobs }: JobStatusChartProps) {
  const chartData = Object.keys(STATUS_CONFIG)
    .map((status) => {
      const count = jobs.filter((job) => job.status === status).length;
      const config = STATUS_CONFIG[status as keyof typeof STATUS_CONFIG];

      return {
        name: config.label,
        value: count,
        color: getStatusColor(status),
        percentage:
          jobs.length > 0 ? Math.round((count / jobs.length) * 100) : 0,
      };
    })
    .filter((item) => item.value > 0);

  function getStatusColor(status: string): string {
    const colorMap: Record<string, string> = {
      applied: '#3B82F6', // Blue
      interviewing: '#F59E0B', // Amber
      offered: '#10B981', // Green
      rejected: '#EF4444', // Red
    };
    return colorMap[status] || '#6B7280';
  }

  const CustomTooltip = ({ active, payload }: TooltipProps) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600">
          <p className="text-gray-900 dark:text-white font-medium">
            {data.name}
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            {data.value} application{data.value !== 1 ? 's' : ''} (
            {data.percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }: LegendProps) => {
    return (
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {payload?.map((entry, index: number) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  };

  if (jobs.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Application Status Distribution
        </h3>
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
            <PieChartIcon className="w-8 h-8 text-gray-400 dark:text-gray-500" />
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-center">
            No applications yet.
            <br />
            Add your first application to see the chart.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Application Status Distribution
      </h3>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={120}
              paddingAngle={2}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Stats */}
      <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {chartData.map((item, index) => (
            <div key={index} className="text-center">
              <div
                className="w-3 h-3 rounded-full mx-auto mb-1"
                style={{ backgroundColor: item.color }}
              />
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {item.name}
              </p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
