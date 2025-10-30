import api from "./api";

export const createTasksRequest = (task) => api.post("/tasks", task);

export const getTasksRequest = () => api.get("/tasks");

export const deleteTasksRequest = (id) => api.delete(`/tasks/${id}`);
