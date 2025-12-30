import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000/api'
});

// Add token to requests
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const authAPI = {
  register: (data) => API.post('/auth/register', data),
  login: (data) => API.post('/auth/login', data)
};

export const taskAPI = {
  getTasks: (page = 1, limit = 10) => API.get(`/tasks?page=${page}&limit=${limit}`),
  getTaskById: (id) => API.get(`/tasks/${id}`),
  createTask: (data) => API.post('/tasks', data),
  updateTask: (id, data) => API.put(`/tasks/${id}`, data),
  deleteTask: (id) => API.delete(`/tasks/${id}`)
};

export default API;