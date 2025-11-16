import { Table, TableHead, TableBody, TableCell, TableRow, Box, IconButton, TableContainer } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useHouseholdContext } from '../HouseholdFormContext';

const InitialResidentsList = ({ initialResidents, handleDeleteResident }) => {
    // const { initialResidents, handleDeleteResident } = useHouseholdContext();

    return (
        <TableContainer
            sx={{
                mt: 5,
                width: '95%',
                marginLeft: 'auto',
                marginRight: 'auto',
                marginBottom: '20px'
            }}
        >
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>First Name</TableCell>
                        <TableCell>Middle Name</TableCell>
                        <TableCell>Last Name</TableCell>
                        <TableCell>Relationship to Head</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {initialResidents.map((resident, index) => (
                        <TableRow key={index}>
                            <TableCell>{resident.firstname}</TableCell>
                            <TableCell>{resident.middlename}</TableCell>
                            <TableCell>{resident.lastname}</TableCell>
                            <TableCell>{resident.relationship}</TableCell>
                            <TableCell>
                                <Box>
                                    <IconButton
                                        color='error'
                                        onClick={() => handleDeleteResident(index)}
                                    >
                                        <Delete />
                                    </IconButton>
                                </Box>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default InitialResidentsList