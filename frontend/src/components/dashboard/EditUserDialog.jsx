import { Dialog, DialogTitle, DialogContent, Box, TextField, MenuItem, DialogActions, Button } from '@mui/material';

const EditUserDialog = ({ editDialogOpen, setEditDialogOpen, editFormData, setEditFormData, handleEditSubmit }) => {
    return (
        <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Edit User</DialogTitle>
          <DialogContent>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 2 }}>
              <TextField
                label="Username"
                value={editFormData.username}
                onChange={(e) => setEditFormData({ ...editFormData, username: e.target.value })}
                fullWidth
                required
              />
              <TextField
                label="First Name"
                value={editFormData.firstname}
                onChange={(e) => setEditFormData({ ...editFormData, firstname: e.target.value })}
                fullWidth
                required
              />
              <TextField
                label="Last Name"
                value={editFormData.lastname}
                onChange={(e) => setEditFormData({ ...editFormData, lastname: e.target.value })}
                fullWidth
                required
              />
              <TextField
                select
                label="Role"
                value={editFormData.role}
                onChange={(e) => setEditFormData({ ...editFormData, role: e.target.value })}
                fullWidth
                required
              >
                <MenuItem value="staff">Staff</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </TextField>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleEditSubmit} variant="contained" color="primary">
              Save Changes
            </Button>
          </DialogActions>
        </Dialog>
    )
}

export default EditUserDialog