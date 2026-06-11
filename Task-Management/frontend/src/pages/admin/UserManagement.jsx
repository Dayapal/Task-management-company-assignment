import { useEffect, useState } from "react";

import AdminLayout from "../../layouts/AdminLayout";

import {
  getAllUsers,
  deleteUser,
  updateUserStatus,
} from "../../services/adminService";

function UserManagement() {
  const [users, setUsers] =
    useState([]);

  const fetchUsers = async () => {
    const res =
      await getAllUsers();

    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete =
    async (id) => {
      await deleteUser(id);
      fetchUsers();
    };

  const handleStatus =
    async (user) => {
      await updateUserStatus(
        user._id,
        user.status === "Active"
          ? "Inactive"
          : "Active"
      );

      fetchUsers();
    };

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6">
        User Management
      </h1>

      <div className="space-y-4">
        {users.map((user) => (
          <div
            key={user._id}
            className="bg-white p-4 rounded shadow flex justify-between"
          >
            <div>
              <h3>{user.name}</h3>

              <p>{user.email}</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() =>
                  handleStatus(user)
                }
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                {user.status}
              </button>

              <button
                onClick={() =>
                  handleDelete(user._id)
                }
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}

export default UserManagement;