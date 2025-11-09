import { Dialog, DialogContent, DialogTitle, Typography, DialogActions, Button } from "@mui/material";

const ConfirmDeleteDialog = ({ deleteDialogOpen, selectedUser, handleDeleteConfirm, setDeleteDialogOpen }) => {
    return (
        <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to delete user <strong>{selectedUser?.username}</strong>? This action cannot be undone.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleDeleteConfirm} variant="contained" color="error">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
    )
}

export default ConfirmDeleteDialog