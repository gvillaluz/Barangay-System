import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { logout, getUserInfo } from "../../utils/auth";
import {
  People as PeopleIcon,
  Home as HomeIcon,
  Report as ReportIcon,
  Description as DescriptionIcon,
  Assignment as CertificateIcon
} from "@mui/icons-material";
import { getAllUsers, updateUser, deleteUser } from "../../api/usersApi";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import UserContainer from "../../components/dashboard/UserContainer";

const AdminDashboard = () => {
  const handleLogout = () => {
    logout();
  };

  const dashboardCards = [
    {
      title: "Residents",
      description: "Manage resident information",
      icon: <PeopleIcon sx={{ fontSize: 60, color: "#1976d2" }} />,
      link: "/residents",
      color: "#e3f2fd",
    },
    {
      title: "Households",
      description: "View and manage household data",
      icon: <HomeIcon sx={{ fontSize: 60, color: "#2e7d32" }} />,
      link: "/households",
      color: "#e8f5e9",
    },
    {
      title: "Incidents",
      description: "Record and track incidents",
      icon: <ReportIcon sx={{ fontSize: 60, color: "#d32f2f" }} />,
      link: "/incidents",
      color: "#ffebee",
    },
    {
      title: "Documents",
      description: "Manage barangay documents",
      icon: <DescriptionIcon sx={{ fontSize: 60, color: "#ed6c02" }} />,
      link: "/documents",
      color: "#fff3e0",
    },
    {
      title: "Certificates",
      description: "Generate and manage certificates",
      icon: <CertificateIcon sx={{ fontSize: 60, color: "#9c27b0" }} />,
      link: "/certificate",
      color: "#f3e5f5",
    },
  ];

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5", pb: 4 }}>
      <Container maxWidth="lg" sx={{ pt: 4 }}>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            mb: 4,
            background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
            color: "white",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
                Admin Dashboard
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                Manage users and system operations
              </Typography>
            </Box>
            <Button
              variant="contained"
              color="error"
              onClick={handleLogout}
              sx={{ minWidth: 120 }}
            >
              Logout
            </Button>
          </Box>
        </Paper>

        <Box sx={{ display: "flex", gap: 3, mb: 4, flexWrap: "nowrap", overflowX: "auto" }}>
          {dashboardCards.map((card, index) => (
            <Card
              key={index}
              sx={{
                minWidth: 0,
                flex: "1 1 0",
                height: "350px",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: 6,
                },
              }}
            >
                <CardContent
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    bgcolor: card.color,
                    pt: 4,
                  }}
                >
                  {card.icon}
                  <Typography variant="h5" component="h2" sx={{ mt: 2, fontWeight: "bold" }}>
                    {card.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {card.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "center", pb: 2 }}>
                  <Button
                    component={Link}
                    to={card.link}
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                  >
                    Access
                  </Button>
                </CardActions>
              </Card>
          ))}
        </Box>

        {/* User Management Section */}
        <UserContainer />
      </Container>
    </Box>
  );
};

export default AdminDashboard;

