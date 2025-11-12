import { Stack, TextField, Button, Grid, MenuItem, Avatar, Box } from '@mui/material';
import InitialResidentsList from './InitialResidentsList';
import { useHouseholdContext } from '../../management/households/HouseholdFormContext';

const InitialResidentsForm = () => {
    const { newResidentInfo, handleNewResidentChange, handleAddNewResident, handlePhotoChange } = useHouseholdContext();

    return (
        <>
            <Grid 
                container 
                spacing={2}
                sx={{
                    padding: 2
                }}
            >
                <Grid size={12}>
                    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
                        <Avatar
                            src={newResidentInfo.photo || import.meta.env.VITE_API_URL}
                            alt="Resident photo"
                            sx={{ width: 120, height: 120 }}
                        />
                        <Button variant="contained" component="label">
                            Upload Photo
                            <input 
                                hidden 
                                accept="image/*" 
                                type="file"      
                                name='photo'
                                onChange={handlePhotoChange} 
                            />
                        </Button>
                    </Box>
                </Grid>

                <Grid size={4}>
                    <TextField 
                        name='firstname'
                        value={newResidentInfo.firstname}
                        label="First Name"
                        fullWidth 
                        onChange={handleNewResidentChange}
                    />
                </Grid>
                <Grid size={4}>
                    <TextField 
                        name='middlename'
                        value={newResidentInfo.middlename}
                        label="Middle Name"
                        fullWidth
                        onChange={handleNewResidentChange}
                    />
                </Grid>
                <Grid size={4}>
                    <TextField 
                        name='lastname'
                        value={newResidentInfo.lastname}
                        label="Last Name"
                        fullWidth
                        onChange={handleNewResidentChange}
                    />
                </Grid>

                <Grid size={6}>
                    <TextField 
                        name='email'
                        value={newResidentInfo.email}
                        label="Email Address" 
                        type='email' 
                        fullWidth
                        onChange={handleNewResidentChange}
                    />
                </Grid>
                <Grid size={6}>
                    <TextField 
                        name='phone_number'
                        value={newResidentInfo.phone_number}
                        label='Phone number'
                        fullWidth
                        onChange={handleNewResidentChange}
                    />
                </Grid>

                <Grid size={6}>
                    <TextField 
                        name='date'
                        value={newResidentInfo.date}
                        type='date'
                        fullWidth 
                        onChange={handleNewResidentChange}
                    />
                </Grid>
                <Grid size={6}>
                    <TextField 
                        name='place_of_birth'
                        value={newResidentInfo.place_of_birth}
                        label="Place of birth"
                        fullWidth 
                        onChange={handleNewResidentChange}
                    />
                </Grid>

                <Grid size={4}>
                    <TextField 
                        name='relationship'
                        value={newResidentInfo.relationship}
                        label="Relationship to Head" 
                        fullWidth
                        select
                        onChange={handleNewResidentChange}
                    >
                        <MenuItem value='head'>Head</MenuItem>
                        <MenuItem value='spouse'>Spouse</MenuItem>
                        <MenuItem value='child'>Child</MenuItem>
                        <MenuItem value='parent'>Parent</MenuItem>
                        <MenuItem value='sibling'>Sibling</MenuItem>
                        <MenuItem value='other'>Other</MenuItem>
                    </TextField>
                </Grid>
                <Grid size={4}>
                    <TextField 
                        name='gender'
                        value={newResidentInfo.gender}
                        label="Gender" 
                        fullWidth
                        select
                        onChange={handleNewResidentChange}
                    >
                        <MenuItem value='male'>Male</MenuItem>
                        <MenuItem value='female'>Female</MenuItem>
                        <MenuItem value='other'>Other</MenuItem>
                    </TextField>
                </Grid>
                <Grid size={4}>
                    <TextField 
                        name='civil_status'
                        value={newResidentInfo.civil_status}
                        label="Civil status" 
                        fullWidth
                        select
                        onChange={handleNewResidentChange}
                    >
                        <MenuItem value='single'>Single</MenuItem>
                        <MenuItem value='married'>Married</MenuItem>
                        <MenuItem value='windowed'>Windowed</MenuItem>
                    </TextField>
                </Grid>

                <Grid size={12}>
                    <Button
                        variant='contained'
                        color='primary'
                        fullWidth
                        onClick={handleAddNewResident}
                    >
                        Add Resident
                    </Button>
                </Grid>
            </Grid>
            <InitialResidentsList />
        </>
    )
}

export default InitialResidentsForm