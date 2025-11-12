import { Paper, Box, Typography, Button } from '@mui/material';
import {  isAdmin } from '../../utils/auth';

const DashboardHeader = ({ handleLogout }) => {
    const admin = isAdmin();

    return (
        <Paper
          elevation={3}
          sx={{
            p: 4,
            mb: 4,
            background: (admin ? "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" 
                : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"),
            color: "white",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
                {admin ? "Admin" : "Staff"} Dashboard
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
    )
}

export default DashboardHeader