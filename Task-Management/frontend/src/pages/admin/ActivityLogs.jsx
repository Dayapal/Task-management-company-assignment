import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { getActivityLogs } from "../../services/adminService";

function ActivityLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await getActivityLogs();
        setLogs(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  const getRelativeTime = (date) => {
    const seconds = Math.floor(
      (new Date() - new Date(date)) / 1000
    );

    const intervals = {
      year: 31536000,
      month: 2592000,
      day: 86400,
      hour: 3600,
      minute: 60,
    };

    for (const [unit, value] of Object.entries(intervals)) {
      const interval = Math.floor(seconds / value);

      if (interval >= 1) {
        return `${interval} ${unit}${
          interval > 1 ? "s" : ""
        } ago`;
      }
    }

    return "Just now";
  };

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Activity Logs
        </h1>

        <p className="mt-2 text-gray-500">
          Track user actions and system events across the
          platform.
        </p>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="h-24 animate-pulse rounded-xl bg-gray-200"
            />
          ))}
        </div>
      ) : logs.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 bg-white p-12 text-center">
          <h3 className="text-lg font-semibold text-gray-700">
            No Activity Found
          </h3>

          <p className="mt-2 text-gray-500">
            User activities will appear here once actions
            are performed.
          </p>
        </div>
      ) : (
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-6 top-0 h-full w-0.5 bg-gray-200" />

          <div className="space-y-6">
            {logs.map((log) => (
              <div
                key={log._id}
                className="relative flex gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                {/* Timeline Dot */}
                <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-lg font-bold text-blue-600">
                  {log.user?.name?.charAt(0)?.toUpperCase() ||
                    "U"}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {log.user?.name || "Unknown User"}
                      </h3>

                      <p className="text-gray-600">
                        {log.action}
                      </p>
                    </div>

                    <div className="text-sm text-gray-500">
                      {getRelativeTime(log.createdAt)}
                    </div>
                  </div>

                  <div className="mt-3 border-t pt-3 text-sm text-gray-500">
                    {new Date(
                      log.createdAt
                    ).toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

export default ActivityLogs;