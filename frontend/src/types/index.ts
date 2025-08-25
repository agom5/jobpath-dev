export interface Job {
  id: string;
  company: string;
  position: string;
  status: 'applied' | 'interviewing' | 'rejected' | 'offered';
  applicationDate: string;
  location?: string;
  salary?: string;
  description?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export type JobFormData = Omit<Job, 'id' | 'createdAt' | 'updatedAt'>;

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface JobStats {
  total: number;
  applied: number;
  interviewing: number;
  offered: number;
  rejected: number;
}

export type JobStatus = Job['status'];

export interface FilterOptions {
  status: JobStatus | 'all';
  search: string;
}
