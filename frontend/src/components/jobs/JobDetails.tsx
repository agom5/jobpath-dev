import { XCircle, Edit3, Building2, MapPin, DollarSign } from 'lucide-react';
import { Job } from '@/types/index.ts';
import { STATUS_CONFIG } from '@/utils/constants.ts';

interface JobDetailsProps {
  job?: Job;
  loading?: boolean;
  onClose: () => void;
  onEdit: (job: Job) => void;
}

export default function JobDetails({
  job,
  loading = false,
  onClose,
  onEdit,
}: JobDetailsProps) {
  if (loading || !job) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-2xl mx-4 max-h-[90vh] overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded animate-pulse w-32"></div>
            <div className="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
          </div>
          <div className="p-6 space-y-4">
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse w-3/4"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse w-1/2"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse w-2/3"></div>
          </div>
        </div>
      </div>
    );
  }

  const statusConfig = STATUS_CONFIG[job.status];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Application Details
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors"
          >
            <XCircle className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Header Section */}
          <div className="flex items-center gap-4 p-6 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-700 dark:to-blue-900/20 rounded-2xl">
            <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-2xl flex items-center justify-center shadow-sm">
              <Building2 className="w-8 h-8 text-gray-600 dark:text-gray-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {job.position}
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                {job.company}
              </p>
            </div>
            <span
              className={`px-4 py-2 rounded-full text-sm font-medium ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border} border`}
            >
              {statusConfig.label}
            </span>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                Application Date
              </label>
              <p className="text-gray-900 dark:text-white font-medium">
                {new Date(job.applicationDate).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>

            {job.location && (
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                  Location
                </label>
                <div className="flex items-center gap-2 text-gray-900 dark:text-white">
                  <MapPin className="w-4 h-4" />
                  <span>{job.location}</span>
                </div>
              </div>
            )}

            {job.salary && (
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                  Salary Range
                </label>
                <div className="flex items-center gap-2 text-gray-900 dark:text-white">
                  <DollarSign className="w-4 h-4" />
                  <span>{job.salary}</span>
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                Created
              </label>
              <p className="text-gray-900 dark:text-white">
                {new Date(job.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                Last Updated
              </label>
              <p className="text-gray-900 dark:text-white">
                {new Date(job.updatedAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Description */}
          {job.description && (
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
                Job Description
              </label>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
                <p className="text-gray-900 dark:text-white whitespace-pre-wrap">
                  {job.description}
                </p>
              </div>
            </div>
          )}

          {/* Notes */}
          {job.notes && (
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
                Notes
              </label>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-800">
                <p className="text-gray-900 dark:text-white whitespace-pre-wrap">
                  {job.notes}
                </p>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-100 dark:border-gray-700">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <p>ID: {job.id}</p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => onEdit(job)}
                className="px-4 py-2 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 rounded-xl font-medium hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors flex items-center gap-2"
              >
                <Edit3 className="w-4 h-4" />
                Edit
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
