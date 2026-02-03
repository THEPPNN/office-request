import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import ManagerDashboard from "./pages/ManagerDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import UserManagement from "./pages/UserManagement";

function App() {
  return (
    <Routes>
      {/* public */}
      <Route path="/login" element={<Login />} />

      {/* admin */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
       <Route
        path="/users"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <UserManagement />
          </ProtectedRoute>
        }
      />

      {/* manager */}
      <Route
        path="/manager"
        element={
          <ProtectedRoute allowedRoles={["MANAGER"]}>
            <ManagerDashboard />
          </ProtectedRoute>
        }
      />

      {/* user */}
      <Route
        path="/"
        element={
          <ProtectedRoute allowedRoles={["USER", "ADMIN", "MANAGER"]}>
            <Home />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;