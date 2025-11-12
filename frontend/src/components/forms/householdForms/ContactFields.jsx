import { Box, TextField, Grid, Button } from '@mui/material';
import React from 'react';
import { useHouseholdContext } from '../../management/households/HouseholdFormContext';

const ContactFields = ({ data, handleChange }) => {
    return <>
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: 2,
                mt: 2
            }}
        >
                <TextField 
                name='email'
                value={data.email}
                label="Email Address" 
                type='email' 
                fullWidth
                onChange={handleChange}
            />
            <TextField 
                name='phone_number'
                value={data.phone_number}
                label='Phone number'
                fullWidth
                onChange={handleChange}
            />
        </Box>

        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: 2,
                mt: 2
            }}
        >
                <TextField 
                name='date'
                value={data.date}
                type='date'
                fullWidth 
                onChange={handleChange}
            />
            <TextField 
                name='place_of_birth'
                value={data.place_of_birth}
                label="Place of birth"
                fullWidth 
                onChange={handleChange}
            />
        </Box>
    </>
}

export default React.memo(ContactFields)