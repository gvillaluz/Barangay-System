import {
  Box,
  TextField,
  Typography,
  Button,
  MenuItem,
  Paper,
} from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api/registerApi";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.role) {
      alert("Please select a role");
      return;
    }

    try {
      // Map frontend field names to backend field names
      const userData = {
        username: formData.username,
        firstname: formData.firstName,
        lastname: formData.lastName,
        password: formData.password,
        role: formData.role,
      };

      const response = await registerUser(userData);
      
      if (response.data.success) {
        alert("Registration successful!");
        navigate("/");
      } else {
        alert(response.data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      const errorMessage = error.response?.data?.message || "Registration failed. Please try again.";
      alert(errorMessage);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #ffffffff 30%, #ffffffff 90%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: 420,
          padding: 5,
          borderRadius: 4,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
        component="form"
        onSubmit={handleSubmit}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            color: "#1976d2",
            mb: 2,
          }}
        >
          Create an Account
        </Typography>

        <TextField
          label="First Name"
          name="firstName"
          variant="outlined"
          fullWidth
          required
          value={formData.firstName}
          onChange={handleChange}
        />

        <TextField
          label="Last Name"
          name="lastName"
          variant="outlined"
          fullWidth
          required
          value={formData.lastName}
          onChange={handleChange}
        />

        <TextField
          label="Username"
          name="username"
          variant="outlined"
          fullWidth
          required
          value={formData.username}
          onChange={handleChange}
        />

        <TextField
          label="Password"
          name="password"
          type="password"
          variant="outlined"
          fullWidth
          required
          value={formData.password}
          onChange={handleChange}
        />

        <TextField
          select
          label="Role"
          name="role"
          variant="outlined"
          fullWidth
          required
          value={formData.role}
          onChange={handleChange}
        >
          <MenuItem value="staff">Staff</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
        </TextField>

        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{
           mt: 1,
    py: 1,
    fontWeight: "bold",
    fontSize: "1rem",
    borderRadius: "8px",
  }}
  >
  Register
        </Button>
        <Typography
          variant="body2"
          sx={{ textAlign: "center", mt: 2, color: "gray" }}
        >
          Already have an account?{" "}
          <Link
            to="/login"
            style={{
              color: "#1976d2",
              fontWeight: "bold",
              textDecoration: "none",
            }}
          >
            Login here
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default RegisterPage;