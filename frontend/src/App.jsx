import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Container } from "@mui/material";

// ✅ Import Pages
import ResidentsPage from "./pages/ResidentsPage";
import HouseholdsPage from "./pages/HouseholdsPage";
import IncidentsPage from "./pages/IncidentsPage";
import DocumentsPage from "./pages/DocumentsPage";
import CertificatePage from "./pages/CertificatePage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./pages/ProtectedRoute";
import AdminRoute from "./pages/AdminRoute";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import StaffDashboard from "./pages/StaffDashboard";
import { getToken, getUserRole } from "./utils/auth";

export default function App() {
  const isLoggedIn = getToken() !== null;

  return (
    <>
      <Router>
        <Routes>
          <Route 
            path="/" 
            element={
              isLoggedIn ? (
                getUserRole() === "admin" ? (
                  <Navigate to="/dashboard/admin" replace />
                ) : (
                  <Navigate to="/dashboard/staff" replace />
                )
              ) : (
                <LoginPage />
              )
            } 
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
