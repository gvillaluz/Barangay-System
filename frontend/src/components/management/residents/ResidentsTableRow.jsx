import { TableRow, TableCell, Box, Avatar, Button } from "@mui/material";
import { isAdmin } from "../../../utils/auth";

const ResidentTableRow = ({ res }) => {
    return (
        <TableRow>
            <TableCell>
                <Box display="flex" alignItems="center">
                    <Avatar
                    src={res.photo || 'https://via.placeholder.com/80x80?text=No+Photo'}
                    alt={`${res.first_name} ${res.last_name}`}
                    sx={{ 
                        width: 56, 
                        height: 56, 
                        mr: 1 
                    }}
                    />
                </Box>
            </TableCell>
            <TableCell>
                {res.first_name} {res.middle_name || ''} {res.last_name}
            </TableCell>
            <TableCell>
                {res.address}
            </TableCell>
            <TableCell>
                <Button
                    onClick={() => {
                        setEditing(res);
                        setOpenForm(true);
                    }}
                >
                    Edit
                </Button>
                {isAdmin() && (
                    <Button color="error" onClick={() => handleDelete(res.id)}>
                        Delete
                    </Button>
                )}
            </TableCell>
        </TableRow>
    )
}

export default ResidentTableRow