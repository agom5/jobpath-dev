import { BarChart3 } from 'lucide-react';
import { Job, JobStats } from '@/types/index.ts';
import { STATUS_CONFIG } from '@/utils/constants.ts';
import PageHeader from '../layout/PageHeader.tsx';
import JobStatusChart from './JobStatusChart.tsx';
import StatCard from './StatCard.tsx';
import { DashboardSkeleton } from '../ui/Skeleton.tsx';

interface DashboardProps {
  jobs: Job[];
  loading?: boolean;
}

export default function Dashboard({ jobs, loading = false }: DashboardProps) {
  if (loading) {
    return <DashboardSkeleton />;
  }

  const stats: JobStats = {
    total: jobs.length,
    applied: jobs.filter((j) => j.status === 'applied').length,
    interviewing: jobs.filter((j) => j.status === 'interviewing').length,
    offered: jobs.filter((j) => j.status === 'offered').length,
    rejected: jobs.filter((j) => j.status === 'rejected').length,
  };

  const statCards = [
    {
      key: 'total',
      label: 'Total Applications',
      value: stats.total,
      icon: BarChart3,
      color: 'blue',
      chartType: 'area' as const,
      trend: 'up' as const,
    },
    {
      key: 'applied' as const,
      label: 'Applied',
      value: stats.applied,
      icon: STATUS_CONFIG.applied.icon,
      color: STATUS_CONFIG.applied.color,
      chartType: 'bar' as const,
      trend: 'stable' as const,
    },
    {
      key: 'interviewing' as const,
      label: 'Interviewing',
      value: stats.interviewing,
      icon: STATUS_CONFIG.interviewing.icon,
      color: STATUS_CONFIG.interviewing.color,
      chartType: 'line' as const,
      trend: 'up' as const,
    },
    {
      key: 'offered' as const,
      label: 'Offered',
      value: stats.offered,
      icon: STATUS_CONFIG.offered.icon,
      color: STATUS_CONFIG.offered.color,
      chartType: 'area' as const,
      trend: 'up' as const,
    },
    {
      key: 'rejected' as const,
      label: 'Rejected',
      value: stats.rejected,
      icon: STATUS_CONFIG.rejected.icon,
      color: STATUS_CONFIG.rejected.color,
      chartType: 'bar' as const,
      trend: 'down' as const,
    },
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Dashboard"
        description="Track your job application progress and get insights"
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
        {statCards.map((card) => (
          <StatCard
            key={card.key}
            label={card.label}
            value={card.value}
            icon={card.icon}
            color={card.color}
            chartType={card.chartType}
            trend={card.trend}
          />
        ))}
      </div>

      {/* Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <JobStatusChart jobs={jobs} />

        {/* Placeholder for future charts */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Recent Activity
          </h3>
          <div className="space-y-4">
            {jobs.slice(0, 5).map((job) => (
              <div
                key={job.id}
                className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {job.position} at {job.company}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(job.applicationDate).toLocaleDateString()}
                  </p>
                </div>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${STATUS_CONFIG[job.status].bg} ${STATUS_CONFIG[job.status].text}`}
                >
                  {STATUS_CONFIG[job.status].label}
                </span>
              </div>
            ))}
            {jobs.length === 0 && (
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                No recent activity
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
