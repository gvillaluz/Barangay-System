import { TextField, Box, MenuItem } from "@mui/material";
import React from "react";
import { useHouseholdContext } from "../../management/households/HouseholdFormContext";

const OtherFields = ({ data, handleChange }) => {
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
                name='relationship'
                value={data.relationship}
                label="Relationship to Head" 
                fullWidth
                select
                onChange={handleChange}
            >
                <MenuItem value='head'>Head</MenuItem>
                <MenuItem value='spouse'>Spouse</MenuItem>
                <MenuItem value='child'>Child</MenuItem>
                <MenuItem value='parent'>Parent</MenuItem>
                <MenuItem value='sibling'>Sibling</MenuItem>
                <MenuItem value='other'>Other</MenuItem>
            </TextField>
            <TextField 
                name='gender'
                value={data.gender}
                label="Gender" 
                fullWidth
                select
                onChange={handleChange}
            >
                <MenuItem value='male'>Male</MenuItem>
                <MenuItem value='female'>Female</MenuItem>
                <MenuItem value='other'>Other</MenuItem>
            </TextField>
            <TextField 
                name='civil_status'
                value={data.civil_status}
                label="Civil status" 
                fullWidth
                select
                onChange={handleChange}
            >
                <MenuItem value='single'>Single</MenuItem>
                <MenuItem value='married'>Married</MenuItem>
                <MenuItem value='windowed'>Windowed</MenuItem>
            </TextField>
        </Box>
    </>
}

export default React.memo(OtherFields)