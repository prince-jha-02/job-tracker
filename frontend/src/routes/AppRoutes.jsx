import { Routes, Route } from "react-router-dom";

import Auth from "../pages/Auth";
import Feature from "../pages/Feature";
import Dashboard from "../pages/Dashboard";
import About from "../pages/About";
import ProtectedRoute from "./ProtectedRoute";
import Applications from "../pages/Applications";
import Analytics from "../pages/Analytics";
import Home from "../pages/Home";
function AppRoutes() {
  return (
    <Routes>

      {/* Public Route */}
      <Route path="/" element={<Home />} />

      <Route path="/features" element={<Feature />} />

      <Route path="/about" element={<About />} />

      {/* Protected Route */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/applications"
        element={
          <ProtectedRoute>
            <Applications />
          </ProtectedRoute>
        }
      />

      <Route
        path="/analytics"
        element={
          <ProtectedRoute>
            <Analytics />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default AppRoutes;