import { useState, useEffect } from 'react';
import { Job, JobFormData } from '@/types/index.ts';
import { api, handleApiError } from '@/utils/api.ts';

interface UseJobsReturn {
  jobs: Job[];
  loading: boolean;
  error: string | null;
  addJob: (jobData: JobFormData) => Promise<void>;
  updateJob: (id: string, updates: Partial<JobFormData>) => Promise<void>;
  deleteJob: (id: string) => Promise<void>;
  refreshJobs: () => Promise<void>;
  clearError: () => void;
}

interface UseJobsProps {
  isAuthenticated: boolean;
  authLoading: boolean;
}

export function useJobs({
  isAuthenticated,
  authLoading,
}: UseJobsProps): UseJobsReturn {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated && !authLoading) {
      fetchJobs();
    } else if (!isAuthenticated && !authLoading) {
      setJobs([]);
      setLoading(false);
    }
  }, [isAuthenticated, authLoading]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError(null);
      const jobsData = await api.getJobs();
      setJobs(jobsData);
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const addJob = async (jobData: JobFormData): Promise<void> => {
    try {
      setError(null);
      const newJob = await api.createJob(jobData);
      setJobs((prev) => [newJob, ...prev]);
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const updateJob = async (
    id: string,
    updates: Partial<JobFormData>
  ): Promise<void> => {
    try {
      setError(null);
      const updatedJob = await api.updateJob(id, updates);
      setJobs((prev) => prev.map((job) => (job.id === id ? updatedJob : job)));
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const deleteJob = async (id: string): Promise<void> => {
    try {
      setError(null);
      await api.deleteJob(id);
      setJobs((prev) => prev.filter((job) => job.id !== id));
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const refreshJobs = async (): Promise<void> => {
    await fetchJobs();
  };

  const clearError = () => {
    setError(null);
  };

  return {
    jobs,
    loading,
    error,
    addJob,
    updateJob,
    deleteJob,
    refreshJobs,
    clearError,
  };
}
