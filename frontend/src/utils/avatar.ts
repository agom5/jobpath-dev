import { API_BASE_URL } from './constants.ts';

export const getAvatarUrl = (
  avatar: string | null | undefined
): string | null => {
  if (!avatar) return null;

  if (avatar.startsWith('http')) return avatar;

  if (avatar.startsWith('/uploads')) {
    return `${API_BASE_URL.replace('/api/v1', '')}${avatar}`;
  }

  return avatar;
};

export const hasAvatar = (avatar: string | null | undefined): boolean => {
  return !!avatar && avatar.trim().length > 0;
};
