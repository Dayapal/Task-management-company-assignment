import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import AnalyticsCard from "../../components/analytics/AnalyticsCard";
import { getAnalytics } from "../../services/adminService";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

function Analytics() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAnalytics();
      setData(res.data);
    };

    fetchData();
  }, []);

  if (!data) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-[60vh]">
          <h2 className="text-2xl font-semibold">
            Loading Analytics...
          </h2>
        </div>
      </AdminLayout>
    );
  }

  const chartData = [
    {
      name: "Completed",
      value: data.completedTasks,
    },
    {
      name: "Pending",
      value: data.pendingTasks,
    },
  ];

  const COLORS = [
    "#22c55e",
    "#ef4444",
  ];

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-800">
          Analytics Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Overview of users and task performance
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        <AnalyticsCard
          title="Total Users"
          value={data.totalUsers}
          bgColor="bg-blue-600"
        />

        <AnalyticsCard
          title="Total Tasks"
          value={data.totalTasks}
          bgColor="bg-green-600"
        />

        <AnalyticsCard
          title="Completed Tasks"
          value={data.completedTasks}
          bgColor="bg-purple-600"
        />

        <AnalyticsCard
          title="Pending Tasks"
          value={data.pendingTasks}
          bgColor="bg-red-600"
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold mb-4">
            Task Distribution
          </h2>

          <div className="h-75">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  outerRadius={100}
                  label
                >
                  {chartData.map(
                    (entry, index) => (
                      <Cell
                        key={index}
                        fill={
                          COLORS[index]
                        }
                      />
                    )
                  )}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold mb-4">
            Summary
          </h2>

          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-green-100">
              <p className="font-semibold">
                Completed Tasks
              </p>

              <p className="text-2xl font-bold text-green-700">
                {data.completedTasks}
              </p>
            </div>

            <div className="p-4 rounded-lg bg-red-100">
              <p className="font-semibold">
                Pending Tasks
              </p>

              <p className="text-2xl font-bold text-red-700">
                {data.pendingTasks}
              </p>
            </div>

            <div className="p-4 rounded-lg bg-blue-100">
              <p className="font-semibold">
                Total Users
              </p>

              <p className="text-2xl font-bold text-blue-700">
                {data.totalUsers}
              </p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default Analytics;