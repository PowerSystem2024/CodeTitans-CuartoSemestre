import api from "./api";

export const createTasksRequest = (task) => api.post("/tasks", task);

export const getTasksRequest = () => api.get("/tasks");

export const getTaskRequest = (id) => api.get(`/tasks/${id}`);

export const deleteTasksRequest = (id) => api.delete(`/tasks/${id}`);

export const updateTaskRequest = (id, task) => api.put(`/tasks/${id}`, task);
