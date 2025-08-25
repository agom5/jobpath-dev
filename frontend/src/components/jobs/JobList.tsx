import { Search, Plus, Target } from 'lucide-react';
import { Job, FilterOptions } from '@/types/index.ts';
import { STATUS_OPTIONS } from '@/utils/constants.ts';
import JobCard from './JobCard.tsx';
import PageHeader from '../layout/PageHeader.tsx';

interface JobListProps {
  jobs: Job[];
  onEdit: (job: Job) => void;
  onDelete: (id: string) => void;
  onView: (job: Job) => void;
  onAddNew: () => void;
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
}

export default function JobList({
  jobs,
  onEdit,
  onDelete,
  onView,
  onAddNew,
  filters,
  onFiltersChange,
}: JobListProps) {
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.company.toLowerCase().includes(filters.search.toLowerCase()) ||
      job.position.toLowerCase().includes(filters.search.toLowerCase());
    const matchesStatus =
      filters.status === 'all' || job.status === filters.status;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Job Applications"
        description="Manage and track your job applications"
        action={
          <button
            onClick={onAddNew}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-all flex items-center gap-2 whitespace-nowrap"
          >
            <Plus className="w-5 h-5" />
            Add Application
          </button>
        }
      />

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Search companies or positions..."
              value={filters.search}
              onChange={(e) =>
                onFiltersChange({ ...filters, search: e.target.value })
              }
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <div className="flex gap-3">
            <select
              value={filters.status}
              onChange={(e) =>
                onFiltersChange({
                  ...filters,
                  status: e.target.value as FilterOptions['status'],
                })
              }
              className="px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="all">All Status</option>
              {STATUS_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Jobs Grid */}
      {filteredJobs.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 text-center shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Target className="w-10 h-10 text-gray-400 dark:text-gray-500" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            {jobs.length === 0
              ? 'No applications yet'
              : 'No matching applications'}
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            {jobs.length === 0
              ? 'Start tracking your job applications to see your progress'
              : 'Try adjusting your search or filter criteria'}
          </p>
          {jobs.length === 0 && (
            <button
              onClick={onAddNew}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 transition-all inline-flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Your First Application
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onEdit={onEdit}
              onDelete={onDelete}
              onView={onView}
            />
          ))}
        </div>
      )}

      {/* Results count */}
      {filteredJobs.length > 0 && (
        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          Showing {filteredJobs.length} of {jobs.length} application
          {jobs.length !== 1 ? 's' : ''}
        </div>
      )}
    </div>
  );
}
