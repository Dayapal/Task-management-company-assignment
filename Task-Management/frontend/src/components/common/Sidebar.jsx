import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Sidebar() {
  const { user } = useAuth();

  return (
    <div className="w-64 min-h-screen bg-slate-900 text-white p-5">
      <h2 className="text-2xl font-bold mb-8">
        Task Manager
      </h2>

      <div className="flex flex-col gap-4">
        {user?.role === "Admin" ? (
          <>
            <Link to="/admin">
              Dashboard
            </Link>

            <Link to="/admin/users">
              User Management
            </Link>

            <Link to="/admin/tasks">
              Task Monitoring
            </Link>

            <Link to="/admin/logs">
              Activity Logs
            </Link>

            <Link to="/admin/analytics">
              Analytics
            </Link>
          </>
        ) : (
          <>
            <Link to="/dashboard">
              My Tasks
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Sidebar;