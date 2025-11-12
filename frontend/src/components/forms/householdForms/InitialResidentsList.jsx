import { Table, TableHead, TableBody, TableCell, TableRow, Box, IconButton } from '@mui/material';
import { useHouseholdContext } from '../../management/households/HouseholdFormContext';

const InitialResidentsList = () => {
    const { initialResidents } = useHouseholdContext();

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>First Name</TableCell>
                    <TableCell>Middle Name</TableCell>
                    <TableCell>Last Name</TableCell>
                    <TableCell>Relationship to Head</TableCell>
                    <TableCell>Actions</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {initialResidents.map((resident, index) => {
                    <TableRow key={index}>
                        <TableCell>{resident.firstname}</TableCell>
                        <TableCell>{resident.middlename}</TableCell>
                        <TableCell>{resident.lastname}</TableCell>
                        <TableCell>{resident.relationship}</TableCell>
                        <TableCell>
                            <Box>
                                <IconButton>
                                    X
                                </IconButton>
                            </Box>
                        </TableCell>
                    </TableRow>
                })}
            </TableBody>
        </Table>
    )
}

export default InitialResidentsList