import ResidentTableRow from "./ResidentsTableRow";
import { Table, TableHead, TableRow, TableCell, TableBody, Box, Typography } from "@mui/material";
import InboxIcon from '@mui/icons-material/Inbox';

const ResidentTable = ({ residents, setOpenForm, setEditing, handleDelete }) => {
    return (
        <Table sx={{ mt: 2 }}>
            <TableHead sx={{ bgcolor: "#f5f5f5" }}>
                <TableRow>
                    <TableCell>Photo</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Household No.</TableCell>
                    <TableCell>Relationship to Head</TableCell>
                    <TableCell>Address</TableCell>
                    <TableCell>Actions</TableCell>
                </TableRow>
            </TableHead>
        <TableBody>
          {residents.length <= 0 ? (
            <TableRow>
            <TableCell colSpan={12} align="center">
              <Box sx={{ py: 4, color: "text.secondary" }}>
                <InboxIcon sx={{ fontSize: 48, mb: 1 }} />
                <Typography>There are no residents in the system.</Typography>
              </Box>
            </TableCell>
          </TableRow>
          ) : (
            residents.map((res, index) => (
              <ResidentTableRow
                key={index}  
                res={res} 
                setEditing={setEditing}
                setOpenForm={setOpenForm}
                handleDelete={handleDelete}
              />
            ))
          )}
        </TableBody>
      </Table>
    )
}

export default ResidentTable