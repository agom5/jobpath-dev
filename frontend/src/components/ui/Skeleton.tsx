import type { HTMLAttributes } from 'react';

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export default function Skeleton({ className = '', ...props }: SkeletonProps) {
  return (
    <div
      className={`bg-gray-200 dark:bg-gray-700 rounded animate-pulse ${className}`}
      {...props}
    />
  );
}

export function JobListSkeleton() {
  const skeletonItems = Array.from({ length: 6 }, (_, i) => (
    <div
      key={i}
      className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <Skeleton className="h-6 w-3/5 mb-2" />
          <Skeleton className="h-5 w-2/5" />
        </div>
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        {Array.from({ length: 4 }, (_, j) => (
          <div key={j}>
            <Skeleton className="h-3 w-1/2 mb-1" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        ))}
      </div>
      <Skeleton className="h-4 w-full" />
    </div>
  ));

  return <div className="space-y-4">{skeletonItems}</div>;
}

export function DashboardSkeleton() {
  const statCards = Array.from({ length: 4 }, (_, i) => (
    <div
      key={i}
      className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
    >
      <Skeleton className="w-12 h-12 rounded-full mb-4" />
      <Skeleton className="h-8 w-4/5 mb-2" />
      <Skeleton className="h-4 w-3/5" />
    </div>
  ));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
          <Skeleton className="h-6 w-1/2 mb-6" />
          <Skeleton className="h-72 w-full rounded-lg" />
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
          <Skeleton className="h-6 w-3/5 mb-6" />
          <Skeleton className="h-48 w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
}
