import { useEffect, useState } from "react";

import AdminLayout from "../../layouts/AdminLayout";
import { Link } from "react-router-dom";

import AnalyticsCard from "../../components/analytics/AnalyticsCard";

import {
  getAnalytics,
  getActivityLogs,
} from "../../services/adminService";

function AdminDashboard() {
  const [analytics, setAnalytics] =
    useState(null);

  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData =
    async () => {
      try {
        const analyticsRes =
          await getAnalytics();

        const logsRes =
          await getActivityLogs();

        setAnalytics(
          analyticsRes.data
        );

        setLogs(
          logsRes.data.slice(0, 5)
        );
      } catch (error) {
        console.log(error);
      }
    };

  if (!analytics) {
  return (
    <AdminLayout>
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-xl font-semibold">
          Loading Dashboard...
        </p>
      </div>
    </AdminLayout>
  );
}

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6">
        Admin Dashboard
      </h1>

<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
  <AnalyticsCard
    title="Total Users"
    value={analytics.totalUsers}
    bgColor="bg-blue-600"
  />

  <AnalyticsCard
    title="Total Tasks"
    value={analytics.totalTasks}
    bgColor="bg-green-600"
  />

  <AnalyticsCard
    title="Completed Tasks"
    value={analytics.completedTasks}
    bgColor="bg-purple-600"
  />

  <AnalyticsCard
    title="Pending Tasks"
    value={analytics.pendingTasks}
    bgColor="bg-red-600"
  />
</div>

{/* Quick Actions */}
<div className="grid md:grid-cols-3 gap-4 mb-8">
  <Link
    to="/admin/users"
    className="bg-blue-500 text-white p-5 rounded-lg text-center font-semibold hover:bg-blue-600 transition"
  >
    Manage Users
  </Link>

  <Link
    to="/admin/tasks"
    className="bg-green-500 text-white p-5 rounded-lg text-center font-semibold hover:bg-green-600 transition"
  >
    Monitor Tasks
  </Link>

  <Link
    to="/admin/logs"
    className="bg-purple-500 text-white p-5 rounded-lg text-center font-semibold hover:bg-purple-600 transition"
  >
    View Activity Logs
  </Link>
</div>
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">
          Recent Activities
        </h2>

        {logs.map((log) => (
          <div
            key={log._id}
            className="border-b py-2"
          >
            <p>
              <strong>
                {log.user?.name}
              </strong>{" "}
              - {log.action}
            </p>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}

export default AdminDashboard;