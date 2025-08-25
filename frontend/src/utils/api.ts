import {
  Job,
  JobFormData,
  User,
  LoginCredentials,
  AuthResponse,
} from '@/types/index.ts';
import { API_BASE_URL, LOCAL_STORAGE_KEYS } from './constants.ts';

interface RegistrationData {
  name: string;
  email: string;
  password: string;
}

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ message: 'An error occurred' }));

      const message =
        errorData.message || errorData.error || `HTTP ${response.status}`;
      throw new Error(message);
    }

    const result = await response.json();
    return result.data || result;
  }

  // Auth endpoints
  async register(userData: RegistrationData): Promise<AuthResponse> {
    const response = await fetch(`${this.baseURL}/auth/register`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(userData),
    });
    const result = await this.handleResponse<{ user: User; token: string }>(
      response
    );
    return {
      user: result.user,
      token: result.token,
    };
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await fetch(`${this.baseURL}/auth/login`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(credentials),
    });
    const result = await this.handleResponse<{ user: User; token: string }>(
      response
    );
    return {
      user: result.user,
      token: result.token,
    };
  }

  async logout(): Promise<void> {
    const response = await fetch(`${this.baseURL}/auth/logout`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
    });
    await this.handleResponse<void>(response);
  }

  async getCurrentUser(): Promise<User> {
    const response = await fetch(`${this.baseURL}/auth/me`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse<User>(response);
  }

  async updateProfile(updates: {
    name?: string;
    avatar?: string;
  }): Promise<User> {
    const response = await fetch(`${this.baseURL}/auth/profile`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(updates),
    });
    return this.handleResponse<User>(response);
  }

  async deleteAccount(): Promise<void> {
    const response = await fetch(`${this.baseURL}/auth/account`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });
    await this.handleResponse<void>(response);
  }

  // Jobs endpoints
  async getJobs(params?: {
    status?: string;
    search?: string;
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }): Promise<Job[]> {
    const queryParams = new URLSearchParams();

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });
    }

    const url = `${this.baseURL}/jobs${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    const response = await fetch(url, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse<Job[]>(response);
  }

  async createJob(jobData: JobFormData): Promise<Job> {
    const response = await fetch(`${this.baseURL}/jobs`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(jobData),
    });
    return this.handleResponse<Job>(response);
  }

  async updateJob(id: string, updates: Partial<JobFormData>): Promise<Job> {
    const response = await fetch(`${this.baseURL}/jobs/${id}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(updates),
    });
    return this.handleResponse<Job>(response);
  }

  async deleteJob(id: string): Promise<void> {
    const response = await fetch(`${this.baseURL}/jobs/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });
    await this.handleResponse<void>(response);
  }

  async getJob(id: string): Promise<Job> {
    const response = await fetch(`${this.baseURL}/jobs/${id}`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse<Job>(response);
  }

  async getJobStats(): Promise<{
    total: number;
    applied: number;
    interviewing: number;
    offered: number;
    rejected: number;
  }> {
    const response = await fetch(`${this.baseURL}/jobs/stats`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse<{
      total: number;
      applied: number;
      interviewing: number;
      offered: number;
      rejected: number;
    }>(response);
  }

  async deleteMultipleJobs(ids: string[]): Promise<{ deletedCount: number }> {
    const response = await fetch(`${this.baseURL}/jobs`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ ids }),
    });
    return this.handleResponse<{ deletedCount: number }>(response);
  }
}

export const api = new ApiClient(API_BASE_URL);

export const handleApiError = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unexpected error occurred';
};

export type { RegistrationData };
