import { Box, TextField, Typography, Button, Alert } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../../api/authApi";
import { setToken, getUserRole } from "../../utils/auth";

const LoginPage = () => {
  const [loginInfo, setLoginInfo] = useState({
    username: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await loginUser(loginInfo);
      
      if (response.data.success && response.data.token) {
        setToken(response.data.token);

        const role = getUserRole();

        if (role === null)
          navigate("/");

        if (role === "admin") {
          navigate("/dashboard/admin", { replace: true });
        } else {
          navigate("/dashboard/staff", { replace: true });
        }
      } else {
        setError(response.data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(error.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: 350,
        border: "1px lightgray solid",
        padding: "40px",
        borderRadius: "6px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        marginTop: "150px",
        marginRight: "auto",
        marginLeft: "auto",
        height: "fit-content",
      }}
      component="form"
      onSubmit={handleLogin}
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
          Log in to your account
        </Typography>

      <TextField
        label="Username"
        name="username"
        variant="outlined"
        fullWidth
        required
        value={loginInfo.username}
        onChange={handleOnChange}
      />

      <TextField
        label="Password"
        name="password"
        type="password"
        variant="outlined"
        fullWidth
        required
        value={loginInfo.password}
        onChange={handleOnChange}
      />

      {error && (
        <Alert severity="error">
          {error}
        </Alert>
      )}

      <Button
        variant="contained"
        color="primary"
        sx={{ height: "40px" }}
        type="submit"
        disabled={loading}
        fullWidth
      >
        {loading ? "Logging in..." : "Login"}
      </Button>

      <Typography sx={{ textAlign: "center", marginTop: "10px" }}>
        Don’t have an account?{" "}
        <Link
          to="/register"
          style={{
            color: "#1976d2",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Register here
        </Link>
      </Typography>
    </Box>
  );
};

export default LoginPage;
