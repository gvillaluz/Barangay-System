import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button, IconButton } from "@mui/material";
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import HouseholdInfo from "./forms/HouseholdInfo";
import InitialResidentsForm from "./forms/InitialResidentsForm";
import InitialResidentsList from "./forms/InitialResidentsList";
import { hasNullValue } from "../../../utils/validation";
import { useHouseholdContext } from "./HouseholdFormContext";
import { createHousehold } from "../../../api/householdsApi";

const HouseholdFormDialog = ({ openFormDialog, setOpenFormDialog }) => {
    // const { step, onClose, handleBack, handleNext, householdError } = useHouseholdContext();

    const household = {
        socio_economic_class: '',
        senior_citizen: 0,
        pwds: 0,
        solo_parents: 0,
        indigents: 0,
        address: ''
    }

    const [newHousehold, setNewHousehold] = useState(household);
    const [initialResidents, setInitialResidents] = useState([]);
    const [householdError, setHouseholdError] = useState("");
    const [hasHead, setHasHead] = useState(false);
    const [step, setStep] = useState(1);

    const handleBack = () => setStep((prev) => prev - 1);
    const handleNext = () => {
        if (hasNullValue(newHousehold)) {
            setHouseholdError("Some values are empty.");
            return;
        }

        setHouseholdError("");
        setStep((prev) => prev + 1);
    }

    const handleSaveResident = (resident) => {
        setInitialResidents((prev) => ([...prev, resident]));
        if (resident.relationship === "Head") setHasHead(true);
    }

    const handleDeleteResident = (index) => {
        if (initialResidents[index].relationship === "Head") setHasHead(false);
        setInitialResidents((prev) => prev.filter((r, i) => i !== index));
    }

    const onClose = () => {
        setStep(1);
        setNewHousehold(household);
        setInitialResidents([]);
        setOpenFormDialog(false);
    }

    const saveHousehold = async () => {
        try {
            if (!hasHead || initialResidents.length === 0) {
                throw new Error("Cannot save household without residents or no head of the family.");
            }

            const payload = {
                newHousehold,
                initialResidents
            }

            const response = await createHousehold(payload);
            console.log(response.data);
        } catch (err) {
            console.log("ERROR IN SAVING : " + err)
        }
    }

    // const handleClose = () => {
    //     setOpenFormDialog(false);
    //     onClose();
    // }

    return (
        <Dialog
            open={openFormDialog}
            fullWidth={true}
            maxWidth="md"
            scroll="body"
            sx={{
                '& .MuiDialog-paper': {
                    height: 'auto',
                    maxHeight: 'none',
                    overflowY: 'auto'
                }
            }}
        >
            <DialogTitle
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: 4
                }}
            >
                {step === 1 && "Household Info"}
                {step === 2 && "Add Initial Residents"}
                {step === 3 && "Review & Save"}

                <IconButton
                    onClick={onClose}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent>
                {step === 1 && 
                    <HouseholdInfo
                        newHousehold={newHousehold}
                        setNewHousehold={setNewHousehold}
                        householdError={householdError}
                    />
                }
                {step === 2 && 
                   <>
                        <InitialResidentsForm 
                            handleSaveResident={handleSaveResident}
                            hasHead={hasHead}
                        />
                        <InitialResidentsList 
                            handleDeleteResident={handleDeleteResident}
                            initialResidents={initialResidents}
                        />
                   </>
                }
            </DialogContent>
            
            <DialogActions
                sx={{
                    padding: 3
                }}
            >
                {step > 1 && <Button onClick={handleBack} size="large">Back</Button>}
                {step < 2 && <Button variant="contained" color="primary" onClick={handleNext} size="large" >Next</Button>}
                {step === 2 && <Button variant="contained" color="primary" size="large" onClick={saveHousehold}>Save</Button>}
            </DialogActions>
        </Dialog>
    )
}

export default HouseholdFormDialog