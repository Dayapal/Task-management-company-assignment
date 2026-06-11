import { useEffect, useState } from "react";

import UserLayout from "../../layouts/UserLayout";

import TaskForm from "../../components/tasks/TaskForm";
import TaskCard from "../../components/tasks/TaskCard";

import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../../services/taskService";

function Dashboard() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const res = await getTasks();
      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreateTask = async (
    taskData
  ) => {
    try {
      await createTask(taskData);

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteTask = async (
    id
  ) => {
    try {
      await deleteTask(id);

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatusChange =
    async (task) => {
      try {
        await updateTask(task._id, {
          status:
            task.status === "Pending"
              ? "Completed"
              : "Pending",
        });

        fetchTasks();
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <UserLayout>
      <h1 className="text-3xl font-bold mb-6">
        My Tasks
      </h1>

      <TaskForm
        onSubmit={handleCreateTask}
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            onDelete={handleDeleteTask}
            onStatusChange={
              handleStatusChange
            }
          />
        ))}
      </div>
    </UserLayout>
  );
}

export default Dashboard;