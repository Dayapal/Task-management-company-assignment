import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import {
  getAllUsers,
  deleteUser,
  updateUserStatus,
} from "../../services/adminService";

function UserManagement() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await getAllUsers();
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    await deleteUser(id);
    fetchUsers();
  };

  const handleStatus = async (user) => {
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
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
          User Management
        </h1>

        <p className="text-slate-500 mt-2">
          Manage users, statuses and permissions.
        </p>
      </div>

      {/* Stats Card */}
      <div className="mb-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <p className="text-sm text-slate-500">
            Total Users
          </p>

          <h2 className="text-3xl font-bold mt-1">
            {users.length}
          </h2>
        </div>
      </div>

      {/* Users */}
      <div className="space-y-4">
        {users.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center">
            <p className="text-slate-500">
              No users found
            </p>
          </div>
        ) : (
          users.map((user) => (
            <div
              key={user._id}
              className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-md transition-all duration-200"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                {/* User Info */}
                <div className="min-w-0">
                  <h3 className="font-semibold text-slate-900 truncate">
                    {user.name}
                  </h3>

                  <p className="text-slate-500 text-sm break-all">
                    {user.email}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() =>
                      handleStatus(user)
                    }
                    className={`px-4 py-2 rounded-lg text-sm font-medium text-white transition ${
                      user.status === "Active"
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-yellow-500 hover:bg-yellow-600"
                    }`}
                  >
                    {user.status}
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(user._id)
                    }
                    className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-medium transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </AdminLayout>
  );
}

export default UserManagement;