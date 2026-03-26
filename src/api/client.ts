import axios from 'axios';

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api/v1',
  withCredentials: true, // sends cookies automatically (web JWT)
  headers: {
    'Content-Type': 'application/json',
    'x-client-type': 'web',
  },
});

// Track if a refresh is already in progress to avoid multiple parallel refresh calls
let isRefreshing = false;
let failedQueue: { resolve: (v: any) => void; reject: (e: any) => void }[] = [];

const processQueue = (error: any) => {
  failedQueue.forEach((p) => (error ? p.reject(error) : p.resolve(null)));
  failedQueue = [];
};

// On every response, unwrap the { success, message, data } envelope
// so callers just get `data` directly
client.interceptors.response.use(
  (response) => {
    if (response.data && 'data' in response.data) {
      response.data = response.data.data;
    }
    return response;
  },
  async (error) => {
    const original = error.config;

    // Auth endpoints should never trigger a refresh — let their errors pass through directly
    const isAuthEndpoint = original?.url?.startsWith('/auth/');

    // If 401 on a protected endpoint and not already retrying — try to refresh the token
    if (error.response?.status === 401 && !original._retry && !isAuthEndpoint) {
      if (isRefreshing) {
        // Queue this request until refresh completes
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => client(original));
      }

      original._retry = true;
      isRefreshing = true;

      try {
        await client.post('/auth/refresh');
        processQueue(null);
        return client(original); // retry original request
      } catch (refreshError) {
        processQueue(refreshError);
        // Refresh failed — session truly expired, redirect to login
        window.location.href = '/';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // Return the error body in a consistent shape
    return Promise.reject(error.response?.data ?? error);
  },
);

export default client;