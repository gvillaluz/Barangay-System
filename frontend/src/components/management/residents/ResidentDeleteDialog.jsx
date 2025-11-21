import { Dialog, DialogContent, DialogActions, Typography, Button } from "@mui/material";

const ResidentDeleteDialog = ({ openDeleteDialog, setOpenDeleteDialog, onClickDelete }) => {
    return (
        <Dialog open={openDeleteDialog}>
            <DialogContent>
                <Typography>Are you sure you want to delete this resident?</Typography>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => setOpenDeleteDialog(false)}
                >
                    Cancel
                </Button>
                <Button
                    onClick={onClickDelete}
                >
                    Proceed
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ResidentDeleteDialog