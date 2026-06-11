import { useEffect, useState } from "react";

import AdminLayout from "../../layouts/AdminLayout";

import { getActivityLogs } from "../../services/adminService";

function ActivityLogs() {
  const [logs, setLogs] =
    useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      const res =
        await getActivityLogs();

      setLogs(res.data);
    };

    fetchLogs();
  }, []);

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6">
        Activity Logs
      </h1>

      <div className="space-y-4">
        {logs.map((log) => (
          <div
            key={log._id}
            className="bg-white p-4 rounded shadow"
          >
            <p>
              <strong>
                {log.user?.name}
              </strong>
            </p>

            <p>{log.action}</p>

            <p>
              {new Date(
                log.createdAt
              ).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}

export default ActivityLogs;