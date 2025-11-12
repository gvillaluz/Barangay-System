import ResidentTableRow from "./ResidentsTableRow";
import { Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";

const ResidentTable = ({ residents }) => {
    return (
        <Table sx={{ mt: 2 }}>
            <TableHead>
                <TableRow>
                    <TableCell>Photo</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Address</TableCell>
                    <TableCell>Actions</TableCell>
                </TableRow>
            </TableHead>
        <TableBody>
          {residents.map((res, index) => (
            <ResidentTableRow res={res} key={index} />
          ))}
        </TableBody>
      </Table>
    )
}

export default ResidentTable