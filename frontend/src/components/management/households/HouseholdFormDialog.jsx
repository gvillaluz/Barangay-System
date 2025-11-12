import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button, IconButton } from "@mui/material";
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import HouseholdInfo from "../../forms/householdForms/HouseholdInfo";
import InitialResidentsForm from "../../forms/householdForms/InitialResidentsForm";
import InitialResidentsList from "../../forms/householdForms/InitialResidentsList";

const HouseholdFormDialog = ({ openFormDialog, setOpenFormDialog }) => {
    const [step, setStep] = useState(1);

    const handleBack = () => setStep((prev) => prev - 1);
    const handleNext = () => setStep((prev) => prev + 1);

    const handleClose = () => {
        setOpenFormDialog(false);
        setStep(1);
    }

    return (
        <Dialog
            open={openFormDialog}
            fullWidth={true}
            maxWidth="md"
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
                    onClick={handleClose}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent>
                {step === 1 && <HouseholdInfo />}
                {step === 2 && (
                    <>
                        <InitialResidentsForm />
                    </>
                )}
            </DialogContent>
            
            <DialogActions
                sx={{
                    padding: 3
                }}
            >
                {step > 1 && <Button onClick={handleBack}>Back</Button>}
                {step < 3 && <Button variant="contained" color="primary" onClick={handleNext}>Next</Button>}
                {step === 3 && <Button variant="contained" color="primary">Save</Button>}
            </DialogActions>
        </Dialog>
    )
}

export default HouseholdFormDialog