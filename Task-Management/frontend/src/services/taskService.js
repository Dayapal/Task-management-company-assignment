import API from "../api/axios";

export const getTasks = () => API.get("/tasks");

export const createTask = (data) =>
  API.post("/tasks", data);

export const updateTask = (id, data) =>
  API.put(`/tasks/${id}`, data);

export const deleteTask = (id) =>
  API.delete(`/tasks/${id}`);