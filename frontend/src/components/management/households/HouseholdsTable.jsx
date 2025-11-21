import HouseholdTableRow from "./HouseholdsTableRow";
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

const HouseholdTable = ({ households, handleDelete }) => {
    return (
        <Table sx={{ mt: 2 }}>
            <TableHead sx={{ bgcolor: "#f5f5f5" }}>
                <TableRow>
                    <TableCell>Household No</TableCell>
                    <TableCell>Head of Family</TableCell>
                    <TableCell>Socio-Economic Class</TableCell>
                    <TableCell>Senior</TableCell>
                    <TableCell>PWDs</TableCell>
                    <TableCell>Solo Parents</TableCell>
                    <TableCell>Indigents</TableCell>
                    <TableCell>Actions</TableCell>
                </TableRow>
            </TableHead>
        <TableBody>
            {households.map((household, index) => (
                <HouseholdTableRow 
                    household={household} 
                    key={index} 
                    handleDelete={handleDelete}
                />
            ))}
        </TableBody>
      </Table>
    )
}

export default HouseholdTable