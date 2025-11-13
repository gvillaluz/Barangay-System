import { Stack, TextField, Button, Grid, MenuItem, Avatar, Box } from '@mui/material';
import InitialResidentsList from './InitialResidentsList';
import { useHouseholdContext } from '../../management/households/HouseholdFormContext';
import { useState } from 'react';

const InitialResidentsForm = () => {
    const { handleSaveResident } = useHouseholdContext();

    const [newResident, setNewResident] = useState({
        photo: '',
        firstname: '',
        middlename: '',
        lastname: '',
        email: '',
        phone_number: '',
        date: '',
        place_of_birth: '',
        relationship: '',
        gender: '',
        civil_status: ''
    });

    const handleResidentChange = (e) => {
        const { name, value } = e.target;
        setNewResident((prev) => ({...prev, [name]: value}));
    }

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];

        const imageFile = URL.createObjectURL(file);

        setNewResident((p) => ({...p, photo: imageFile}));
    }

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
                            src={newResident.photo || import.meta.env.VITE_API_URL}
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
                        value={newResident.firstname}
                        label="First Name"
                        fullWidth 
                        onChange={handleResidentChange}
                    />
                </Grid>
                <Grid size={4}>
                    <TextField 
                        name='middlename'
                        value={newResident.middlename}
                        label="Middle Name"
                        fullWidth
                        onChange={handleResidentChange}
                    />
                </Grid>
                <Grid size={4}>
                    <TextField 
                        name='lastname'
                        value={newResident.lastname}
                        label="Last Name"
                        fullWidth
                        onChange={handleResidentChange}
                    />
                </Grid>

                <Grid size={6}>
                    <TextField 
                        name='email'
                        value={newResident.email}
                        label="Email Address" 
                        type='email' 
                        fullWidth
                        onChange={handleResidentChange}
                    />
                </Grid>
                <Grid size={6}>
                    <TextField 
                        name='phone_number'
                        value={newResident.phone_number}
                        label='Phone number'
                        fullWidth
                        onChange={handleResidentChange}
                    />
                </Grid>

                <Grid size={6}>
                    <TextField 
                        name='date'
                        value={newResident.date}
                        type='date'
                        fullWidth 
                        onChange={handleResidentChange}
                    />
                </Grid>
                <Grid size={6}>
                    <TextField 
                        name='place_of_birth'
                        value={newResident.place_of_birth}
                        label="Place of birth"
                        fullWidth 
                        onChange={handleResidentChange}
                    />
                </Grid>

                <Grid size={4}>
                    <TextField 
                        name='relationship'
                        value={newResident.relationship}
                        label="Relationship to Head" 
                        fullWidth
                        select
                        onChange={handleResidentChange}
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
                        value={newResident.gender}
                        label="Gender" 
                        fullWidth
                        select
                        onChange={handleResidentChange}
                    >
                        <MenuItem value='male'>Male</MenuItem>
                        <MenuItem value='female'>Female</MenuItem>
                        <MenuItem value='other'>Other</MenuItem>
                    </TextField>
                </Grid>
                <Grid size={4}>
                    <TextField 
                        name='civil_status'
                        value={newResident.civil_status}
                        label="Civil status" 
                        fullWidth
                        select
                        onChange={handleResidentChange}
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
                        onClick={() => handleSaveResident(newResident)}
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