import UserTableRow from "./UserTableRow";
import { Box, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, CircularProgress, Typography } from "@mui/material";

const UserTable = ({ users, loading, handleEditClick, handleDeleteClick }) => {
    return (
        loading ? (
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
                        <UserTableRow 
                          user={user} 
                          handleEditClick={handleEditClick}
                          handleDeleteClick={handleDeleteClick}
                        />
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )
    )
}

export default UserTable