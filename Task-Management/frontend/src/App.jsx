import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";

import FullScreenSpinner from "./components/common/FullScreenSpinner";

import ProtectedRoute from "./components/common/ProtectedRoute";
import AdminRoute from "./components/common/AdminRoute";

const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));

const Dashboard = lazy(() => import("./pages/user/Dashboard"));

const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const UserManagement = lazy(() => import("./pages/admin/UserManagement"));
const TaskMonitoring = lazy(() => import("./pages/admin/TaskMonitoring"));
const ActivityLogs = lazy(() => import("./pages/admin/ActivityLogs"));
const Analytics = lazy(() => import("./pages/admin/Analytics"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<FullScreenSpinner/>}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/users"
            element={
              <AdminRoute>
                <UserManagement />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/tasks"
            element={
              <AdminRoute>
                <TaskMonitoring />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/logs"
            element={
              <AdminRoute>
                <ActivityLogs />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/analytics"
            element={
              <AdminRoute>
                <Analytics />
              </AdminRoute>
            }
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;