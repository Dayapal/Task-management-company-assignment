import API from "../api/axios";

export const getAllUsers = () =>
  API.get("/admin/users");

export const deleteUser = (id) =>
  API.delete(`/admin/users/${id}`);

export const updateUserStatus = (
  id,
  status
) =>
  API.put(
    `/admin/users/${id}/status`,
    {
      status,
    }
  );

export const getAllTasks = () =>
  API.get("/admin/tasks");

export const deleteAnyTask = (id) =>
  API.delete(`/admin/tasks/${id}`);

export const getActivityLogs = () =>
  API.get("/admin/activity");

export const getAnalytics = () =>
  API.get("/admin/analytics");