import { useEffect, useState } from "react";

import AdminLayout from "../../layouts/AdminLayout";

import {
  getAllTasks,
  deleteAnyTask,
} from "../../services/adminService";

function TaskMonitoring() {
  const [tasks, setTasks] =
    useState([]);

  const fetchTasks = async () => {
    const res =
      await getAllTasks();

    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete =
    async (id) => {
      await deleteAnyTask(id);
      fetchTasks();
    };

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6">
        Task Monitoring
      </h1>

      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="bg-white p-4 rounded shadow flex justify-between"
          >
            <div>
              <h3>{task.title}</h3>

              <p>
                {task.user?.name}
              </p>
            </div>

            <button
              onClick={() =>
                handleDelete(task._id)
              }
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}

export default TaskMonitoring;