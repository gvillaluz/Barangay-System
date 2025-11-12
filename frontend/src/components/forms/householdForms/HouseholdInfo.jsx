import { TextField, Stack, Select, MenuItem } from "@mui/material";
import { useHouseholdContext } from "../../management/households/HouseholdFormContext";

const HouseholdInfo = () => {
    const { newHousehold, setNewHousehold } = useHouseholdContext();

    const handleHouseholdChange = (e) => {
        const { name, value } = e.target;
        setNewHousehold((prev) => ({...prev, [name]: value}));
    }

    return (
        <Stack 
            spacing={2}
            sx={{
                mt: 1
            }}
        >
            <TextField 
                name="socio_economic_class"
                label="Socio Economic Classification"
                select
                value={newHousehold.socio_economic_class}
                onChange={handleHouseholdChange}
            >
                <MenuItem value="Low Income">Low Income</MenuItem>
                <MenuItem value="Middle Income">Middle Income</MenuItem>
                <MenuItem value="High Income">High Income</MenuItem>
            </TextField>
            <TextField 
                name="senior_citizen"
                value={newHousehold.senior_citizen} 
                label="No. of Senier Citizens" 
                type="number" 
                onChange={handleHouseholdChange}
            />
            <TextField 
                name="pwds"
                value={newHousehold.pwds}
                label="No. of PWDs" 
                type="number" 
                onChange={handleHouseholdChange}
            />
            <TextField
                name="solo_parents"
                value={newHousehold.solo_parents} 
                label="No. of Solo Parents" 
                type="number" 
                onChange={handleHouseholdChange}
            />
            <TextField 
                name="indigents"
                value={newHousehold.indigents}
                label="No. of Indigents" 
                type="number"
                onChange={handleHouseholdChange}
            />
        </Stack>
    )
}

export default HouseholdInfo