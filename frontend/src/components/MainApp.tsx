import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Job, JobFormData, FilterOptions } from '@/types/index.ts';
import { useAuth } from '@/hooks/useAuth.ts';
import { useJobs } from '@/hooks/useJobs.ts';

import MainLayout from '@/components/layout/MainLayout.tsx';
import Dashboard from '@/components/dashboard/Dashboard.tsx';
import JobList from '@/components/jobs/JobList.tsx';
import JobForm from '@/components/jobs/JobForm.tsx';
import JobDetails from '@/components/jobs/JobDetails.tsx';
import SettingsPage from '@/components/settings/SettingsPage.tsx';
import { JobListSkeleton } from '@/components/ui/Skeleton.tsx';

export default function MainApp() {
  const location = useLocation();
  const navigate = useNavigate();

  const { user, logout, updateProfile, deleteAccount } = useAuth();

  const {
    jobs,
    loading: jobsLoading,
    error: jobsError,
    addJob,
    updateJob,
    deleteJob,
    refreshJobs,
  } = useJobs({
    isAuthenticated: !!user,
    authLoading: false,
  });

  const getActiveViewFromPath = () => {
    const path = location.pathname;
    if (path.includes('/applications')) return 'applications';
    return 'dashboard';
  };

  const [activeView, setActiveView] = useState(getActiveViewFromPath());

  const [showForm, setShowForm] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [viewingJob, setViewingJob] = useState<Job | null>(null);

  const [filters, setFilters] = useState<FilterOptions>({
    search: '',
    status: 'all',
  });

  const handleLogout = async () => {
    await logout();
  };

  const handleDeleteAccount = async (): Promise<boolean> => {
    try {
      const success = await deleteAccount();
      if (success) {
        navigate('/login');
      }
      return success;
    } catch (error) {
      console.error('Account deletion error:', error);
      return false;
    }
  };

  const handleEdit = (job: Job) => {
    setEditingJob(job);
    setShowForm(true);
  };

  const handleFormSubmit = async (formData: JobFormData) => {
    if (editingJob) {
      await updateJob(editingJob.id, formData);
    } else {
      await addJob(formData);
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingJob(null);
  };

  const handleAddNew = () => {
    setEditingJob(null);
    setShowForm(true);
  };

  const handleViewDetails = (job: Job) => {
    setViewingJob(job);
  };

  const handleCloseDetails = () => {
    setViewingJob(null);
  };

  const handleEditFromDetails = (job: Job) => {
    setViewingJob(null);
    handleEdit(job);
  };

  const handleOpenSettings = () => {
    setShowSettings(true);
  };

  const handleCloseSettings = () => {
    setShowSettings(false);
  };

  const handleViewChange = (view: string) => {
    setActiveView(view);
    if (view === 'applications') {
      navigate('/applications');
    } else {
      navigate('/dashboard');
    }
  };

  const renderMainContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard jobs={jobs} loading={jobsLoading} />;
      case 'applications':
        return (
          <>
            {jobsLoading ? (
              <JobListSkeleton />
            ) : jobsError ? (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-6 text-center">
                <p className="text-red-600 dark:text-red-400">
                  Error loading applications: {jobsError}
                </p>
                <button
                  onClick={refreshJobs}
                  className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Retry
                </button>
              </div>
            ) : (
              <JobList
                jobs={jobs}
                onEdit={handleEdit}
                onDelete={deleteJob}
                onView={handleViewDetails}
                onAddNew={handleAddNew}
                filters={filters}
                onFiltersChange={setFilters}
              />
            )}
          </>
        );
      default:
        return <Dashboard jobs={jobs} loading={jobsLoading} />;
    }
  };

  if (!user) {
    return null;
  }

  return (
    <MainLayout
      user={user}
      activeView={activeView}
      onViewChange={handleViewChange}
      onAddNew={handleAddNew}
      onOpenSettings={handleOpenSettings}
      onLogout={handleLogout}
    >
      {renderMainContent()}

      {/* Modals */}
      {showForm && (
        <JobForm
          job={editingJob || undefined}
          onSubmit={handleFormSubmit}
          onClose={handleCloseForm}
          loading={jobsLoading}
        />
      )}

      {viewingJob && (
        <JobDetails
          job={viewingJob}
          onClose={handleCloseDetails}
          onEdit={handleEditFromDetails}
        />
      )}

      {showSettings && (
        <SettingsPage
          user={user}
          onClose={handleCloseSettings}
          onUpdateProfile={updateProfile}
          onDeleteAccount={handleDeleteAccount}
        />
      )}
    </MainLayout>
  );
}
