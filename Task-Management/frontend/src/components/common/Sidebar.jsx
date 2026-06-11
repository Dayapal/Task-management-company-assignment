import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Sidebar() {
  const { user } = useAuth();

  return (
    <div className="h-screen w-64 bg-slate-900 text-white p-6 overflow-y-auto">
      <h2 className="text-2xl font-bold mb-10">
        Task Manager
      </h2>

      <nav className="space-y-2">
        {user?.role === "Admin" ? (
          <>
            <NavLink
              to="/admin"
              className="block rounded-lg px-4 py-3 hover:bg-slate-800 transition"
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/admin/users"
              className="block rounded-lg px-4 py-3 hover:bg-slate-800 transition"
            >
              User Management
            </NavLink>

            <NavLink
              to="/admin/tasks"
              className="block rounded-lg px-4 py-3 hover:bg-slate-800 transition"
            >
              Task Monitoring
            </NavLink>

            <NavLink
              to="/admin/logs"
              className="block rounded-lg px-4 py-3 hover:bg-slate-800 transition"
            >
              Activity Logs
            </NavLink>

            <NavLink
              to="/admin/analytics"
              className="block rounded-lg px-4 py-3 hover:bg-slate-800 transition"
            >
              Analytics
            </NavLink>
          </>
        ) : (
          <NavLink
            to="/dashboard"
            className="block rounded-lg px-4 py-3 hover:bg-slate-800 transition"
          >
            My Tasks
          </NavLink>
        )}
      </nav>
    </div>
  );
}

export default Sidebar;