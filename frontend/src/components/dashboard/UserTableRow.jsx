import { TableRow, TableCell, Typography, IconButton } from "@mui/material";
import { 
    Delete as DeleteIcon,
    Edit as EditIcon
} from "@mui/icons-material";

const UserTableRow = ({ user, handleEditClick, handleDeleteClick }) => {
    return (
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
    )
}

export default UserTableRow