import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import ResidentsPage from "./pages/management/ResidentsPage";
import HouseholdsPage from "./pages/management/HouseholdsPage";
import IncidentsPage from "./pages/management/IncidentsPage";
import DocumentsPage from "./pages/document/DocumentsPage";
import CertificatePage from "./pages/document/CertificatePage";
import LoginPage from "./pages/auth/LoginPage";
import ProtectedRoute from "./pages/auth/ProtectedRoute";
import AdminRoute from "./pages/auth/AdminRoute";
import Register from "./pages/auth/Register";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import StaffDashboard from "./pages/dashboard/StaffDashboard";
import { getToken, getUserRole } from "./utils/auth";
import RootRoute from "./pages/auth/RootRoute";

export default function App() {
  const isLoggedIn = getToken() !== null;

  return (
    <>
      <Router>
        <Routes>
          <Route 
            path="/" 
            element={<RootRoute />} 
          />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard/staff" element={<StaffDashboard />} />
            <Route path="/residents" element={<ResidentsPage />} />
            <Route path="/households" element={<HouseholdsPage />} />
            <Route path="/incidents" element={<IncidentsPage />} />
            <Route path="/documents" element={<DocumentsPage />} />
            <Route path="/certificate" element={<CertificatePage />} />
            <Route element={<AdminRoute />}>
              <Route path="/dashboard/admin" element={<AdminDashboard />} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </>
  );
}
