import { projectId, publicAnonKey } from './supabase/info';

const baseUrl = `https://${projectId}.supabase.co/functions/v1/make-server-69b1337c`;

export async function apiCall(
  endpoint: string,
  options: RequestInit = {},
  useAuth = false
): Promise<any> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (useAuth) {
    const token = localStorage.getItem('access_token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  } else {
    headers['Authorization'] = `Bearer ${publicAnonKey}`;
  }

  const response = await fetch(`${baseUrl}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(error.error || 'API call failed');
  }

  return response.json();
}

// Essay API
export const essayApi = {
  getAll: (published?: boolean) => {
    const query = published !== undefined ? `?published=${published}` : '';
    return apiCall(`/essays${query}`);
  },

  getById: (id: string) => apiCall(`/essays/${id}`),

  create: (essay: any) =>
    apiCall('/essays', {
      method: 'POST',
      body: JSON.stringify(essay),
    }, true),

  update: (id: string, essay: any) =>
    apiCall(`/essays/${id}`, {
      method: 'PUT',
      body: JSON.stringify(essay),
    }, true),

  delete: (id: string) =>
    apiCall(`/essays/${id}`, {
      method: 'DELETE',
    }, true),
};

// Auth API
export const authApi = {
  signup: (email: string, password: string, name: string) =>
    apiCall('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    }),

  login: (email: string, password: string) =>
    apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
};

// Upload API
export async function uploadFile(file: File, type: 'thumbnail' | 'essay' | 'ebook'): Promise<string> {
  const token = localStorage.getItem('access_token');
  const formData = new FormData();
  formData.append('file', file);
  formData.append('type', type);

  const response = await fetch(`${baseUrl}/upload`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token || publicAnonKey}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Upload failed' }));
    throw new Error(error.error || 'Upload failed');
  }

  const data = await response.json();
  return data.url;
}

// Newsletter API
export const newsletterApi = {
  subscribe: (email: string) =>
    apiCall('/newsletter/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email }),
    }),
};

// Contact API
export const contactApi = {
  send: (name: string, email: string, subject: string, message: string) =>
    apiCall('/contact', {
      method: 'POST',
      body: JSON.stringify({ name, email, subject, message }),
    }),
};

// Ebook API
export const ebookApi = {
  getDownloadUrl: () => apiCall('/ebook/download'),
};
