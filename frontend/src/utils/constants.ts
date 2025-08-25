import { Clock, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { JobStatus } from '@/types/index.ts';

export const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:5001/api/v1';

export const STATUS_CONFIG = {
  applied: {
    label: 'Applied',
    color: 'blue',
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    border: 'border-blue-200',
    icon: Clock,
  },
  interviewing: {
    label: 'Interviewing',
    color: 'yellow',
    bg: 'bg-yellow-50',
    text: 'text-yellow-700',
    border: 'border-yellow-200',
    icon: AlertCircle,
  },
  offered: {
    label: 'Offered',
    color: 'green',
    bg: 'bg-green-50',
    text: 'text-green-700',
    border: 'border-green-200',
    icon: CheckCircle,
  },
  rejected: {
    label: 'Rejected',
    color: 'red',
    bg: 'bg-red-50',
    text: 'text-red-700',
    border: 'border-red-200',
    icon: XCircle,
  },
} as const;

export const STATUS_OPTIONS: { value: JobStatus; label: string }[] = [
  { value: 'applied', label: 'Applied' },
  { value: 'interviewing', label: 'Interviewing' },
  { value: 'offered', label: 'Offered' },
  { value: 'rejected', label: 'Rejected' },
];

export const LOCAL_STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data',
} as const;
