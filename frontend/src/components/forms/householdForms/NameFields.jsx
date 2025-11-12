import { Grid, Box, Avatar, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useHouseholdContext } from "../../management/households/HouseholdFormContext";

const NameFields = ({ data, handleChange, photoChange, photo }) => {
    return (
        <>
            <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
                <Avatar
                    src={photo || import.meta.env.VITE_API_URL}
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
                        onChange={(e) => photoChange(e.target.files[0])} 
                    />
                </Button>
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
                    name='firstname'
                    value={data.firstname}
                    label="First Name"
                    fullWidth 
                    onChange={handleChange}
                />
                <TextField 
                    name='middlename'
                    value={data.middlename}
                    label="Middle Name"
                    fullWidth
                    onChange={handleChange}
                />
                <TextField 
                    name='lastname'
                    value={data.lastname}
                    label="Last Name"
                    fullWidth
                    onChange={handleChange}
                />
            </Box>
        </>
    )
}

export default React.memo(NameFields)