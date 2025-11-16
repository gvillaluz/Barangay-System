import { Alert } from "@mui/material";

export const ErrorMessage = ({ message }) => {
    return (
        <Alert severity="error">
            {message}
        </Alert>
    )
}