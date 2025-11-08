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
import { logout, getUserInfo } from "../utils/auth";
import {
  People as PeopleIcon,
  Home as HomeIcon,
  Report as ReportIcon,
  Description as DescriptionIcon,
  Assignment as CertificateIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  PersonAdd as PersonAddIcon,
  AdminPanelSettings as AdminIcon,
} from "@mui/icons-material";
import { getAllUsers, updateUser, deleteUser } from "../api/usersApi";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editFormData, setEditFormData] = useState({
    username: "",
    firstname: "",
    lastname: "",
    role: "",
  });

  const currentUser = getUserInfo();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await getAllUsers();
      if (response.data.success) {
        setUsers(response.data.users);
      } else {
        setError("Failed to fetch users");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      const errorMessage = error.response?.data?.message || "Failed to fetch users";
      // Don't show "Invalid or expired token" error
      if (errorMessage !== "Invalid or expired token") {
        setError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setEditFormData({
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      role: user.role,
    });
    setEditDialogOpen(true);
  };

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setDeleteDialogOpen(true);
  };

  const handleEditSubmit = async () => {
    try {
      setError("");
      const response = await updateUser(selectedUser.id, editFormData);
      if (response.data.success) {
        setSuccess("User updated successfully");
        setEditDialogOpen(false);
        fetchUsers();
        setTimeout(() => setSuccess(""), 3000);
      } else {
        const errorMessage = response.data.message || "Failed to update user";
        if (errorMessage !== "Invalid or expired token") {
          setError(errorMessage);
        }
      }
    } catch (error) {
      console.error("Error updating user:", error);
      const errorMessage = error.response?.data?.message || "Failed to update user";
      // Don't show "Invalid or expired token" error
      if (errorMessage !== "Invalid or expired token") {
        setError(errorMessage);
      }
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      setError("");
      if (selectedUser.id === currentUser?.id) {
        setError("You cannot delete your own account");
        setDeleteDialogOpen(false);
        return;
      }

      const response = await deleteUser(selectedUser.id);
      if (response.data.success) {
        setSuccess("User deleted successfully");
        setDeleteDialogOpen(false);
        fetchUsers();
        setTimeout(() => setSuccess(""), 3000);
      } else {
        const errorMessage = response.data.message || "Failed to delete user";
        if (errorMessage !== "Invalid or expired token") {
          setError(errorMessage);
        }
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      const errorMessage = error.response?.data?.message || "Failed to delete user";
      // Don't show "Invalid or expired token" error
      if (errorMessage !== "Invalid or expired token") {
        setError(errorMessage);
      }
    }
  };

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

        {error && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError("")}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess("")}>
            {success}
          </Alert>
        )}

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
        <Paper elevation={3} sx={{ p: 4 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: "bold", display: "flex", alignItems: "center", gap: 1 }}>
              <AdminIcon sx={{ fontSize: 32, color: "#1976d2" }} />
              User Management
            </Typography>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/register"
              startIcon={<PersonAddIcon />}
            >
              Add New User
            </Button>
          </Box>

          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: "#f5f5f5" }}>
                    <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Username</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>First Name</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Last Name</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Role</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }} align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                        <Typography color="text.secondary">No users found</Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    users.map((user) => (
                      <TableRow key={user.id} hover>
                        <TableCell>{user.id}</TableCell>
                        <TableCell>{user.username}</TableCell>
                        <TableCell>{user.firstname}</TableCell>
                        <TableCell>{user.lastname}</TableCell>
                        <TableCell>
                          <Typography
                            variant="body2"
                            sx={{
                              display: "inline-block",
                              px: 1.5,
                              py: 0.5,
                              borderRadius: 1,
                              bgcolor: user.role === "admin" ? "#e3f2fd" : "#f3e5f5",
                              color: user.role === "admin" ? "#1976d2" : "#9c27b0",
                              fontWeight: "bold",
                            }}
                          >
                            {user.role.toUpperCase()}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <IconButton
                            color="primary"
                            onClick={() => handleEditClick(user)}
                            disabled={user.id === currentUser?.id}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            color="error"
                            onClick={() => handleDeleteClick(user)}
                            disabled={user.id === currentUser?.id}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Paper>

        {/* Edit User Dialog */}
        <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Edit User</DialogTitle>
          <DialogContent>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 2 }}>
              <TextField
                label="Username"
                value={editFormData.username}
                onChange={(e) => setEditFormData({ ...editFormData, username: e.target.value })}
                fullWidth
                required
              />
              <TextField
                label="First Name"
                value={editFormData.firstname}
                onChange={(e) => setEditFormData({ ...editFormData, firstname: e.target.value })}
                fullWidth
                required
              />
              <TextField
                label="Last Name"
                value={editFormData.lastname}
                onChange={(e) => setEditFormData({ ...editFormData, lastname: e.target.value })}
                fullWidth
                required
              />
              <TextField
                select
                label="Role"
                value={editFormData.role}
                onChange={(e) => setEditFormData({ ...editFormData, role: e.target.value })}
                fullWidth
                required
              >
                <MenuItem value="staff">Staff</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </TextField>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleEditSubmit} variant="contained" color="primary">
              Save Changes
            </Button>
          </DialogActions>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to delete user <strong>{selectedUser?.username}</strong>? This action cannot be undone.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleDeleteConfirm} variant="contained" color="error">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default AdminDashboard;

