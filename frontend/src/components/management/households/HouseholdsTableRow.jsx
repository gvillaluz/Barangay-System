import { TableRow, TableCell, Button } from '@mui/material';
import { isAdmin } from '../../../utils/auth';

const HouseholdTableRow = ({ household, handleDelete }) => {
    return (
        <TableRow>
            <TableCell>{household.household_no}</TableCell>
            <TableCell>{household.resident_first_name + " " + household.resident_last_name}</TableCell>
            <TableCell>{household.socio_economic_classification}</TableCell>
            <TableCell>{household.senior_citizens}</TableCell>
            <TableCell>{household.pwds}</TableCell>
            <TableCell>{household.solo_parents}</TableCell>
            <TableCell>{household.indigents}</TableCell>
            <TableCell>
                {isAdmin() && (
                    <Button color="error" onClick={() => handleDelete(household.id)}>Delete</Button>
                )}
            </TableCell>
        </TableRow>
    )
}

export default HouseholdTableRow