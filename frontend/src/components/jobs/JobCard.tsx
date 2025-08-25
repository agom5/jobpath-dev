import {
  Calendar,
  Building2,
  MapPin,
  DollarSign,
  Eye,
  Edit3,
  Trash2,
} from 'lucide-react';
import { Job } from '@/types/index.ts';
import { STATUS_CONFIG } from '@/utils/constants.ts';

interface JobCardProps {
  job: Job;
  onEdit: (job: Job) => void;
  onDelete: (id: string) => void;
  onView: (job: Job) => void;
}

export default function JobCard({
  job,
  onEdit,
  onDelete,
  onView,
}: JobCardProps) {
  const statusConfig = STATUS_CONFIG[job.status];

  const handleDelete = () => {
    if (
      window.confirm(
        `Are you sure you want to delete the application for ${job.position} at ${job.company}?`
      )
    ) {
      onDelete(job.id);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md dark:hover:shadow-lg transition-all duration-200 group">
      <div
        className="cursor-pointer lg:cursor-default active:bg-gray-50 dark:active:bg-gray-700 lg:active:bg-transparent rounded-xl transition-colors"
        onClick={() => onView(job)}
      >
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center">
                <Building2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                  {job.position}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {job.company}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3 flex-wrap">
              {job.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{job.location}</span>
                </div>
              )}
              {job.salary && (
                <div className="flex items-center gap-1">
                  <DollarSign className="w-4 h-4" />
                  <span>{job.salary}</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>
                  {new Date(job.applicationDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border} border whitespace-nowrap`}
          >
            {statusConfig.label}
          </span>
        </div>

        {job.description && (
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
            {job.description}
          </p>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-2 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onView(job);
            }}
            className="hidden lg:flex p-2 text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
            title="View details"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(job);
            }}
            className="p-2 text-gray-400 dark:text-gray-500 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
            title="Edit application"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete();
            }}
            className="p-2 text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
            title="Delete application"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        <span className="text-xs text-gray-400 dark:text-gray-500 lg:hidden">
          Tap to view details
        </span>
        <span className="text-xs text-gray-400 dark:text-gray-500 hidden lg:block">
          Updated {new Date(job.updatedAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
}
