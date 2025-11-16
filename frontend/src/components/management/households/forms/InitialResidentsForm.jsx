import { Stack, TextField, Button, Grid, MenuItem, Avatar, Box } from '@mui/material';
import InitialResidentsList from './InitialResidentsList';
import { useHouseholdContext } from '../HouseholdFormContext';
import { useState } from 'react';
import { ErrorMessage } from '../../../ui/ErrorMessage';

const InitialResidentsForm = ({ handleSaveResident, hasHead }) => {
    // const { handleSaveResident, hasHead } = useHouseholdContext();

    const residentObj = {
        photo: null,
        first_name: '',
        middle_name: '',
        last_name: '',
        email: '',
        phone: '',
        date_of_birth: '',
        place_of_birth: '',
        relationship: '',
        gender: '',
        civil_status: ''
    }

    const [newResident, setNewResident] = useState(residentObj);
    const [error, setError] = useState("");
    const [previewImage, setPreviewImage] = useState(null);

    const handleResidentChange = (e) => {
        const { name, value } = e.target;
        setNewResident((prev) => ({...prev, [name]: value}));
    }

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        setNewResident((p) => ({...p, photo: file}));
        setPreviewImage(URL.createObjectURL(file));
    }

    const saveResident = () => {
        for (let key in newResident) {
            if (newResident[key] === null || newResident[key] === '') {
                if (key !== "photo") setError("All fields are required.");
                else setError("Photo is required.");
                return
            }
        }

        setError("");
        handleSaveResident(newResident);
        setNewResident(residentObj);
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
                            src={previewImage || import.meta.env.VITE_API_URL}
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
                        value={newResident.first_name}
                        label="First Name"
                        fullWidth 
                        onChange={handleResidentChange}
                        required
                    />
                </Grid>
                <Grid size={4}>
                    <TextField 
                        name='middlename'
                        value={newResident.middle_name}
                        label="Middle Name"
                        fullWidth
                        onChange={handleResidentChange}
                        required
                    />
                </Grid>
                <Grid size={4}>
                    <TextField 
                        name='lastname'
                        value={newResident.last_name}
                        label="Last Name"
                        fullWidth
                        onChange={handleResidentChange}
                        required
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
                        required
                    />
                </Grid>
                <Grid size={6}>
                    <TextField 
                        name='phone'
                        value={newResident.phone}
                        label='Phone number'
                        fullWidth
                        onChange={handleResidentChange}
                        required
                    />
                </Grid>

                <Grid size={6}>
                    <TextField 
                        name='date'
                        value={newResident.date_of_birth}
                        type='date'
                        fullWidth 
                        onChange={handleResidentChange}
                        required
                    />
                </Grid>
                <Grid size={6}>
                    <TextField 
                        name='place_of_birth'
                        value={newResident.place_of_birth}
                        label="Place of birth"
                        fullWidth 
                        onChange={handleResidentChange}
                        required
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
                        required
                    >
                        {!hasHead && <MenuItem value='Head'>Head</MenuItem>}
                        <MenuItem value='Spouse'>Spouse</MenuItem>
                        <MenuItem value='Child'>Child</MenuItem>
                        <MenuItem value='Parent'>Parent</MenuItem>
                        <MenuItem value='Sibling'>Sibling</MenuItem>
                        <MenuItem value='Other'>Other</MenuItem>
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
                        required
                    >
                        <MenuItem value='Male'>Male</MenuItem>
                        <MenuItem value='Female'>Female</MenuItem>
                        <MenuItem value='Other'>Other</MenuItem>
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
                        required
                    >
                        <MenuItem value='Single'>Single</MenuItem>
                        <MenuItem value='Married'>Married</MenuItem>
                        <MenuItem value='Windowed'>Windowed</MenuItem>
                    </TextField>
                </Grid>

                <Grid size={12}>
                    <Button
                        variant='contained'
                        color='primary'
                        fullWidth
                        onClick={saveResident}
                    >
                        Add Resident
                    </Button>
                </Grid>

                {error && (<Grid size={12}>
                    <ErrorMessage message={error} />
                </Grid>)}
            </Grid>
        </>
    )
}

export default InitialResidentsForm