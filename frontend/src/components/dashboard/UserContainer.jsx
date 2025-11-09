import UserTable from "./UserTable";
import { Paper, Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { 
    AdminPanelSettings as AdminIcon,
    PersonAdd as PersonAddIcon
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import EditUserDialog from "./EditUserDialog";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";
import { getAllUsers, updateUser, deleteUser } from "../../api/usersApi";

const UserContainer = () => {
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
        role: ""
    });

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

          if (errorMessage !== "Invalid or expired token") {
            setError(errorMessage);
          }
        } finally {
          setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

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

          if (errorMessage !== "Invalid or expired token") {
            setError(errorMessage);
          }
        }
    };

    return (
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

          <UserTable 
            users={users} 
            loading={loading} 
            handleEditClick={handleEditClick} 
            handleDeleteClick={handleDeleteClick}
          />

          <EditUserDialog 
            editDialogOpen={editDialogOpen}
            setEditDialogOpen={setEditDialogOpen} 
            editFormData={editFormData}
            setEditFormData={setEditFormData}
            handleEditSubmit={handleEditSubmit}
          />

          <ConfirmDeleteDialog 
            deleteDialogOpen={deleteDialogOpen}
            selectedUser={selectedUser}
            handleDeleteConfirm={handleDeleteConfirm}
            setDeleteDialogOpen={setDeleteDialogOpen}
          />
        </Paper>
    )
}

export default UserContainer