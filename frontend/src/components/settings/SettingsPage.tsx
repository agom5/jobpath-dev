import { useState } from 'react';
import {
  Settings as SettingsIcon,
  User as UserIcon,
  Palette,
  Shield,
  X,
  Upload,
  Trash2,
  Sun,
  Moon,
  Monitor,
  AlertTriangle,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';
import { User } from '../../types/index.ts';
import { useTheme, Theme } from '@/hooks/useTheme.ts';
import { getAvatarUrl, hasAvatar } from '@/utils/avatar.ts';
import { openAvatarUpload } from '@/utils/cloudinary.ts';

interface SettingsPageProps {
  user: User;
  onClose: () => void;
  onUpdateProfile: (updates: {
    name?: string;
    avatar?: string;
  }) => Promise<boolean>;
  onDeleteAccount: () => Promise<boolean>;
}

export default function SettingsPage({
  user,
  onClose,
  onUpdateProfile,
  onDeleteAccount,
}: SettingsPageProps) {
  const { theme, setTheme } = useTheme();

  // Profile section state
  const [profileName, setProfileName] = useState(user.name);
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [profileSuccess, setProfileSuccess] = useState(false);

  // Avatar upload state
  const [avatarUploading, setAvatarUploading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  // Account deletion state
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Collapsible sections state
  const [expandedSections, setExpandedSections] = useState({
    profile: true,
    appearance: true,
    account: true,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const CollapsibleSection = ({
    id,
    title,
    icon: Icon,
    children,
  }: {
    id: keyof typeof expandedSections;
    title: string;
    icon: React.ComponentType<{ className?: string }>;
    children: React.ReactNode;
  }) => {
    const isExpanded = expandedSections[id];

    return (
      <section className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        <button
          onClick={() => toggleSection(id)}
          className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-750 transition-colors"
        >
          <div className="flex items-center gap-3">
            <Icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              {title}
            </h3>
          </div>
          {isExpanded ? (
            <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          ) : (
            <ChevronRight className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          )}
        </button>
        <div
          className={`transition-all duration-300 ease-in-out ${
            isExpanded
              ? 'max-h-[2000px] opacity-100'
              : 'max-h-0 opacity-0 overflow-hidden'
          }`}
        >
          <div className="p-6 bg-white dark:bg-gray-900">{children}</div>
        </div>
      </section>
    );
  };

  const handleAvatarUpload = () => {
    setAvatarUploading(true);
    openAvatarUpload(
      (url: string) => {
        setAvatarPreview(url);
        setAvatarUploading(false);
      },
      (error) => {
        console.error('Avatar upload failed:', error);
        setProfileError('Failed to upload avatar');
        setAvatarUploading(false);
      }
    );
  };

  const handleProfileUpdate = async () => {
    if (profileName === user.name && !avatarPreview) {
      return;
    }

    setProfileLoading(true);
    setProfileError(null);
    setProfileSuccess(false);

    try {
      const success = await onUpdateProfile({
        name: profileName !== user.name ? profileName : undefined,
        avatar: avatarPreview !== null ? avatarPreview : undefined,
      });

      if (success) {
        setProfileSuccess(true);
        setAvatarPreview(null);
        setTimeout(() => setProfileSuccess(false), 3000);
      } else {
        setProfileError('Failed to update profile');
      }
    } catch (error) {
      console.error('Profile update error:', error);
      setProfileError('An error occurred while updating your profile');
    } finally {
      setProfileLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmText !== 'DELETE') {
      return;
    }

    setDeleteLoading(true);
    try {
      const success = await onDeleteAccount();
      if (!success) {
        // Handle error
      }
    } catch (error) {
      console.error('Failed to delete account:', error);
    } finally {
      setDeleteLoading(false);
    }
  };

  const themeOptions: { value: Theme; label: string; icon: React.ReactNode }[] =
    [
      { value: 'light', label: 'Light', icon: <Sun className="w-4 h-4" /> },
      { value: 'dark', label: 'Dark', icon: <Moon className="w-4 h-4" /> },
      {
        value: 'system',
        label: 'System',
        icon: <Monitor className="w-4 h-4" />,
      },
    ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <SettingsIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Settings
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[calc(90vh-120px)] overflow-y-auto">
          {/* Profile Section */}
          <CollapsibleSection id="profile" title="Profile" icon={UserIcon}>
            <div className="space-y-6">
              {/* Avatar */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Profile Picture
                </label>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                      {avatarPreview || hasAvatar(user.avatar) ? (
                        <img
                          src={avatarPreview || getAvatarUrl(user.avatar)!}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <UserIcon className="w-8 h-8 text-gray-400" />
                      )}
                    </div>
                    {avatarPreview && (
                      <button
                        onClick={() => {
                          setAvatarPreview(null);
                        }}
                        className="absolute -top-1 -right-1 p-1 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 rounded-full hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleAvatarUpload}
                      disabled={avatarUploading}
                      className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Upload className="w-4 h-4" />
                      {avatarUploading ? 'Uploading...' : 'Upload'}
                    </button>
                    {(avatarPreview || hasAvatar(user.avatar)) && (
                      <button
                        onClick={async () => {
                          setAvatarPreview(null);

                          if (hasAvatar(user.avatar) && !avatarPreview) {
                            try {
                              await onUpdateProfile({ avatar: '' });
                            } catch (error) {
                              console.error('Failed to remove avatar:', error);
                            }
                          }
                        }}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Email (read-only) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={user.email}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white opacity-60 cursor-not-allowed"
                />
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Email address cannot be changed
                </p>
              </div>

              {/* Success/Error Messages */}
              {profileError && (
                <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <p className="text-sm text-red-600 dark:text-red-400">
                    {profileError}
                  </p>
                </div>
              )}

              {profileSuccess && (
                <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                  <p className="text-sm text-green-600 dark:text-green-400">
                    Profile updated successfully!
                  </p>
                </div>
              )}

              {/* Save Button */}
              <div className="flex justify-end">
                <button
                  onClick={handleProfileUpdate}
                  disabled={
                    profileLoading ||
                    (profileName === user.name && !avatarPreview)
                  }
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg transition-colors disabled:cursor-not-allowed"
                >
                  {profileLoading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          </CollapsibleSection>

          {/* Appearance Section */}
          <CollapsibleSection id="appearance" title="Appearance" icon={Palette}>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                  Theme
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {themeOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setTheme(option.value)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        theme === option.value
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                    >
                      <div className="flex items-center justify-center mb-2">
                        <div
                          className={`p-2 rounded-full ${
                            theme === option.value
                              ? 'bg-blue-100 dark:bg-blue-800'
                              : 'bg-gray-100 dark:bg-gray-800'
                          }`}
                        >
                          {option.icon}
                        </div>
                      </div>
                      <div
                        className={`text-sm font-medium ${
                          theme === option.value
                            ? 'text-blue-900 dark:text-blue-100'
                            : 'text-gray-900 dark:text-white'
                        }`}
                      >
                        {option.label}
                      </div>
                    </button>
                  ))}
                </div>
                <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                  System theme will follow your device's appearance settings
                </p>
              </div>
            </div>
          </CollapsibleSection>

          {/* Account Section */}
          <CollapsibleSection id="account" title="Account" icon={Shield}>
            <div className="space-y-6">
              <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-medium text-red-800 dark:text-red-300 mb-1">
                      Delete Account
                    </h4>
                    <p className="text-sm text-red-700 dark:text-red-400 mb-3">
                      This action cannot be undone. All your data will be
                      permanently deleted.
                    </p>
                    <button
                      onClick={() => setShowDeleteConfirm(true)}
                      className="text-sm text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 font-medium"
                    >
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </CollapsibleSection>
        </div>

        {/* Delete Account Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-60 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-md">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-red-100 dark:bg-red-900 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Delete Account
                  </h3>
                </div>

                <div className="mb-6">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    This action is permanent and cannot be undone. All your job
                    applications, profile data, and settings will be permanently
                    deleted.
                  </p>

                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Type{' '}
                    <span className="font-mono bg-gray-100 dark:bg-gray-800 px-1 rounded">
                      DELETE
                    </span>{' '}
                    to confirm:
                  </p>

                  <input
                    type="text"
                    value={deleteConfirmText}
                    onChange={(e) => setDeleteConfirmText(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    placeholder="Type DELETE to confirm"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setShowDeleteConfirm(false);
                      setDeleteConfirmText('');
                    }}
                    className="flex-1 px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteAccount}
                    disabled={deleteConfirmText !== 'DELETE' || deleteLoading}
                    className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white rounded-lg transition-colors disabled:cursor-not-allowed"
                  >
                    {deleteLoading ? 'Deleting...' : 'Delete Account'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
